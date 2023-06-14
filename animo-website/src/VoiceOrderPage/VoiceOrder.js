import React from 'react'
import './VoiceOrder.css'
import { useNavigate } from 'react-router-dom';


function VoiceOrder() {
    let stream, recorder, chunks, media;
    const navigate = useNavigate();

    const handleBack = () =>
    {
        navigate('/home_page');
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

        console.log("Button pressed, start recording...");

    }
    const stopRecording = () => {
        recorder.stop();
        console.log("Button released, start recording...");

    }

    const makeLink = () => {
        let blob = new Blob(chunks, {type: 'audio/wav'});
        const formData = new FormData();
        formData.append('audio_file', blob, 'special.wav');
        fetch('/converter', {
            method: 'POST', body: formData
        }).then(async response => {
            if (response.ok) {
                let label = document.getElementById('orderShow');
                let order = await response.text();
                label.innerHTML = order;
                let msg = new SpeechSynthesisUtterance();
                msg.text = order;
                window.speechSynthesis.speak(msg);
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
        <div className="logo" onMouseDown={recordVoice} onMouseUp={stopRecording} onTouchStart={recordVoice} onTouchEnd={stopRecording}/>
      </div>
    );
  }

  export default VoiceOrder;
