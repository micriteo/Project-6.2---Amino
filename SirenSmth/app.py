import os
import subprocess

import cryptography
import pyttsx3
import flask
from flask import Flask, request, render_template, send_from_directory
import speech_recognition as sr

app = Flask(__name__)


@app.route('/')
def home():
    # subprocess.call("../animo-website npm start", shell=True)
    return render_template("index.html")


@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('srtatic', path)


@app.route('/converter', methods=['POST'])
async def converter():
    if request.method == 'POST':
        audio_file = request.files['audio_file']
        audio_file.save(r'C:\MainStuff\Uni\Project6.2\new_voice.webm')
        convert_to_wav()
        text = await convert_to_text()
        remove_files()
        engine.say(text)
        engine.runAndWait()
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


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=122, ssl_context='adhoc')


def text_to_speech(text, gender):
    """
    :param text: String
    :param gender: gender
    :return: None
    """


voice_dict = {'Male': 0, 'Female': 1}
code = voice_dict[0]

engine = pyttsx3.init()

engine.setProperty('rate', 125)
engine.setProperty('volume', 0.8)
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[code].id)