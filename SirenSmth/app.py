# Importing necessary modules

import json
import os
import socket
import subprocess
import re
import inflect
import pyttsx3
import speech_recognition as sr
from flask import Flask, request, render_template
from voice_paths import *

# Declaring global variables
send_order = ""
language = "en-EN"
app = Flask(__name__)
turn = 0
orderNumber = 0
current_coffee = None
dict_coffee = {}
coffee_types = ["coffee", "koffie", "espresso", "milk coffee", "koffie melk", "cappuccino",  # coffees available
                "koffie chocolate", "chocolate coffee", "chocolate milk", "chocolade melk",
                "double espresso", "latte macchiato", "wiener melange"]
positive_response = ["yes", "sounds good", "sure"]
negative_response = ["no", "nope", "cancel", "nee", "nou"]
coffee_types_temp = coffee_types.copy()

# Add more mappings as needed
# Translating Dutch numbers to English for processing
dutch_to_number = {
    "een": "1", "twee": "2", "drie": "3", "vier": "4", "vijf": "5",
    "zes": "6", "zeven": "7", "acht": "8", "negen": "9"
}
english_to_number = {
    "one": "1", "two": "2", "three": "3", "four": "4", "five": "5",
    "six": "6", "seven": "7", "eight": "8", "nine": "9"
}


# Route to the home page
@app.route('/')
def home():
    # subprocess.call("../animo-website npm start", shell=True)
    return render_template("bindex.html")


# Route to display the drink order
@app.route('/drink_order')
def drink_order():
    return send_order


@app.route('/language', methods=['POST'])
def get_language():
    if request.method == 'POST':
        global language
        language = request.get_data().decode('utf-8')
        print(language)
        return "language achieved: "


# Route to convert the audio to text
@app.route('/converter', methods=['POST'])
def converter():
    if request.method == 'POST':
        audio_file = request.files['audio_file']
        audio_file.save(path_webm)
        text = convert_to_text()
        remove_files()
        text = handle_coffee_order(text)
        return text


# Route to process the order
@app.route('/process_order', methods=['POST'])
def process_order():
    if request.method == 'POST':
        order = request.get_json()
        coffee = order['coffee']
        sugar = order['sugar']
        milk = order['milk']
        store_order(coffee)
        # send_order_to_android_list(order)
        return send_order


# Function to store order details
def store_order(order):
    global orderNumber
    orderNumber += 1
    global send_order
    send_order = f"{order};{orderNumber}"
    # send_order_to_android_list(order)


# Function to send the order to an android device
def send_order_to_android_list(order):
    # Define the IP address and port of the Android application running on the same server
    android_ip = '10.110.110.119'  # this need to be change everytime the android device is connected to a new network
    android_port = 9999  # Replace with the port number the Android application is listening on

    try:
        # Create a TCP socket
        client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

        # Connect to the Android application
        client_socket.connect((android_ip, android_port))

        # Convert the order dictionary to JSON string
        order_json = json.dumps(order)

        # Send the order to the Android application
        client_socket.send(order_json.encode())

        # Close the socket connection
        client_socket.close()

        # Return a success message
        return "Order sent to Android application successfully."

    except ConnectionRefusedError:
        return "Failed to connect to the Android application."

    except Exception as e:
        return f"An error occurred while sending the order: {str(e)}"


# Function to convert audio to text
def convert_to_text():
    convert_to_wav()
    r = sr.Recognizer()
    with sr.AudioFile(path_wav) as source:
        audio_data = r.record(source)
        try:
            text = r.recognize_google(audio_data, language="en-EN")
        except sr.UnknownValueError:
            try:
                text = r.recognize_google(audio_data)
            except sr.UnknownValueError:
                text = "I'm sorry, I could not understand you. Please try again."
        return text


# Function to convert the audio file to .wav format
def convert_to_wav():
    subprocess.call([ffmpeg_path, '-i', path_webm, path_wav])


