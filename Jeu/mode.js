var ModeJeu = function(){

};

ModeJeu.prototype.init = function(){

	var sonsMode = [
	"sons/mode/choixmode.mp3",
	"sons/mode/mode1j.mp3",
	"sons/mode/mode2j.mp3"
	];

	//Création de la source
	source = context.createBufferSource();

	//Création du panner
	//panner = context.createPanner();
	//Routing
	source.connect(panner);
	panner.connect(context.destination);

	source.loop = true;
	setAudioSource(source, 0, sonsMode);
	source.start();

	/*******

		KEYBOARD

	*******/
	window.addEventListener("keydown", keyboardMode, false );

	function keyboardMode(event){
		//Transforme keyCode en String correspondant
		touche = String.fromCharCode(event.keyCode);
		console.log(touche);

		switch(touche){
			case "F":
				//Mode 1 joueur
				console.log("1j");
				mode = 0;
				explicationMode(mode);
				break;
			case "J":
				//Mode 2 joueur
				console.log("2j");
				mode = 1;
				explicationMode(mode);
				break;
			case " ":
				//On arrete le son
				source.stop();
				//On vide le canvas
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				//On affiche le message de validation du mode de jeu
				if(mode == 0){
					ctx.fillText("Vous avez validé le mode 1 joueur", canvas.width/2, canvas.height/2);
				} else if ( mode == 1){
					//On affiche le nouveau message
					ctx.fillText("Vous avez validé le mode 2 joueurs", canvas.width/2, canvas.height/2);
				}
				//On retire le listener d'evenement clavier
				window.removeEventListener("keydown", keyboardMode);

				//Fichier Narrattion.js
				//Lancement de la premiere phase de narration
				var narration = new Narration();
				narration.init();
				narration.part1();
				/*var jeu = new Jeu4();
				jeu.instructions();*/
				break;
			default:
				return;
		}
	}

	explicationMode = function(mode){
		if(mode == 0){
			source.stop();
			//Création de la source
			source = context.createBufferSource();

			//Routing
			source.connect(panner);
			panner.connect(context.destination);

			source.loop = true;
			setAudioSource(source, 1, sonsMode);
			source.start();

			//On vide le canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			//On affiche le nouveau message
			ctx.fillText("Vous avez choisis le mode 1 joueur", canvas.width/2, canvas.height/2);
			ctx.fillText("F: 1 joueur", canvas.width/3, canvas.height/1.5);
			ctx.fillText("J: 2 joueurs", 1.5*canvas.width/3, canvas.height/1.5);
			ctx.fillText("Espace: Valider", 2*canvas.width/3, canvas.height/1.5);	
		}
		else if(mode == 1){
			source.stop();
			//Création de la source
			source = context.createBufferSource();

			//Routing
			source.connect(panner);
			panner.connect(context.destination);

			source.loop = true;
			setAudioSource(source, 2, sonsMode);
			source.start();


			//On vide le canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			//On affiche le nouveau message
			ctx.fillText("Vous avez choisis le mode 2 joueurs", canvas.width/2, canvas.height/2);
			ctx.fillText("F: 1 joueur", canvas.width/3, canvas.height/1.5);
			ctx.fillText("J: 2 joueurs", 1.5*canvas.width/3, canvas.height/1.5);
			ctx.fillText("Espace: Valider", 2*canvas.width/3, canvas.height/1.5);	
		}
	}
}

