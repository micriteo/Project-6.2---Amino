'use strict'

let log = console.log.bind(console), id = val => document.getElementById(val),
    ul = id('ul'), gUMbtn = id('gUMbtn'),
    start = id('start'),
    stop = id('stop'),
    label = id('label'),
    stream, recorder, counter = 1, chunks, media;


gUMbtn.onclick = e => {
    console.log('gUMbtn clicked');
    let recType = {
        audio: {
            tag: 'audio', type: 'audio/wav', ext: '.wav', gUM: {audio: true}
        }
    };
    media = recType.audio;
    navigator.mediaDevices.getUserMedia(media.gUM).then(_stream => {
        stream = _stream;
        id('gUMArea').style.display = 'none';
        id('btns').style.display = 'inherit';
        start.removeAttribute('disabled');
        recorder = new MediaRecorder(stream);
        recorder.ondataavailable = e => {
            chunks.push(e.data);
            if (recorder.state === 'inactive') makeLink();
        };
    }).catch(log);
}

start.onclick = e => {
    start.disabled = true;
    stop.removeAttribute('disabled');
    chunks = [];
    recorder.start();
}

stop.onclick = e => {
    stop.disabled = true;
    recorder.stop();
    start.removeAttribute('disabled');
}

function makeLink() {
    let blob = new Blob(chunks, {type: media.type})
    const formData = new FormData();
    formData.append('audio_file', blob, `sound${media.ext}`);

    fetch('/converter', {
        method: 'POST',
        body: formData
    })
        .then(async response => {
            if (response.ok) {
                label.innerHTML = await response.text();
            } else {
                console.log("HTTP-Error: " + response.status);
            }
        })
}