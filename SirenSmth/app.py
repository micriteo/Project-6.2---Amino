import os
import subprocess

import cryptography
import pyttsx3
from flask import Flask, request, render_template, send_from_directory
import speech_recognition as sr

app = Flask(__name__)
turn = 0
current_coffee = None
coffeeTypes = ["coffee", "expresso", "espresso", "milk coffee", "cappuccino",
               "coffee chocolate", "chocolate coffee", "chocolate milk", "hot chocolate", "hot water",
               "double expresso", "latte macchiato", "wiener melange"]


@app.route('/')
def home():
    # subprocess.call("../animo-website npm start", shell=True)
    return render_template("bindex.html")


@app.route('/converter', methods=['POST'])
async def converter():
    if request.method == 'POST':
        audio_file = request.files['audio_file']
        audio_file.save(r'C:\MainStuff\Uni\Project6.2\new_voice.webm')
        convert_to_wav()
        text = await convert_to_text()
        remove_files()
        text = handle_coffee_order(text)
        text_to_speech(text)
        return text


async def convert_to_text():
    r = sr.Recognizer()
    with sr.AudioFile(r'C:\MainStuff\Uni\Project6.2\new_voice.wav') as source:
        audio_data = r.record(source)
        try:
            text = r.recognize_google(audio_data, language="nl-NL")
        except sr.UnknownValueError:
            text = r.recognize_google(audio_data)
        return text


def convert_to_wav():
    input_path = r'C:\MainStuff\Uni\Project6.2\new_voice.webm'
    output_path = r'C:\MainStuff\Uni\Project6.2\new_voice.wav'
    ffmpeg_path = r"C:\MainStuff\ffmpeg-6.0\bin\ffmpeg.exe"
    subprocess.call([ffmpeg_path, '-i', input_path, output_path])


def remove_files():
    extensions = ['.wav', '.webm']
    for ext in extensions:
        if os.path.exists(r'C:\MainStuff\Uni\Project6.2\new_voice' + ext):
            os.remove(r'C:\MainStuff\Uni\Project6.2\new_voice' + ext)


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

    if turn == 0:
        for coffee in coffeeTypes:
            if coffee in voice_text:
                current_coffee = coffee
                break
        if current_coffee:
            turn = 1
            return f"You have requested a {current_coffee}. Is this correct?"
        else:
            return "I'm sorry, I could not understand you. What coffee would you like?"

    elif turn == 1:
        if "yes" in voice_text or "sounds good" in voice_text or "sure" in voice_text:
            turn = 0
            coffee = current_coffee
            current_coffee = None
            return f"Brewing {coffee} now!"
        elif "no" in voice_text or "nope" in voice_text or "cancel" in voice_text:
            turn = 0
            current_coffee = None
            return "What coffee would you like instead?"
        else:
            return f"I'm sorry, I could not understand you. Would you like a {current_coffee}? Please say Yes or No"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=122, ssl_context='adhoc')
