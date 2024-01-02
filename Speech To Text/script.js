const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const rec = new SpeechRecognition();
const speech = document.querySelector('textarea');
const speechBtn = document.querySelector('#speak');
const stopBtn = document.querySelector('#stop');
const clearBtn = document.querySelector('#clear');
const downloadBtn = document.querySelector('#downloadLink');
let mediaRecorder;
let audioChunks = [];

rec.lang = 'en-US';
rec.continuous = true;

rec.onresult = function (e) {
    for (let i = e.resultIndex; i < e.results.length; i++) {
        const script = e.results[i][0].transcript.toLowerCase().trim();
        speech.value = speech.value + " " + script;
    }
    speech.selectionStart = speech.value.length;
    speech.selectionEnd = speech.value.length;
    if (speech.value.length > 0) {
        clearBtn.removeAttribute('disabled');
    }
}

function clearAll(e) {
    e.preventDefault();
    speech.value = '';
}

function startListening(e) {
    e.preventDefault();
    flag = 1;
    rec.start();
    stopBtn.removeAttribute('disabled');
    navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
                mediaRecorder = new MediaRecorder(stream);

                mediaRecorder.ondataavailable = function (e) {
                    if(e.data.size > 0) {
                        audioChunks.push(e.data);
                    }
                };

                mediaRecorder.onstop = function () {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    document.getElementById('audioPlayer').src = audioUrl;
                    document.getElementById('downloadLink').href = audioUrl;
                    document.getElementById('downloadLink').download = 'recorded_audio.wav';
                    document.getElementById('downloadLink').style.display = 'block';
                };
                mediaRecorder.start();
            })
            .catch(function (err) {
                console.error('Error accessing microphone: ', err);
            });
}

function stopListening(e) {
    e.preventDefault();
    stopBtn.removeAttribute('disabled');
    downloadBtn.removeAttribute('disabled');
    rec.stop();
    flag = 0;
    mediaRecorder.stop();
}


rec.ondataavailable = function (event) {
    if(event.data.size > 0) {
        recordedChunks.push(event.data);
    }
};

rec.onend = function () {
    const blob = new Blob(recordedChunks, {
        type: 'audio/wav'
    });
    const audioURL = window.URL.createObjectURL(blob);
    downloadLink.href = audioURL;
    downloadLink.download = 'recorded_audio.wav';
};

function downloadAudio(e) {
    e.preventDefault();
    downloadLink.click();
}

speechBtn.addEventListener('click', startListening);
stopBtn.addEventListener('click', stopListening);
clearBtn.addEventListener('click', clearAll);
downloadBtn.addEventListener('click', downloadAudio);