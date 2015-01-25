var Casque = function(){

};

Casque.prototype.init = function(){
	var sonCasque = [
	"sons/casque/casque.mp3"
	];

	var casqueImg = new Image();
	casqueImg.src = "img/narration/casque.svg"
	//On vide le canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(casqueImg, 0, 0);
	// ctx.fillText("Veuillez-vous munir d'un casque !", canvas.width/2, canvas.height/2);
	// ctx.fillText("Appuyez sur espace pour continuer !", canvas.width/2, 2.5*canvas.height/4);

	window.addEventListener("keydown", keyboardCasque, false);

	bufferList = new Array(sonCasque.length);
	for (var i = 0; i< sonCasque.length; i++){
		bufferList = 0;
	}

	//Initialize audio context
	context = new webkitAudioContext();

	//Création de la source
	source = context.createBufferSource();

	//Création du panner
	panner = context.createPanner();
	listener = context.listener;
	//Position panner
	panner.setPosition(0, 2, 0);
	//Position listener
	listener.setPosition(0, 0, 0);
	/*gain = context.createGain();
	gain.gain.value = 10;*/
	//Routing
	source.connect(panner);
	panner.connect(context.destination);
	/*panner.connect(gain);
	gain.connect(context.destination);
*/
	source.loop = true;
	setAudioSource(source, 0, sonCasque);
	source.start();


}

function keyboardCasque(event){
	//Transforme keyCode en String correspondant
	touche = String.fromCharCode(event.keyCode);
	console.log(touche);

	switch(touche){
		case " ":
			console.log("mode");
			//On retire l'event listener
			window.removeEventListener("keydown", keyboardCasque);
			//On arrete de looper le son
			source.loop = false;
			//On coupe le son
			source.stop();
			//On affiche les modes de jeu
			afficherMode();
			/*//Lorsque l'instruction a fini de se jouer on passe aux modes
			source.onended = function(){
				afficherMode();
			}*/
			break;
		default:
			return;
	}
}