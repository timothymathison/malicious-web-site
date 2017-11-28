const SpeechRecognition = webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.continuous = true;
recognition.interimResults = false;
recognition.maxAlternatives = 1;

/**
 * event handlers
 */
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
	window.resizeTo(100, 100);
	window.resizeBy(-100, -100);
	//window.blur()
};

window.setTimeout(listen, 100);
