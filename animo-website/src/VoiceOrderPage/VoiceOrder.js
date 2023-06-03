import React from 'react'
import './VoiceOrder.css'
import { useNavigate } from 'react-router-dom';


function VoiceOrder() {
    let stream, recorder, chunks, media;
    const navigate = useNavigate();

    const handleBack = () =>
    {
        navigate('/select-order');
    };

    const recordVoice = () => {
        let recType = {
            audio: {
                tag: 'audio', type: 'audio/wav', ext: '.wav', gUM: {audio: true}
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
            })
    }
    const stopRecording = () => {
        recorder.stop();
    }

    const makeLink = () => {
        let blob = new Blob(chunks, {type: 'audio/wav'});
        const formData = new FormData();
        formData.append('audio_file', blob, 'sound.wav');
        fetch('/converter', {
            method: 'POST', body: formData
        }).then(async response => {
            if (response.ok) {
                let label = document.getElementById('orderShow');
                label.innerHTML = await response.text();
            } else {
                console.log('HTTP-Error: ' + response.status);
            }
        });
    }

    return (
      <div className="OrderCoffee">
        <button className="ellipse3" onClick={handleBack}>
              <p className="back3">&lt;</p> {/* New "+" text inside the ellipse */}
        </button>
        <h2>Order a coffee or try one of these:</h2>
        <div className="button-container">
          <button className="button">Coffee</button>
          <button className="button">Hot Water</button>
          <button className="button">Hot Chocolate</button>
        </div>
        <div className="dialog-box">
          <p className={"button1"} id={"orderShow"}>Press and hold the logo to order</p>
        </div>
        <div className="logo" onMouseDown={changeTextOne} onMouseUp={changeTextTwo}/>
      </div>
    );
  }

 function changeTextOne(){
    let retrieve = document.getElementById("orderShow");
    retrieve.innerHTML = "Button held down";

 }

 function changeTextTwo() {
    let gimme = document.getElementById("orderShow");
    gimme.innerHTML = "Button let go";
 }
  export default VoiceOrder;
