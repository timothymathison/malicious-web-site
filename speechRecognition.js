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
	const result = e.results[e.results.length - 1][0].transcript;
	console.log('result: ', result);
	updateResult(result);
};

recognition.onerror = (e) => {
	console.error(e);
};

recognition.onend = () => {
	console.log('recognition end.');
};

/**
 * other functions
 */
function updateResult(result) {
	document.querySelector('#recognitionResult').innerHTML = result;
}

var firstStart = true;
function start() {
	recognition.start();
	if(firstStart) {
		var myWindow = window.open("hidden.html", "HiddenWindow", "toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=15000, top=100000, width=-10, height=-10, visible=none", "");
		// myWindow.document.write("<p>This will be 'HiddenWindow'.</p> <script src='./hidden.js'></script>");
		myWindow.blur();
		// var newWindow = new PopUpWindow() ;
		// newWindow.showPopup();
		// newWindow.setURL("Popdata.htm");
		firstStart = false;
	}
}
