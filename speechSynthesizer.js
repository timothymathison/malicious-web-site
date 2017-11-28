const synthesis = window.speechSynthesis;
const synthesisText = document.querySelector('#sound');

function speak(){
  const utter = new SpeechSynthesisUtterance(synthesisText.value);
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
}