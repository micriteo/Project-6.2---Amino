'use strict';
let log = console.log.bind(console), id = val => document.getElementById(val),
    label = id('label'),
    recordButton = id('recordButton'),
    stream, recorder, chunks, media;

recordButton.onmousedown = (e) => {
    let recType = {
        audio: {
            tag: 'audio',
            type: 'audio/wav',
            ext: '.wav',
            gUM: { audio: true }
        }
    };
    media = recType.audio;
    navigator.mediaDevices.getUserMedia(media.gUM)
        .then(_stream => {
            stream = _stream;
            recorder = new MediaRecorder(stream);
            chunks = [];
            recorder.start();
            recorder.ondataavailable = (e) => {
                chunks.push(e.data);
                if (recorder.state === 'inactive') {
                    makeLink();
                }
            };
        }).catch(log);
};

recordButton.onmouseup = (e) => {
    recorder.stop();
}

function makeLink() {
    let blob = new Blob(chunks, { type: 'audio/wav' });
    const formData = new FormData();
    formData.append('audio_file', blob, 'sound.wav');

    fetch('/converter', {
        method: 'POST',
        body: formData
    }).then(async response => {
        if (response.ok) {
            label.innerHTML = await response.text();
        } else {
            console.log('HTTP-Error: ' + response.status);
        }
    });
}
