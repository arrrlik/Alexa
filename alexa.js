// dla kompatybilności
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
window.SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

// inicjalizacja modułu rozpoznania mowy
const Alexa = new SpeechRecognition();
  Alexa.lang = 'en-US';
  Alexa.interimResults = false;
  Alexa.maxAlternatives = 1;

// odniesienia do elemntów DOM przezentujących wyniki
let status = null;
let result = null;
let issues = null;
let confidence = null;
let command = null;
let simulate = null;
let start = null;

// kiedy dokumen jest już załadowany a DOM zbudowany
document.addEventListener("DOMContentLoaded", function(event) { 
  status = document.querySelector('#status');
  result = document.querySelector('#result');
  issues = document.querySelector('#issues');
  confidence = document.querySelector('#confidence');
  command = document.querySelector('#command');
  simulate = document.querySelector('#simulate');
  start = document.querySelector('#start');
  
  start.onclick = function () {
    Alexa.start();
    console.log('rozpoznawanie głosu rozpoczęte!');
  }
  simulate.onclick = function () {
    execute( command.value.trim() );
  }
});

Alexa.onstart = function() {
  status.innerHTML = "Alexa nasłuchuje!"
  result.innerHTML = "...";
}
Alexa.onresult = function (event) {
  const transcript = event.results[event.results.length - 1][0].transcript;
  status.innerHTML = 'Rozpoznano transkrypt!';
  result.innerHTML = transcript;
  confidence.innerHTML = String(event.results[event.results.length - 1][0].confidence * 100)+'%';
  execute(transcript.trim());
}
Alexa.onspeechend = function () {
  Alexa.stop();
  status.innerHTML = 'Rozpoznano koniec polecenia!';
}
Alexa.onnomatch = function (event) {
  confidence.innerHTML = 'Nie rozpoznano polecenia';
}
Alexa.onerror = function (event) {
  issues.innerHTML = event.error;
}
