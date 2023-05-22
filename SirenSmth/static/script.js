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
let turn = 0; //0 for choosing a coffee, 1 for confirming
let currentCoffee = null;//coffee to brew
const coffeeTypes = ["coffee", "koffie", "expresso", "espresso", "milk coffee", "koffie melk", "cappuccino",
    "koffie chocolate", "chocolate koffie", "chocolate milk", "chocolade melk", "hot chocolate", "hot water",
    "heet water", "double expresso", "dubbele espresso", "latte macchiato", "wiener melange", ] //Coffees that are available
//DOES NOT INCLUDE X2 COFFEE/X2 KOFFIE
function makeLink() {
    let blob = new Blob(chunks, { type: 'audio/wav' });
    const formData = new FormData();
    formData.append('audio_file', blob, 'sound.wav');

    fetch('/converter', {
        method: 'POST',
        body: formData
    }).then(async response => {
        if (response.ok) {
            let voiceText = (await response.text()).toLowerCase();
            if (turn == 0) {
                console.log(voiceText)
                label.innerHTML = voiceText;
                coffeeTypes.forEach((coffee) => {
                    if (voiceText.includes(coffee)) {
                        currentCoffee = coffee
                    }
                })
                if (currentCoffee != null) {
                    label.innerHTML = "You have requested a " + currentCoffee +", is this correct?";
                    turn = 1
                }
                else {
                    label.innerHTML = "I'm sorry, I could not understand you. What coffee would you like?"
                }
            } else if (turn == 1) {
                if (voiceText.includes("yes") || voiceText.includes("sounds good") || voiceText.includes("sure")) {
                    label.innerHTML = "Brewing " + currentCoffee + " now!";
                    //Code to make the coffee here
                    turn = 0
                    currentCoffee = null
                }
                else if (voiceText.includes("no") || voiceText.includes("nope") || voiceText.includes("cancel"))
                {
                    label.innerHTML = "What coffee would you like instead?"
                    turn = 0
                    currentCoffee = null
                }
                else {
                    label.innerHTML = "I'm sorry, I could not understand you. Would you like a " + currentCoffee + "? Please say Yes or No"
                }
            }
        } else {
            console.log('HTTP-Error: ' + response.status);
        }
    });
}
