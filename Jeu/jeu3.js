var jeu3 = function(){};

jeu3.prototype.init = function() {
	console.log("salut !");
	/*******
		Position du crochet et des goupilles 
	*******/
	var crochetPos = 3;
	var goupille1 = 19;
	var goupille2 = 34;
	var goupille3 = 73;
	var goupille4 = 92;
	//Déplacement du crochet à chaque touche appuyée 
	var deplacement = 1;
	//Pour savoir quelles goupilles sont levées 
	var goupille1bool = false;
	var goupille2bool = false;
	var goupille3bool = false;
	var goupille4bool = false;

	/*
		Il faut re-créer le context à chaque fois sinon il n'est pas visible dans les autres fichiers
	*/
	context = new webkitAudioContext;
	source = context.createBufferSource();
	panner = context.createPanner();
	listener = context.listener;

	panner.setPosition(50,50,0);
	listener.setPosition(50,10,0);

	source.connect(panner);
	panner.connect(context.destination);

	setAudioSource(source, 0);
	source.loop = true;

	source.start();
	window.addEventListener("keydown", keyboardJeu3, false);

	var interval = window.setInterval(animation, 150);
	//Animation lancé toutes les 300ms
	function animation() {
		//console.log("animation");
		/*******

			FILTRE SON

		*******/
	}
/*******

	Test goupille
	Teste la position du crochet par rapport à la goupille

*******/
	function testGoupille() {
		switch(crochetPos){
			case goupille1:
				console.log("Goupille 1");
				goupille1bool = true;
				break;
			case goupille2:
				console.log("Goupille 2");
				goupille2bool = true;
				break;
			case goupille3:
				console.log("Goupille 3");
				goupille3bool = true;
				break;
			case goupille4:
				console.log("Goupille 4");
				goupille4bool = true;
				break;
			default:
				return;
		}
		//Si toutes les goupilles ont été levées
		if(goupille1bool == true && goupille2bool == true && goupille3bool == true && goupille4bool == true ){
			
			finJeuWin();
		}

		console.log("goupille1: " + goupille1bool);
		console.log("goupille2: " + goupille2bool);
		console.log("goupille3: " + goupille3bool);
		console.log("goupille4: " + goupille4bool);
	}

/*******

	FIN JEU

*******/
function finJeuWin(){
	console.log("Gagné");
	source.stop();
}
/*******

	KEYBOARD

*******/
	function keyboardJeu3(event) {
		touche = String.fromCharCode(event.keyCode);
		console.log(touche);

		switch(touche){
			//Avancer
			case "F":
				crochetPos += deplacement;
				console.log(crochetPos);
				break;
			//Reculer
			case "D":
				crochetPos -= deplacement;
				console.log(crochetPos);
				break;
			//Lever
			case "G":
				console.log("soulever");
				testGoupille();
				break;

			default:
				return;
		}
	}
};