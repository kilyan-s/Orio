var ModeJeu = function(){

};

ModeJeu.prototype.init = function(){
	/*******

		KEYBOARD

	*******/
	window.addEventListener("keydown", keyboardMode, false );

	function keyboardMode(event){
		//Transforme keyCode en String correspondant
		touche = String.fromCharCode(event.keyCode);
		//console.log(touche);

		switch(touche){
			case "D":
				//Mode 1 joueur
				console.log("1j");
				mode = 0;
				explicationMode(mode);
				break;
			case "F":
				//Mode 2 joueur
				console.log("2j");
				mode = 1;
				explicationMode(mode);
				break;
			case "G":
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

				//Fichier intro.js
				//Lancement de la premiere phase de narration
				var intro = new introNarration();
				intro.init();
				
				break;
			default:
				return;
		}
	}

	explicationMode = function(mode){
		if(mode == 0){
			//On vide le canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			//On affiche le nouveau message
			ctx.fillText("Vous avez choisis le mode 1 joueur", canvas.width/2, canvas.height/2);
			ctx.fillText("D: 1 joueur", canvas.width/3, canvas.height/1.5);
			ctx.fillText("F: 2 joueurs", 1.5*canvas.width/3, canvas.height/1.5);
			ctx.fillText("G: Valider", 2*canvas.width/3, canvas.height/1.5);	
		}
		else if(mode == 1){
			//On vide le canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			//On affiche le nouveau message
			ctx.fillText("Vous avez choisis le mode 2 joueurs", canvas.width/2, canvas.height/2);
			ctx.fillText("D: 1 joueur", canvas.width/3, canvas.height/1.5);
			ctx.fillText("F: 2 joueurs", 1.5*canvas.width/3, canvas.height/1.5);
			ctx.fillText("G: Valider", 2*canvas.width/3, canvas.height/1.5);	
		}
	}
}

