var Casque = function(){

};

Casque.prototype.init = function(){
	var sonCasque = [
	"sons/casque/casque.mp3"
	];

	//On vide le canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillText("Veuillez-vous munir d'un casque !", canvas.width/2, canvas.height/2);

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
	//Routing
	source.connect(panner);
	panner.connect(context.destination);

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