import React from 'react'
import './VoiceOrder.css'
import { useNavigate } from 'react-router-dom';

// Component for handling voice orders
function VoiceOrder() {

    // Variables for managing voice recording
    let stream, recorder, chunks, media;
    // Use navigate from react-router-dom for routing
    const navigate = useNavigate();

    // Function for handling back navigation
    const handleBack = () =>
    {
        navigate('/home_page');
    };

    // Function to start voice recording
    const recordVoice = () => {
            // Define recording type
        let recType = {
            audio: {
                tag: 'audio', type: 'audio/wav', ext: '.wav', gUM: {audio: true}
            }
        };
        media = recType.audio;
        // Request user media
        navigator.mediaDevices.getUserMedia(media.gUM)
            .then(_stream => {
                // Initialize media recording
                stream = _stream;
                recorder = new MediaRecorder(stream);
                chunks = [];
                recorder.start();
                 // Handle data available event
                recorder.ondataavailable = (e) => {
                    chunks.push(e.data);
                    if (recorder.state === 'inactive') {
                        makeLink(); // Call makeLink function after recording

                    }
                };
            })
        console.log("Button pressed, start recording...");
    }
    // Function to stop voice recording
    const stopRecording = () => {
        recorder.stop();
        console.log("Button released, start recording...");
    }
    // Function to process recorded audio and call the API
    const makeLink = () => {
        // Create blob from the chunks
        let blob = new Blob(chunks, {type: 'audio/wav'});
        const formData = new FormData();
        formData.append('audio_file', blob, 'special.wav');
        fetch('/converter', {
            method: 'POST', body: formData
        }).then(async response => {
            // Handle API response
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
    // Render the component
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