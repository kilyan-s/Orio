/**


**/
var lancementJeu3 = false;
var Jeu3 = function(){};

Jeu3.prototype.init = function() {
	sourceFond.stop();
	console.log("Jeu 3");
	var nbErreurs3 = 0;

	/*******
		Position du crochet et des goupilles eh Hz
	*******/
	var crochetPos = 30;

	var goupille1 = 86;
	var goupille2 = 132;
	var goupille3 = 175;
	var goupille4 = 220;
	//Déplacement du crochet à chaque touche appuyée 
	var deplacement = 1;
	//Pour savoir quelles goupilles sont levées 
	var goupille1bool = false;
	var goupille2bool = false;
	var goupille3bool = false;
	var goupille4bool = false;

	//Min des frequences des EQ
	var goupille1Min = 76;
	var goupille2Min = 122;
	var goupille3Min = 153;
	var goupille4Min = 200;

	//Max des frequences des EQ
	var goupille1Max = 96;
	var goupille2Max = 142;
	var goupille3Max = 198;
	var goupille4Max = 250;

	var fileList3 = [
		"sons/jeu3/son.wav",
		"sons/commun/recommencer.mp3"
	];

	//
	var revInput = null;

	// Création des variables des filtres pour pouvoir les utiliser dans plusieurs fonctions, le numéro correspond à la fréquence qui est masquée/affichée
	var filtre86 = null;
	var filtre132 = null;
	var filtre175 = null;
	var filtre220 = null;
	var filtrelow = null;

	/*
		Il faut re-créer le context à chaque fois sinon il n'est pas visible dans les autres fichiers
	*/
	context = new webkitAudioContext;
	source = context.createBufferSource();
	panner = context.createPanner();
	listener = context.listener;

	panner.setPosition(0,10,0);
	listener.setPosition(0,0,0);

	/*source.connect(panner);
	panner.connect(context.destination);*/

	/**

		Création des filtres

	**/
	// Créé le filtre
  filtre86 = context.createBiquadFilter();
  // Choisir le type du filtre, ici c'est peaking, ce type de filtre permet de sélectionner une fréquence bien spécifique 
	filtre86.type = "peaking";
	// On choisit la frequence du filtre
	filtre86.frequency.value = 76;
	// On choisit "l'étendue" du filtre, si ce chiffre est grand on va bien cibler la fréquence, si celui-ci est bas on vas sélectionner plus de fréquence aux alentours
	filtre86.Q.value = 20;
	// Permet de monter le gain ou non de cette fréquence --> va de -40 à 40
	filtre86.gain.value = 10;

	filtre132 = context.createBiquadFilter();
	filtre132.type = "peaking";
	filtre132.frequency.value = 122;
	filtre132.Q.value = 20;
	filtre132.gain.value = 0;
             
	filtre175 = context.createBiquadFilter();
	filtre175.type = "peaking";
	filtre175.frequency.value = 153;
	filtre175.Q.value = 20;
	filtre175.gain.value = 0; 
	
	filtre220 = context.createBiquadFilter();
	filtre220.type = "peaking";
	filtre220.frequency.value = 200;
	filtre220.Q.value = 20;
	filtre220.gain.value = 0;  
	
	filtrelow = context.createBiquadFilter();
	filtrelow.type = "lowpass";
	filtrelow.frequency.value = 100;
	filtrelow.Q.value = 1;
	filtrelow.gain.value = -60; 

	//Choisit la source
	setAudioSource(source, 0, fileList3);
	source.loop = true;

	var gainNode = context.createGain();
  gainNode.gain = 0.9;
  // Connexion des deux filtres au buffer
  source.connect(filtrelow);
  filtrelow.connect(filtre220);
  filtre220.connect(filtre175);
  filtre175.connect(filtre132);
  filtre132.connect(filtre86);
	filtre86.connect(gainNode);
  gainNode.connect(context.destination);
      
	source.start(0);
	window.addEventListener("keydown", keyboardJeu3, false);

	/*var interval = window.setInterval(animation, 150);
	//Animation lancé toutes les 300ms
	function animation() {
		//console.log("animation");
		
	}*/
/*******

	Test goupille
	Teste la position du crochet par rapport à la goupille

*******/
	function testGoupille() {
		if (filtre86.frequency.value >= (goupille1 - 1) && filtre86.frequency.value <= (goupille1 + 1)){
			console.log("Goupille 1");
			goupille1bool = true; 
			filtre86.frequency.value = 76;
			//On passe au 2e EQ
			//On passe le gain de l'EQ 86Hz à 0
			filtre86.gain.value = 0;
			//On change la frequence du filtre lowpass
			filtrelow.frequency.value = 150;
			//On passe le gain de l'EQ 132Hz à 11
			filtre132.gain.value = 11;

		}
		else if (filtre132.frequency.value >= (goupille2 - 1) && filtre132.frequency.value <= (goupille2 + 1)){
			console.log("Goupille 2");
			goupille2bool = true;
			filtre132.frequency.value = 122;
			//On passe à l'EQ 3
			filtre132.gain.value = 0;
			filtrelow.frequency.value = 200;
			filtre175.gain.value = 8;
		}
		else if(filtre175.frequency.value >= (goupille3 - 2) && filtre175.frequency.value <= (goupille3 + 3)){
			console.log("Goupille 3");
			goupille3bool = true;
			filtre175.frequency.value = 153;
			//On passe a l'EQ 4
			filtre175.gain.value = 0;
			filtrelow.frequency.value = 260;
			filtre220.gain.value = 8;
		}
		else if(filtre220.frequency.value >= (goupille4 - 1) && filtre220.frequency.value <= (goupille4 + 4)){
			console.log("Goupille 4");
			goupille4bool = true;
			filtre220.frequency.value = 200;
		}
		else{
			console.log("Error");
			nbErreurs3 ++;
			console.log(nbErreurs3);
			//Si le joueur fait moins de 5 erreur le jeu continue
			if(nbErreurs3 <= 5){

			}else{
				console.log("perdu");
				window.removeEventListener("keydown", keyboardJeu3);
				finJeuLose();
			}
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
	//Message visuel Victoire
	ctx.font = "bold 15px Arial";
	ctx.textAlign = 'center';
	ctx.fillStyle = "rgba(255,255,255,0.65)";
	ctx.fillRect ((canvas.width/2 - 207), (canvas.height/2 - 100), 414, 147);
	ctx.fillStyle = "rgba(24,109,148,1)";
 	ctx.fillText("Félicitation vous avez ouvert la porte !", canvas.width/2, (canvas.height/2 - 25));
	 	
	source.stop();
	window.removeEventListener("keydown", keyboardJeu3);
	//Lancement de la suite de la narration
	var narration = new Narration();
	narration.part4();
}

function finJeuLose(){
	//Message visuel perdu
	ctx.font = "bold 15px Arial";
	ctx.textAlign = 'center';
	ctx.fillStyle = "rgba(255,255,255,0.65)";
		ctx.fillRect ((canvas.width/2 - 207), (canvas.height/2 - 100), 414, 147);
 	ctx.fillStyle = "rgba(24,109,148,1)";
 	ctx.fillText("Vous avez perdu !", canvas.width/2, (canvas.height/2 - 40));
 	ctx.fillText("Appuyez sur espace pour relancer le jeu!", canvas.width/2, (canvas.height/2 ));			

	window.addEventListener("keydown", keyboardJeu3Relancer, false);
	lancementJeu3 = false;
	//On arrete le son si il est en train de jouer
 	source.stop();
 	panner.setPosition(0,5,0);
 	listener.setPosition(0,0,0);
 	//Création de la source
	sonRecommencer = context.createBufferSource();

	//Routing
	sonRecommencer.connect(panner);
	panner.connect(context.destination);

	sonRecommencer.loop = true;
	setAudioSource(sonRecommencer, 1, fileList3);
	sonRecommencer.start();

}
/*******

	KEYBOARD

*******/
	function keyboardJeu3(event) {
		touche = String.fromCharCode(event.keyCode);
		// console.log(touche);

		switch(touche){
			//Avancer
			case "J":
				if(goupille1bool == false && goupille2bool == false && goupille3bool == false && goupille4bool == false){
					// Deplacer EQ1
					console.log("Deplacer EQ1");
					//ON increment la fréquence du filtre
					filtre86.frequency.value += 1;
					console.log(filtre86.frequency.value);
					//Le max de la frequence du filtre est 96Hz
					if (filtre86.frequency.value >= 96){
						filtre86.frequency.value = 96; 
						console.log("Vous ne pouvez plus avancer");
					}
				}
				else if(goupille1bool == true && goupille2bool == false && goupille3bool == false && goupille4bool == false){
					//Deplacer EQ2
					console.log("Deplacer EQ2");
					filtre132.frequency.value += 1;
					console.log(filtre132.frequency.value);
					if (filtre132.frequency.value >= 142){
						filtre132.frequency.value = 142; 
						console.log("Vous ne pouvez plus avancer");
					}
				}
				else if (goupille1bool == true && goupille2bool == true && goupille3bool == false && goupille4bool == false){
					//Deplacer EQ3
					console.log("Deplacer EQ3");
					filtre175.frequency.value += 1;
					console.log(filtre175.frequency.value);
					if (filtre175.frequency.value >= 198){
						filtre175.frequency.value = 198; 
						console.log("Vous ne pouvez plus avancer");
					}
				}
				else if (goupille1bool == true && goupille2bool == true && goupille3bool == true && goupille4bool == false){
					// Deplacer EQ4
					console.log("Deplacer EQ4"); 
					filtre220.frequency.value += 1;
					console.log(filtre220.frequency.value);
					if (filtre220.frequency.value >= 250){
						filtre220.frequency.value = 250; 
						console.log("Vous ne pouvez plus avancer");
					}
				}
				// crochetPos += deplacement;
				// console.log(crochetPos);
				break;
			//Reculer
			case "F":
				if(goupille1bool == false && goupille2bool == false && goupille3bool == false && goupille4bool == false){
					// Deplacer EQ1
					console.log("Deplacer EQ1");
					filtre86.frequency.value -= 1;
					console.log(filtre86.frequency.value);
					if (filtre86.frequency.value <= 76){
						filtre86.frequency.value = 76; 
						console.log("Vous ne pouvez plus reculer");
					}
				}
				else if(goupille1bool == true && goupille2bool == false && goupille3bool == false && goupille4bool == false){
					//Deplacer EQ2
					console.log("Deplacer EQ2");
					filtre132.frequency.value -= 1;
					console.log(filtre132.frequency.value);
					if (filtre132.frequency.value <= 122){
						filtre132.frequency.value = 122; 
						console.log("Vous ne pouvez plus reculer");
					}
				}
				else if (goupille1bool == true && goupille2bool == true && goupille3bool == false && goupille4bool == false){
					//Deplacer EQ3
					console.log("Deplacer EQ3");
					filtre175.frequency.value -= 1;
					console.log(filtre175.frequency.value);
					if (filtre175.frequency.value <= 153){
						filtre175.frequency.value = 153; 
						console.log("Vous ne pouvez plus reculer");
					}
				}
				else if (goupille1bool == true && goupille2bool == true && goupille3bool == true && goupille4bool == false){
					// Deplacer EQ4
					console.log("Deplacer EQ4");
					filtre220.frequency.value -= 1;
					console.log(filtre220.frequency.value);
					if (filtre220.frequency.value <= 200){
						filtre220.frequency.value = 200; 
						console.log("Vous ne pouvez plus reculer");
					}
				}
				// crochetPos -= deplacement;
				// console.log(crochetPos);
				break;
			//Lever
			case " ":
				console.log("soulever");
				testGoupille();
				break;

			default:
				return;
		}
	}

	function keyboardJeu3Relancer(event) {
		touche = String.fromCharCode(event.keyCode);
		// console.log(touche);

		switch(touche){
			case " ":
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				//Arrete le son "recommencer le jeu"
				sonRecommencer.loop = false;
				sonRecommencer.stop();
				//console.log(jeu);
				var jeu3 = new Jeu3();
				jeu3.init();

				window.removeEventListener("keydown", keyboardJeu3Relancer);
				break;

			default:
				return;
		}
	}
};

Jeu3.prototype.instructions = function(){
	/***
	*
	*	AFFICHAGE INSTRUCTIONS JEU 3
	*
	***/
	var bgInstruction = new Image();
	bgInstruction.src = "img/jeu3/jeu3_instructions.svg"
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(bgInstruction, 0, 0);

	/***
	*
	*	SONS INSTRUCTIONS JEU 3
	*
	***/
	sonsJeu3Instructions = [
	"sons/instructions/jeu3.mp3",
	"sons/instructions/jeu32j.mp3",
	"sons/instructions/fin_instructions.mp3",
	"sons/jeu3/son.wav"
	];
	//Source Fond
	sourceFond = context.createBufferSource();
	pannerFond = context.createPanner();

	var gainFond = context.createGain();
	gainFond.gain.value = 1;

	pannerFond.setPosition(0, 10, 0);

	sourceFond.connect(pannerFond);
	pannerFond.connect(gainFond);
	gainFond.connect(context.destination);
	//Musique de fond
	setAudioSource(sourceFond, 3, sonsJeu3Instructions);
	sourceFond.loop = true;
	sourceFond.start();

	lireInstructions();
	function lireInstructions(){
		//Création de la source
		sourceInstructions = context.createBufferSource();
		
		//Routing
		sourceInstructions.connect(pannerInstructions);
		pannerInstructions.setPosition(0, 15, 0);

		sourceInstructions.loop = false;
		setAudioSource(sourceInstructions, 0, sonsJeu3Instructions);
		//On donne les instructions selon le mode de jeu
		if(mode == 0){
			sourceInstructions.start();
			// console.log("relire instruction " + relireInstruction1);
			sourceInstructions.onended = function(){
				if(!lancementJeu3){
					sourceInstructions = null;
					// console.log("!relireInstruction1");
					//On lance la phrase de fin d'instruction en boucle
					//Création de la sourceInstructions
					sourceInstructions = context.createBufferSource();
					pannerInstructions = context.createPanner();
					pannerInstructions.setPosition(0, 10, 0);
					//Routing
					sourceInstructions.connect(pannerInstructions);
					pannerInstructions.connect(gainInstructions);
					gainInstructions.connect(context.destination);
					sourceInstructions.loop = true;
					setAudioSource(sourceInstructions, 2, sonsJeu3Instructions);
					sourceInstructions.start();
					// console.log("FIN JEU INSTRUCTIONS");
				}
			}
		}else{
			sourceInstructions.start();
			sourceInstructions.onended = function(){
				if(!lancementJeu3){
					//Création de la sourceInstructions
					sourceInstructions = context.createBufferSource();
					pannerInstructions = context.createPanner();
					pannerInstructions.setPosition(0, 15, 0);
					//Routing
					sourceInstructions.connect(pannerInstructions);
					pannerInstructions.connect(gainInstructions);
					gainInstructions.connect(context.destination);
					sourceInstructions.loop = false;
					setAudioSource(sourceInstructions, 1, sonsJeu3Instructions);
					sourceInstructions.start();
					// console.log("INSTRUCTIONS 2J");
					sourceInstructions.onended = function(){
						if(!lancementJeu3){
							//On lance la phrase de fin d'instruction en boucle
							//Création de la source
							sourceInstructions = context.createBufferSource();
							/*changer*/
							// pannerInstructions = context.createPanner();
							pannerInstructions.setPosition(0, 10, 0);
							//Routing
							sourceInstructions.connect(pannerInstructions);
							pannerInstructions.connect(gainInstructions);
							gainInstructions.connect(context.destination);
							sourceInstructions.loop = true;
							setAudioSource(sourceInstructions, 2, sonsJeu3Instructions);
							sourceInstructions.start();
							// console.log("FIN JEU INSTRUCTIONS");
						}//Fin if lancement jeu
					}
				}//Fin if lancement jeu
			}//Fin source onended
		}
	}
	//Fin func lireInstructions
	
	/***
	*
	*	KEYBOARD INSTRUCTIONS JEU 2
	*
	***/

	//Evenement clavier
	window.addEventListener("keydown", keyboardInstruction3, false);

	//this.init();
	function keyboardInstruction3(event){
		//Transforme keyCode en String correspondant
		touche = String.fromCharCode(event.keyCode);
		console.log(touche);

		switch(touche){
			case " ":
				console.log("Lancer Jeu");
				//On retire l'event listener
				window.removeEventListener("keydown", keyboardInstruction3);
				//On arrete de looper le son
				sourceInstructions.loop = false;
				//On coupe le son
				sourceInstructions.stop();
				//Pour que la fin des instructions ne se lance pas si le jeu est déjà lancé
				lancementJeu3 = true;
				//On affiche lance le jeu
				var jeu3 = new Jeu3();
				jeu3.init();
				break;
			case "F":
				console.log("Relire instructions");
				// relireInstruction1 = true;
				sourceInstructions.loop = false;
				//On met une fonction vide au onended pour que les sons suivants d'instructions ne se lisent pas 
				sourceInstructions.onended = function(){};
				sourceInstructions.stop();
				sourceInstructions = null;	
				//Relance les instructions
				lireInstructions();
				break;
			default:
				return;
		}
	}

};