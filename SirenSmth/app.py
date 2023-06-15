import json
import os
import socket
import subprocess
import pyttsx3
from flask import Flask, request, render_template, send_from_directory
import speech_recognition as sr
from voice_paths import *
import re
from word2number import w2n
import inflect

app = Flask(__name__)
turn = 0
current_coffee = None
dict_coffee = {}
coffee_types = ["coffee", "koffie", "expresso", "espresso", "milk coffee", "koffie melk", "cappuccino",
                "koffie chocolate", "chocolate coffee", "chocolate milk", "chocolade melk", "hot chocolate",
                "hot water", "heet water", "double expresso", "dubbele espresso",
                "latte macchiato", "wiener melange"]  # coffees available
positive_response = ["yes", "sounds good", "sure"]
negative_response = ["no", "nope", "cancel", "nee", "nou"]
coffee_types_temp = coffee_types.copy()
# Add more mappings as needed
dutch_to_number = {"een": "1", "twee": "2", "drie": "3", "vier": "4", "vijf": "5", "zes": "6",
                   "zeven": "7", "acht": "8", "negen": "9"}
english_to_number = {"one": "1", "two": "2", "three": "3", "four": "4", "five": "5", "six": "6",
                     "seven": "7", "eight": "8", "nine": "9"}


@app.route('/')
def home():
    # subprocess.call("../animo-website npm start", shell=True)
    return render_template("bindex.html")


@app.route('/drink_order')
def drink_order():
    return "Coffee"


@app.route('/converter', methods=['POST'])
def converter():
    if request.method == 'POST':
        audio_file = request.files['audio_file']
        audio_file.save(path_webm)
        text = convert_to_text()
        remove_files()
        text = handle_coffee_order(text)
        # text_to_speech(text)
        return text


@app.route('/process_order', methods=['POST'])
def process_order():
    if request.method == 'POST':
        order = request.get_json()
        coffee = order['coffee']
        sugar = order['sugar']
        milk = order['milk']
        send_order_to_android_list(order)
        return f"Your order is: {coffee}, {sugar}, {milk}"


def send_order_to_android_list(order):
    # Define the IP address and port of the Android application running on the same server
    android_ip = '141.252.159.141'  # this need to be change everytime the android device is connected to a new network
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


def convert_to_wav():
    subprocess.call([ffmpeg_path, '-i', path_webm, path_wav])


def remove_files():
    extensions = ['.wav', '.webm']
    for ext in extensions:
        if os.path.exists(path_no_extension + ext):
            os.remove(path_no_extension + ext)


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


def current_order():
    coffee = ""
    for key, value in dict_coffee.items():
        coffee += str(value) + " " + str(key)
        if int(value) > 1:
            coffee += "s, "
        else:
            coffee += ", "
    coffee = coffee.rstrip(", ")
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

        # Pattern to match numbers their associated items
        pattern = r"\b(\d+)\b\s+(\w+(?:\s+\w+)?)"
        matches = re.findall(pattern, voice_text)

        if matches:
            for match in matches:
                number = match[0]
                item = match[1].strip()
                if remove_and in item:
                    # Remove the and previously added to separate coffees
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
            return f"You have requested {current_order()}. Is this correct?"
        else:
            clear_dict()
            coffee_copy()
            return f"I'm sorry, I could not understand you. What coffee would you like?"

    elif turn == 1:
        if voice_text in positive_response:
            turn = 0
            response = f"Brewing {current_order()} now!"
            clear_dict()
            coffee_copy()
            return response
        elif voice_text in negative_response:
            turn = 0
            response = f"What coffee would you like instead?"
            clear_dict()
            coffee_copy()
            return response
        else:
            return f"I'm sorry, I could not understand you. Would you like {current_order()}? Please say Yes or No"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, ssl_context='adhoc')
