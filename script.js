const speechtotext = document.querySelector('#speechtotext');
const texttospeech = document.querySelector('#texttospeech');
const minigames = document.querySelector('#minigames');

function gotoSpeechToText() {
    window.location.href = 'Speech To Text/index.html';
}

function gotoTextToSpeech() {
    window.location.href = 'Text To Speech/index.html';
}

function gotoMiniGames() {
    window.location.href = 'Mini Games/index.html';
}

speechtotext.addEventListener('click', gotoSpeechToText);
texttospeech.addEventListener('click', gotoTextToSpeech);
minigames.addEventListener('click', gotoMiniGames)