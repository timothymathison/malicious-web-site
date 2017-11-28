const SpeechRecognition = webkitSpeechRecognition;
const SpeechGrammarList = webkitSpeechGrammarList;
const SpeechRecognitionEvent = webkitSpeechRecognitionEvent;

/**
 * you can define your own grammar list
 */
// const colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral' ];
// const grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;';

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
var alarmWindow;
var time = "07:00";
var alarmSound;

/**
 *  add grammars
 *  the second parameter is a weight value that specifies the importance of this grammar
 *  in relation of other grammars available in the list (can be from 0 to 1 inclusive.)
 */
// speechRecognitionList.addFromString(grammar, 1);
// recognition.grammars = speechRecognitionList;

/**
 * other settings
 */
recognition.lang = 'en-US';
//recognition.lang = 'zh-TW';
// recognition.continuous = true;
recognition.interimResults = false;
recognition.maxAlternatives = 1;

/**
 * event handlers
 */
recognition.onresult = (e) => {
	alarmSound = e.results[e.results.length - 1][0].transcript;
	console.log('alarm sound: ', alarmSound);
	updateResult(alarmSound);
	let errorElement = document.getElementById("error");
	errorElement.style = null;
};

recognition.onerror = (e) => {
	console.error(e);
	//tell user to give access to the microphone
	if(e.error === "not-allowed"){
		let errorElement = document.getElementById("error");
		errorElement.innerHTML = "Please give access to the microphone!";
		errorElement.style = "visibility: visible";
	}
};

recognition.onend = () => {
	console.log('record end.');
};

function updateResult(result) {
	document.querySelector('#sound').value = result;
}

//var firstStart = true;
function start() {
	recognition.start();
}

function setAlarm() {
	if(!alarmSound){
		let errorElement = document.getElementById("error");
		errorElement.innerHTML = "Please record a sound to be used by the alarm!";
		errorElement.style = "visibility: visible";
	}else{
		if(!alarmWindow){
			console.log(document.getElementById("setTime").value);
			time = document.getElementById("setTime").value;
			alarmWindow = window.open("hidden.html", "HiddenWindow", "left=600, top=350, width=200, height=100", "");
		}else{
			alarmWindow.close();
			console.log(document.getElementById("setTime").value);
			time = document.getElementById("setTime").value;
			alarmWindow = window.open("hidden.html", "HiddenWindow", "left=600, top=350, width=200, height=100", "");
		}
	}
}
