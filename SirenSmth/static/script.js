'use strict';

const recordButton = document.getElementById('recordButton');
let recorder, chunks;

recordButton.onclick = (e) => {
    let recType = {
        audio: {
            tag: 'audio',
            type: 'audio/wav',
            ext: '.wav',
            gUM: { audio: true }
        }
    };
    const media = recType.audio;
    navigator.mediaDevices.getUserMedia(media.gUM)
        .then(_stream => {
            const stream = _stream;
            recorder = new MediaRecorder(stream);
            chunks = [];
            recorder.ondataavailable = (e) => {
                chunks.push(e.data);
                if (recorder.state === 'inactive') {
                    makeLink();
                }
            };
            recorder.start();
        })
        .catch(log);
};

class ClickAndHold {
    constructor(target, callback) {
        this.target = target;
        this.callback = callback;
        this.isHeld = false;
        this.activeHoldTimeoutId = null;

        // So it works with desktop and mobile
        ['mousedown', 'touchstart'].forEach(type => {
            this.target.addEventListener(type, this._onHoldStart.bind(this));
        });

        ['mouseup', 'mouseleave', 'mouseout', 'touchend', 'touchcancel'].forEach(type => {
            this.target.addEventListener(type, this._onHoldEnd.bind(this));
        });
    }

    _onHoldStart() {
        this.isHeld = true;
        this.activeHoldTimeoutId = setTimeout(() => {
            if (this.isHeld) {
                this.callback();
            }
        }, 100);
    }

    _onHoldEnd() {
        this.isHeld = false;
        clearTimeout(this.activeHoldTimeoutId);
    }
}

let log = console.log.bind(console),
    id = val => document.getElementById(val),
    label = id('label');

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

new ClickAndHold(recordButton, () => {
    console.log('Press and hold button action');
});