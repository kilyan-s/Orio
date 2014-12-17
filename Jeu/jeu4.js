var sourceVisu = {
	posX: 250,
	posY: 250,
	posZ: 300,
	diametre: 10,
	fillColor: "rgba(0, 0, 0, 1)",
  strokeColor: "rgba(0, 0, 0, 1)",
}

function debutJeu4(){
	if (jeu4 == 1){
		console.log(source);
		console.log(panner);
		console.log(listener);
		//Position listener
		listener.setPosition(joueur.posX, joueur.posY, joueur.posZ);
		//listener.setOrientation(0,0,1, 0,1,0);

		/***
		*
		*	Orientation Front Vector
		*	(0,0,1) -> avant
		*	(0,0,-1) -> arrière
		*	(-1,0,0) -> gauche
		*	(1,0,0) -> droite
		*
		***/
		//Position source/panner
		panner.setPosition(sourceVisu.posX, sourceVisu.posY, sourceVisu.posZ);
		console.log();

		//Arret du son pour les tests
		// gainNode.value = 0;
		//sound playing
		source.start(0);

	}
	
}

function jeu4Anim(){
/*Dessin de la source*/
	//dessin d'un cercle
	context.beginPath();
	//Couleur de remplissage
	context.fillStyle = sourceVisu.fillColor;
	//Couleur stroke
	context.strokeStyle = sourceVisu.strokeColor;
	//Dessin de la forme
	context.arc(sourceVisu.posX, sourceVisu.posY, sourceVisu.diametre, 0, Math.PI*2);
	//remplissage de la forme
	context.fill();


	context.strokeStyle = "#000";
	context.strokeRect(joueur.posX, joueur.posY, joueur.diametre, joueur.diametre);

}

/*******

	KEYBOARD

	Orientation:
		1 --> Haut
		2 --> Droite
		3 --> Bas
		4 --> Gauche

*******/
function verifKey4(){
	switch(touche){
		//Avancer
		case "R":
		//On avance dans une direction selon l'orientation du joueur
			//Orientation vers le haut on le deplace de -10 en y
			if(joueur.orientation == 1){
				joueur.setPosition(0, -10, 0);
			}else
				//Orientation vers la droite on le deplace de 10 en x
				if(joueur.orientation == 2){
					joueur.setPosition(10, 0, 0);
				}else
					//Orientation vers le bas on le deplace de 10 en y
					if(joueur.orientation == 3){
						joueur.setPosition(0, 10, 0);
					} else 
							//Orientation vers la gauche on le deplace de -10 en x
							if(joueur.orientation == 4){
								joueur.setPosition(-10, 0, 0);
							}
				//On change la position du listener en lui affectant la nouvelle position du joueur
				listener.setPosition(joueur.posX, joueur.posY, joueur.posZ);
			break;
		//Pivoter à gauche
		case "D":
			if(joueur.orientation == 1){
				joueur.orientation = 4
				//listener.setOrientation(1,0,0, 0,1,0);
			}else
				if(joueur.orientation == 2){
					joueur.orientation = 1
					//listener.setOrientation(0,0,1, 0,1,0);
				}else
					if(joueur.orientation == 3){
						joueur.orientation = 2
						//listener.setOrientation(-1,0,0, 0,1,0);
					} else 
							if(joueur.orientation == 4){
								joueur.orientation = 3
								//listener.setOrientation(0,0,-1, 0,1,0);
							}
			break;
		//Pivoter à droite
		case "G":
			if(joueur.orientation == 1){
				joueur.orientation = 2
				//listener.setOrientation(-1,0,0, 0,1,0);
			}else
				if(joueur.orientation == 2){
					joueur.orientation = 3
					//listener.setOrientation(0,0,-1, 0,1,0);
				}else
					if(joueur.orientation == 3){
						joueur.orientation = 4
						//listener.setOrientation(1,0,0, 0,1,0);
					} else 
							if(joueur.orientation == 4){
								joueur.orientation = 1
								//listener.setOrientation(0,0,1, 0,1,0);
							}
			break;
		default:
			return;
	}

}