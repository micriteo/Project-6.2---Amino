import json
import os
import socket
import subprocess
import pyttsx3
from flask import Flask, request, render_template, send_from_directory
import speech_recognition as sr
from voice_paths import *

app = Flask(__name__)
turn = 0
current_coffee = None
array_coffee = []
coffee_types = ["coffee", "koffie", "expresso", "espresso", "milk coffee", "koffie melk", "cappuccino",
                "koffie chocolate", "chocolate coffee", "chocolate milk", "chocolade melk", "hot chocolate",
                "hot water", "heet water", "double expresso", "dubbele espresso",
                "latte macchiato", "wiener melange", "big balls"]  # coffees available
positive_response = ["yes", "sounds good", "sure"]
negative_response = ["no", "nope", "cancel", "nee"]


# # Create a socket for sending data to the Android app
# android_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# android_host = '2.10.20.172'  # Replace with your Android device's IP
# android_port = 122  # Replace with your Android device's listening port
# android_socket.connect((android_host, android_port))

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
        # order_text = f"Your order is: {coffee}, {sugar}, {milk}"


        # android_socket.send(order_text.encode())

        result = send_order_to_android_list(order)


        return f"Your order is: {coffee}, {sugar}, {milk}"


def send_order_to_android_list(order):
    # Define the IP address and port of the Android application running on the same server
    android_ip = '172.20.10.2'  # or '127.0.0.1'
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

# # Define the order data
# order_data = {
#     "coffee": "Espresso",
#     "sugar": 2,
#     "milk": "Yes"
#}

# Send the order to the Android app
# result = send_order_to_android(order_data)
# print(result)

def convert_to_text():
    convert_to_wav()
    r = sr.Recognizer()
    with sr.AudioFile(path_wav) as source:
        audio_data = r.record(source)
        try:
            text = r.recognize_google(audio_data, language="nl-NL")
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


def handle_coffee_order(voice_text):
    voice_text = voice_text.lower()
    print(voice_text)
    global turn
    global current_coffee
    global array_coffee

    if turn == 0:
        for coffee in coffee_types:
            if coffee in voice_text:
                current_coffee = coffee
                array_coffee.append(coffee)
        if current_coffee:
            turn = 1
            return f"You have requested a {current_coffee}. Is this correct?"
        else:
            current_coffee = None
            array_coffee = []
            return "I'm sorry, I could not understand you. What coffee would you like?"

    elif turn == 1:
        if voice_text in positive_response:
            turn = 0
            response = f"Brewing {current_coffee} now!"
            current_coffee = None
            array_coffee = []
            return response
        elif voice_text in negative_response:
            turn = 0
            response = "What coffee would you like instead?"
            current_coffee = None
            array_coffee = []
            return response
        else:
            return f"I'm sorry, I could not understand you. Would you like a {current_coffee}? Please say Yes or No"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=122, ssl_context='adhoc')