# Function to remove files
def remove_files():
    extensions = ['.wav', '.webm']
    for ext in extensions:
        if os.path.exists(path_no_extension + ext):
            os.remove(path_no_extension + ext)


# Function to convert text to speech
def text_to_speech(text):
    voice_dict = {'Male': 0, 'Female': 1}
    code = voice_dict['Male']
    engine = pyttsx3.init()

    # Setting up voice rate
    engine.setProperty('rate', 150)

    # Setting up volume level between 0 and 1
    engine.setProperty('volume', 0.8)

    # Change voices: 0 for male and 1 for female
    voices = engine.getProperty('voices')
    engine.setProperty('voice', voices[code].id)

    engine.say(text)
    engine.runAndWait()


def current_order(order_stage):
    coffee = ""
    full_order = ""
    for key, value in dict_coffee.items():
        if order_stage == 0:
            for _ in range(int(value)):
                full_order += str(key) + ","
        coffee += str(value) + " " + str(key)
        if int(value) > 1:
            coffee += "s, "
        else:
            coffee += ", "
    coffee = coffee.rstrip(", ")
    if order_stage == 0:
        store_order(full_order)
        print(full_order)
    return coffee


# Makes a new copy of all coffees available
def coffee_copy():
    global coffee_types_temp
    coffee_types_temp = coffee_types.copy()


# Empty current order
def clear_dict():
    global dict_coffee
    dict_coffee = {}


# Plural word to singular
def make_singular(item):
    p = inflect.engine()

    if p.singular_noun(item):
        singular_form = p.singular_noun(item)
        return singular_form
    else:
        return item


# Updates current list of coffees
def update_dict(item, number):
    dict_coffee.update({item: number})


# Converts word to digit, adds an " and" to separate coffee orders
def word_to_number(voice_text):
    for word in voice_text.split():
        if word in dutch_to_number:
            number = dutch_to_number.get(word)
            voice_text = voice_text.replace(word, number)
        if word in english_to_number:
            number = english_to_number.get(word)
            voice_text = voice_text.replace(word, number)
    for coffee in coffee_types:
        if coffee in voice_text:
            voice_text = voice_text.replace(coffee, coffee + " and")


def handle_coffee_order(voice_text):
    voice_text = voice_text.lower()
    global turn
    global current_coffee
    global dict_coffee
    global coffee_types_temp
    global dutch_to_number
    # remove_and used to ensure coffees are properly registered
    remove_and = " and"
    # voice_text = "i like one coffee one espresso and latte macchiato and cappuccino"
    print(voice_text)

    if turn == 0:
        # Copies array of coffees
        coffee_copy()
        word_to_number(voice_text)

        # Pattern to match numbers their associated items
        pattern = r"\b(\d+)\b\s+(\w+(?:\s+\w+)?)"
        matches = re.findall(pattern, voice_text)
        # If number in voice_text
        if matches:
            for match in matches:
                number = match[0]
                item = match[1].strip()
                # Remove the and previously added " and" to separate coffees
                if remove_and in item:
                    item = item.replace(remove_and, "")
                item = make_singular(item)
                if item in coffee_types_temp:
                    # If coffee not already queued for brewing
                    update_dict(item, number)
                    coffee_types_temp.remove(item)
        # If no number present in voice_text but coffee requested
        for coffee in coffee_types_temp:
            if coffee in voice_text:
                number = 1
                update_dict(coffee, number)
                coffee_types_temp.remove(coffee)

        if dict_coffee:
            turn = 1
            return f"You have requested {current_order(turn)}. Is this correct?"
        else:
            clear_dict()
            return f"I'm sorry, I could not understand you. What coffee would you like?"

    elif turn == 1:
        if voice_text in positive_response:
            turn = 0
            response = f"Brewing {current_order(turn)} now!"
            clear_dict()
            return response
        elif voice_text in negative_response:
            turn = 0
            response = f"What coffee would you like instead?"
            clear_dict()
            return response
        else:
            return f"I'm sorry, I could not understand you. Would you like {current_order(turn)}? Please say Yes or No"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=122, ssl_context='adhoc')
