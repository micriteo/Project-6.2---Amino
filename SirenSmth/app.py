import os
import subprocess

import cryptography
import pyttsx3
from flask import Flask, request, render_template, send_from_directory
import speech_recognition as sr

app = Flask(__name__)
turn = 0
current_coffee = None
array_coffee = []
coffee_types = ["coffee", "koffie", "expresso", "espresso", "milk coffee", "koffie melk", "cappuccino",
                "koffie chocolate", "chocolate coffee", "chocolate milk", "chocolade melk", "hot chocolate",
                "hot water", "heet water", "double expresso", "dubbele espresso",
                "latte macchiato", "wiener melange", "big balls"]  # coffees available
positive_response = ["yes", "sounds good", "sure"]
negative_response = ["no", "nope", "cancel"]


@app.route('/')
def home():
    # subprocess.call("../animo-website npm start", shell=True)
    return render_template("bindex.html")


@app.route('/converter', methods=['POST'])
async def converter():
    if request.method == 'POST':
        audio_file = request.files['audio_file']
        audio_file.save(r'/home/animo/AnimoMisc/new_voice.webm')
        text = await convert_to_text()
        text = handle_coffee_order(text)
        text_to_speech(text)
        return text


async def convert_to_text():
    convert_to_wav()
    r = sr.Recognizer()
    with sr.AudioFile(r'/home/animo/AnimoMisc/new_voice.wav') as source:
        audio_data = r.record(source)
        try:
            text = r.recognize_google(audio_data, language="nl-NL")
        except sr.UnknownValueError:
            try:
                text = r.recognize_google(audio_data)
            except sr.UnknownValueError:
                text = "I'm sorry, I could not understand you. Please try again."
        remove_files()
        return text


def convert_to_wav():
    input_path = r'/home/animo/AnimoMisc/new_voice.webm'
    output_path = r'/home/animo/AnimoMisc/new_voice.wav'
    ffmpeg_path = r"ffmpeg"
    subprocess.call([ffmpeg_path, '-i', input_path, output_path])


def remove_files():
    extensions = ['.wav', '.webm']
    for ext in extensions:
        if os.path.exists(r'/home/animo/AnimoMisc/new_voice' + ext):
            os.remove(r'/home/animo/AnimoMisc/new_voice' + ext)


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
    global turn
    global current_coffee
    global array_coffee

    if turn == 0:
        for coffee in coffee_types:
            if coffee in voice_text.lower():
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
