const SpeechRecognition = webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.continuous = true;
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var alarmTime;

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
	console.log(alarmTime);

};

displayTime = () => {
	let date = new Date();
	let timeString = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);
	document.getElementById("clock").innerHTML = timeString;
	if(alarmTime === timeString){
		activateAlarm();
	}
};

activateAlarm = () => {
	document.getElementById("clock").style = "color: red";
};

window.setTimeout(listen, 50);
window.setInterval(displayTime, 1000);
