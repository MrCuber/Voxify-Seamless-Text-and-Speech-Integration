const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const rec = new SpeechRecognition();

rec.lang = 'en-US';
rec.continuous = true;
rec.onresult = function (e) {
    const acceptedColors = ['blue', 'red', 'green', 'yellow', 'orange', 'purple', 'black', 'white', 'gray', 'brown', 'pink', 'cyan', 'magenta', 'violet'];
    const spokenColors = [];
    for(let i=e.resultIndex; i<e.results.length; i++) {
        const script = e.results[i][0].transcript.toLowerCase().trim();
        const p = document.createElement('p');
        p.textContent = script;
        if(script === 'stop') {
            rec.stop();
            alert('Stopped');
            break;
        }
        if(script === 'reset') {
            document.body.style.backgroundColor = 'white';
            alert('Reset Completed');
            break;
        }
        if(acceptedColors.includes(script)) {
            document.body.style.backgroundColor = script;
            document.body.appendChild(p);
            spokenColors.push(script);
        } else {
            alert('Please say a valid color');
        } 
    }
    console.log(spokenColors);
}
rec.start();