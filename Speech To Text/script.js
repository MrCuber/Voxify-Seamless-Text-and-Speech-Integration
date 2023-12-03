const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const rec = new SpeechRecognition();
const speech = document.querySelector('textarea');
const speechBtn = document.querySelector('#speak');
const stopBtn = document.querySelector('#stop');
const clearBtn = document.querySelector('#clear');

let flag = 0;

rec.lang = 'en-US';
rec.continuous = true;
rec.onresult = function (e) {
    for(let i=e.resultIndex; i<e.results.length; i++) {
        const script = e.results[i][0].transcript.toLowerCase().trim();
        speech.value = speech.value + " " + script;
    }
    speech.selectionStart = speech.value.length;
    speech.selectionEnd = speech.value.length;
    if(speech.value.length > 0) {
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
}

function stopListening(e) {
    e.preventDefault(); // Prevent form submission
    stopBtn.removeAttribute('disabled');
    rec.stop();
    flag = 0;
}

speechBtn.addEventListener('click', startListening);
stopBtn.addEventListener('click', stopListening);
clearBtn.addEventListener('click', clearAll);
