import os
import subprocess
import time

from flask import Flask, request, render_template
import speech_recognition as sr

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/converter', methods=['POST'])
async def converter():
    if request.method == 'POST':
        audio_file = request.files['audio_file']
        audio_file.save('new_voice.webm')
        convert_to_wav()
        text = await convert_to_text()
        remove_files()
        return text


async def convert_to_text():
    r = sr.Recognizer()
    with sr.AudioFile('new_voice.wav') as source:
        audio_data = r.record(source)
        try:
            text = r.recognize_google(audio_data, language="nl-NL")
        except sr.UnknownValueError:
            text = r.recognize_google(audio_data)
        return text


def convert_to_wav():
    input_path = "new_voice.webm"
    output_path = "new_voice.wav"
    ffmpeg_path = r"C:\MainStuff\ffmpeg-6.0\bin\ffmpeg.exe"
    subprocess.call([ffmpeg_path, '-i', input_path, output_path])


def remove_files():
    extensions = ['.wav', '.webm']
    for ext in extensions:
        if os.path.exists('new_voice' + ext):
            os.remove('new_voice' + ext)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=122, ssl_context='adhoc')
