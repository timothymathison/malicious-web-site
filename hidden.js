const SpeechRecognition = webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const synthesis = window.speechSynthesis;
recognition.lang = 'en-US';
recognition.continuous = true;
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var timeString;
var alarmTime;
var alarmSound;

recognition.onresult = (e) => {
	const result = e.results[e.results.length - 1][0].transcript;
	console.log('result: ', result);
};

recognition.onerror = (e) => {
	console.error(e);
};

recognition.onend = () => {
	console.log('recognition end.');
	console.log("Listening...");
	recognition.start();
};

listen = () => {
	console.log("Listening...");
	recognition.start();
	alarmTime = window.opener.time + ":00";
	alarmSound = window.opener.alarmSound;
	console.log(alarmTime);
	console.log(alarmSound);
};

displayTime = () => {
	let date = new Date();
	timeString = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);
	document.getElementById("clock").innerHTML = timeString;
	if(alarmTime === timeString){
		activateAlarm();
	}
};

activateAlarm = () => {
	document.getElementById("clock").style = "color: red";

	const utter = new SpeechSynthesisUtterance(alarmSound);
	// the list of all available voices
	const voices = synthesis.getVoices();

	for(i = 0; i < voices.length; ++i) {
		if(voices[i].default) {
			utter.voice = voices[i];
		}
	}

	utter.rate = 2;
	utter.pitch = 2;
	synthesis.speak(utter);

	if(timeString.slice(0, -3) === alarmTime.slice(0, -3)){
		window.setTimeout(activateAlarm, 1000);
	}else{
		document.getElementById("clock").style = null;
	}
};

window.setTimeout(listen, 50);
window.setInterval(displayTime, 1000);
