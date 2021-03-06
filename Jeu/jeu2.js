var victoire2 = 0;
var lancementJeu2 = false;
//Lorsqu'on appuie sur F pour relire les instructions avant la fin de celles-ci il y a deux son qui se jouent en meme temps. Cette variable permet de bloquer la lecture du 2e son
var relireInstruction2 = false;
var nbSons;
//Pour augmenter le nb de sons à chaque séquence
var nbSonsSequence = 3;
var ordreSons;
//TOUCHES
var nbTouches;
var ordreTouches;

//savoir si les séquences ont bient été réalisées
var sequence1 = false;
var sequence2 = false;
var sequence3 = false;

var nbErreurs = 0;
var currentTime;

//Pour les phrases écouter et reproduire le son
var sourceConsigne;
var pannerConsigne;


//Création du context audio
//context = new webkitAudioContext();
var Jeu2 = function(){};

var backgroundJ2 = new Image();
backgroundJ2.src = "img/jeu2/bg.svg";

var imgPerso = new Image();
imgPerso.src = "img/jeu2/orioJeu2.svg";

Jeu2.prototype.init = function() {
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	/***
	*
	*	AFFICHAGE  JEU 2
	*
	***/
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(backgroundJ2, 0, 0);
	ctx.drawImage(imgPerso, 337, 445);



	//SONS
	nbSons = 0;
	ordreSons = [];
	//TOUCHES
	nbTouches = 0;
	ordreTouches = [];
	//Fichiers sons
	var fileList2 = [
		"sons/jeu2/g2.wav", 
		"sons/jeu2/g1.wav",
		"sons/jeu2/centre.wav",
		"sons/jeu2/d1.wav",
		"sons/jeu2/d2.wav",
		"sons/jeu2/succes.wav",
		"sons/jeu2/percute.wav",
		"sons/jeu2/ambiance.mp3",
		"sons/commun/recommencer.mp3",
		"sons/jeu2/alasuite.wav",
		"sons/commun/succes.mp3",
		"sons/jeu2/ecouter.mp3",
		"sons/jeu2/reproduire.mp3"

	];

	/******

		1ER SON

	******/
	//Random entre 0 et 50
	var rand = Math.floor((Math.random() * 50));
	//Random entre 0 et 5
	rand = Math.floor(rand / 10);
	console.log(rand);
	//Ajoute le numéro du son au tableau pour la vérification
	ordreSons.push(rand);
	//Incrémente nbSons
	nbSons++;

	/*******
	
		SONS & ROUTING

	*******/
	//Création source & panner & listener
	source = context.createBufferSource();
	//On ne lance le son de fond qu'une fois sinon il ne s'arrete pas
	/*if(!sourceFond){
		console.log("source fond");
		sourceFond = context.createBufferSource();
		sourceFond.connect(panner);
		//Chargement du son du fond
		setAudioSource(sourceFond, 7, fileList2);
		sourceFond.loop = true;
		sourceFond.start();
	}*/

	panner = context.createPanner();
	gain = context.createGain();
	gain.gain.value = 10;

	listener = context.listener;
	//Position panner
	panner.setPosition(0, 10, 0);
	//Position listener
	listener.setPosition(0, 0, 0);

	//Routing
	source.connect(panner);
	panner.connect(gain);
	gain.connect(context.destination);

	
	sourceConsigne = context.createBufferSource();
	pannerConsigne = context.createPanner();
	pannerConsigne.setPosition(0, 10, 0);

	sourceConsigne.connect(pannerConsigne);
	pannerConsigne.connect(gain);
	gain.connect(context.destination)

	setAudioSource(sourceConsigne, 11, fileList2);
	sourceConsigne.start(context.currentTime + 2);

	//Après la consigne on lance le son du mur
	sourceConsigne.onended = function(){
		//Chargement du premier son du mur
		setAudioSource2(source, rand, fileList2);
		currentTime = context.currentTime;
		//Lancement du son
		source.start(currentTime + 2);
		//Lorsque le son est fini on joue le suivant
		source.onended = function() {
			//Joue le son suivant
			relanceSon();
		}
	}
	
	


	//Evt clavier
	//window.addEventListener("keydown", keyboardJeu2, false );

	function relanceSon(){
		//CHANGER
		if(nbSons == nbSonsSequence){
			sourceConsigne = context.createBufferSource();
			sourceConsigne.connect(pannerConsigne);
			setAudioSource(sourceConsigne, 12, fileList2);
			sourceConsigne.start();
			sourceConsigne.onended = function(){
				window.addEventListener("keydown", keyboardJeu2, false);	
			}
		}else{
			console.log("Nbsons "+nbSons);
			//Random entre 0 et 50
			var rand = Math.floor((Math.random() * 50));
			//Random entre 0 et 5
			rand = Math.floor(rand / 10);
			//On ajoute l'index du son au tab
			ordreSons.push(rand);
			console.log(ordreSons);

			/*****
				SONS
			*****/
			//On créé un new audio buffer source car on ne peut lancer start qu'une fois
			source = context.createBufferSource();
			//On reconnecte la source au panner
			source.connect(panner);

			//Choisi le son à jouer
			setAudioSource2(source, rand, fileList2);
			//On recupere l'heure courante
			var currentTime = context.currentTime;
			//On laisse un délai d'0.2sec avant de jouer le son
		 	source.start(currentTime + 0.2);
			//Incrément nbSons pour limiter le jeu ne nb sons
			nbSons++;
			if(nbSons < 6){
				source.onended = function(){
					relanceSon();
				}
			}
		}
		
	}

/***
*
*	FIN JEU
*
***/

	function finJeuWin() {
		//On vide le canvas
		// ctx.clearRect(0, 0, canvas.width, canvas.height);
		//Message visuel Victoire
		ctx.font = "bold 15px Arial";
		ctx.textAlign = 'center';
		ctx.fillStyle = "rgba(255,255,255,0.8)";
 		ctx.fillRect ((canvas.width/2 - 207), (canvas.height/4 - 100), 414, 147);
 		ctx.fillStyle = "rgba(24,109,148,1)";
	 	ctx.fillText("Félicitation vous avez brisé le mur !", canvas.width/2, (canvas.height/4 - 25));

	 	victoire2 = 1;
	 	// console.log(sourceFond);
	 	sourceFond.loop = false;
	 	sourceFond.stop();
	 	sourceFond = null;
	 	// console.log(sourceFond);
	 	//On retire l'event listener pour arreter les déplacements du joueur
	 	window.removeEventListener("keydown", keyboardJeu2);
	 	//On réinitialise la position du lsitener et du panner
	 	listener.setPosition(0,0,0);
	 	panner.setPosition(0,2,0);
	 	//Lancement de la 2e partie de narration
	 	var sourceSucces = context.createBufferSource();
	 	var pannerSucces = context.createPanner();
	 	sourceSucces.connect(pannerSucces);
	 	pannerSucces.connect(context.destination);
	 	setAudioSource(sourceSucces, 10, fileList2);
	 	sourceSucces.start();

	 	sourceSucces.onended = function(){
	 		//Lancement de la 3e partie de narration
		 	var narration = new Narration();
		 	narration.init();
		 	narration.part3();
	 	}
	}

	function finJeuLose(){
		//On vide le canvas
		// ctx.clearRect(0, 0, canvas.width, canvas.height);
		//Message visuel perdu
		ctx.font = "bold 15px Arial";
		ctx.textAlign = 'center';
		ctx.fillStyle = "rgba(255,255,255,0.65)";
 		ctx.fillRect ((canvas.width/2 - 207), (canvas.height/2 - 100), 414, 147);
	 	ctx.fillStyle = "rgba(24,109,148,1)";
	 	ctx.fillText("Vous avez perdu !", canvas.width/2, (canvas.height/2 - 40));
	 	ctx.fillText("Appuyez sur espace pour relancer le jeu!", canvas.width/2, (canvas.height/2 ));

	 	lancementJeu2 = false;
	 	// sourceFond.stop();
	 	// sourceFond = null;

	 	/*console.log("ordres touches length: " + ordreTouches.length);
	 	//Vider le tableau ordresTouches, sinon les touches continuent à s'ajouter et le tableau est trop long
	 	for(var i = 0; i <= ordreTouches.length; i++){
	 		console.log("ordres touches: " + ordreTouches);
	 		ordreTouches.pop();
	 		console.log("i: " + i);
	 	}
	 	console.log("ordres touches length: " + ordreTouches.length);
	 	console.log("ordres touches: " + ordreTouches);*/

	 	ordreTouches = null;
	 	window.removeEventListener("keydown", keyboardJeu2);
	 	window.addEventListener("keydown", keyboardRelancerJeu, false);
	 	//On arrete le son si il est en train de jouer
	 	source.stop();
	 	panner.setPosition(0,10,0);
	 	listener.setPosition(0,0,0);
	 	//Création de la source
		sonRecommencer = context.createBufferSource();

		//Routing
		sonRecommencer.connect(panner);
		panner.connect(context.destination);

		sonRecommencer.loop = true;
		setAudioSource(sonRecommencer, 8, fileList2);
		sonRecommencer.start();

		victoire2 = 0;
		//On reinitialise des var
		sequence1 = false;
		sequence2 = false;
		sequence3 = false;

		nbErreurs = 0;
		nbSonsSequence = 3; 
	}

/*******

	VERIF SEQUENCE

*******/
	function verifSequence() {
		var verification;
		// console.log("verif sequence");
		console.log("ordre sons: " + ordreSons);
		console.log("ordre touches: " + ordreTouches);
		if(ordreSons.length != ordreTouches.length){
			console.log("Pas meme longeur");
			return false;
		}
		//Verification de chaque son
		for (var i = 0; i<ordreSons.length; i++){
			//console.log(ordreSons[i]+" = "+ordreTouches[i]);
			if(ordreSons[i] == ordreTouches[i]){
				verification = true;
			}
			else{
				verification = false;
				console.log("Séquence non valide");
				//On incrémente le nombre d'erreurs
				nbErreurs++;
				console.log(nbErreurs);
				
				//Si le nb d'erreurs < 3 on relance une sequence de son
				if(nbErreurs < 3){
					source = context.createBufferSource();
					source.connect(panner);
					setAudioSource2(source, 6, fileList2);
					gain.gain.value = 5;
					source.start();
					source.onended = function(){
						//On relance un séquence de sons
						jeu = new Jeu2();
						jeu.init();
					}
				}
				//Sinon le nombre d'erreur = 3 alors le joueur doit recommencer completement le jeu
				else{
						source = context.createBufferSource();
						source.connect(panner);
						setAudioSource2(source, 6, fileList2);
						gain.gain.value = 5;
						source.start();
						source.onended = function(){
							finJeuLose();
						}
				}
				return;	
			}
		}
		//Si la séquence est valide
		if(verification == true){
			
			//Si la séquence est reussie on joue le son de succes
			gain.gain.value = 20;
			source = context.createBufferSource();
			source.connect(panner);
			panner.connect(gain);
			gain.connect(context.destination)
			setAudioSource2(source, 5, fileList2);
			source.start();
			source.onended = function(){
				//Si aucune séquence n'a été validée
				if(sequence1 == false && sequence2 == false && sequence3 == false){
					nbSonsSequence++;
					//Séquence 1 validée
					console.log("Séquence 1 valide"); 
					sequence1 = true;
					console.log(sequence1);
					console.log(sequence2);
					console.log(sequence3);

					// sourceConsigne = context.createPanner();
					// sourceConsigne.connect(pannerConsigne);
					// setAudioSource(sourceConsigne, 11, fileList2);
					// sourceConsigne.start();
					// sourceConsigne.onended = function() {
					// 	// body...
					// }
					//On relance un séquence de sons
					var jeu = new Jeu2();
					jeu.init();
				}
				//Si la séquence 1 a déjà été validé
				else if (sequence1 == true && sequence2 == false && sequence3 == false){
					nbSonsSequence++;
					//Séquence 1 validée
					console.log("Séquence 2 valide"); 
					sequence2 = true;
					console.log(sequence1);
					console.log(sequence2);
					console.log(sequence3);
					//On relance un séquence de sons
					jeu = new Jeu2();
					jeu.init();
				}
				//Si la séquence 2 a déjà été validée
				else if (sequence1 == true && sequence2 == true && sequence3 == false){
					//Séquence 1 validée
					console.log("Séquence 3 valide"); 
					sequence3 = true;
					console.log(sequence1);
					console.log(sequence2);
					console.log(sequence3);
					//Les 3 séquences sont validées le jeu est terminé
					finJeuWin();
				}
			}
		}
	}
/*******

	KEYBOARD

*******/
	function keyboardJeu2(event){
		touche = String.fromCharCode(event.keyCode);
		console.log(touche);
		// nbTouches++;
			switch(touche){
				case "S":
					//On retire le listener evt clavier pour que le joueur n'appuie pas sur une autre touche pendant que le son est en train d'etre jouer
					window.removeEventListener("keydown", keyboardJeu2);
					ordreTouches.push(0);
					//Création buffer source
					source = context.createBufferSource();
					//Connect la source au panner
					source.connect(panner);
					//On choisit le son à jouer
					setAudioSource2(source, 0, fileList2);
					//On lance le son
					source.start();
					//lorsque le son est fini on remet le listener d'evt
					source.onended = function(){
						window.addEventListener("keydown", keyboardJeu2, false);	
					}
					//On incrément le nb touche que si c'est une touche du jeu
					nbTouches++;
					break;
				case "D":
					//On retire le listener evt clavier pour que le joueur n'appuie pas sur une autre touche pendant que le son est en train d'etre jouer
					window.removeEventListener("keydown", keyboardJeu2);
					ordreTouches.push(1);
					//Création buffer source
					source = context.createBufferSource();
					//Connect la source au panner
					source.connect(panner);
					//On choisit le son à jouer
					setAudioSource2(source, 1, fileList2);
					//On lance le son
					source.start();
					//lorsque le son est fini on remet le listener d'evt
					source.onended = function(){
						window.addEventListener("keydown", keyboardJeu2, false);	
					}
					//On incrément le nb touche que si c'est une touche du jeu
					nbTouches++;
					break;
				case "F":
					//On retire le listener evt clavier pour que le joueur n'appuie pas sur une autre touche pendant que le son est en train d'etre jouer
					window.removeEventListener("keydown", keyboardJeu2);
					ordreTouches.push(2);
					//Création buffer source
					source = context.createBufferSource();
					//Connect la source au panner
					source.connect(panner);
					//On choisit le son à jouer
					setAudioSource2(source, 2, fileList2);
					//On lance le son
					source.start();
					//lorsque le son est fini on remet le listener d'evt
					source.onended = function(){
						window.addEventListener("keydown", keyboardJeu2, false);	
					}
					//On incrément le nb touche que si c'est une touche du jeu
					nbTouches++;
					break;
				case "G":
					//On retire le listener evt clavier pour que le joueur n'appuie pas sur une autre touche pendant que le son est en train d'etre jouer
					window.removeEventListener("keydown", keyboardJeu2);
					ordreTouches.push(3);
					//Création buffer source
					source = context.createBufferSource();
					//Connect la source au panner
					source.connect(panner);
					//On choisit le son à jouer
					setAudioSource2(source, 3, fileList2);
					//On lance le son
					source.start();
					//lorsque le son est fini on remet le listener d'evt
					source.onended = function(){
						window.addEventListener("keydown", keyboardJeu2, false);	
					}
					//On incrément le nb touche que si c'est une touche du jeu
					nbTouches++;
					break;
				case "H":
					//On retire le listener evt clavier pour que le joueur n'appuie pas sur une autre touche pendant que le son est en train d'etre jouer
					window.removeEventListener("keydown", keyboardJeu2);
					ordreTouches.push(4);
					//Création buffer source
					source = context.createBufferSource();
					//Connect la source au panner
					source.connect(panner);
					//On choisit le son à jouer
					setAudioSource2(source, 4,fileList2);
					//On lance le son
					source.start();
					//lorsque le son est fini on remet le listener d'evt
					source.onended = function(){
						window.addEventListener("keydown", keyboardJeu2, false);	
					}
					//On incrément le nb touche que si c'est une touche du jeu
					nbTouches++;
					break;
					case "A":
						finJeuWin();
					default:
						return;
				}
			console.log(ordreTouches);

		//Si l'utilisateur a dejà appuyé sur 5 touches on verifie la séquence
		//CHANGER
		if(nbTouches >= nbSonsSequence){
			source.onended = function() {
				verifSequence();
				window.removeEventListener("keydown", keyboardJeu2);
			}
			
		}
	}

	function keyboardRelancerJeu(event){
		touche = String.fromCharCode(event.keyCode);
		console.log(touche);
		switch(touche){
			//relancer le jeu ou passer à la suite
			case " ":
				if(victoire2 == 0){
					//On arrete le fond sonore
					// sourceFond.stop();
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					//Arrete le son "recommencer le jeu"
					sonRecommencer.loop = false;
					sonRecommencer.stop();
					//console.log(jeu);
					window.removeEventListener("keydown", keyboardRelancerJeu);
					var jeu = new Jeu2();
					jeu.init();
				}else{
					console.log("jeux suivant");
				}
				default:
					return;
			}
	}

};

var bgInstruction2 = new Image();
bgInstruction2.src = "img/jeu2/jeu2_instructions.svg";
Jeu2.prototype.instructions = function() {
	/***
	*
	*	AFFICHAGE INSTRUCTIONS JEU 2
	*
	***/
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(bgInstruction2, 0, 0);

	/***
	*
	*	SONS INSTRUCTIONS JEU 1
	*
	***/
	sonsJeu2Instructions = [
	"sons/instructions/jeu2.mp3",
	"sons/instructions/jeu22j.mp3",
	"sons/instructions/fin_instructions.mp3",
	"sons/jeu2/ambiance.mp3"
	];
	//Source Fond
	sourceFond = context.createBufferSource();
	pannerFond = context.createPanner();

	var gainFond = context.createGain();
	gainFond.gain.value = 10;

	pannerFond.setPosition(0, 10, 0);

	sourceFond.connect(pannerFond);
	pannerFond.connect(gainFond);
	gainFond.connect(context.destination);
	//Musique de fond
	setAudioSource(sourceFond, 3, sonsJeu2Instructions);
	sourceFond.loop = true;
	sourceFond.start();
	
	pannerInstructions = context.createPanner();
	gainInstructions = context.createGain();
	gainInstructions.gain.value = 9;
	pannerInstructions.connect(gainInstructions);
	gainInstructions.connect(context.destination);


	lireInstructions();
	function lireInstructions(){
		//Création de la source
		sourceInstructions = context.createBufferSource();
		
		//Routing
		sourceInstructions.connect(pannerInstructions);
		pannerInstructions.setPosition(0, 15, 0);

		sourceInstructions.loop = false;
		setAudioSource(sourceInstructions, 0, sonsJeu2Instructions);
		//On donne les instructions selon le mode de jeu
		if(mode == 0){
			sourceInstructions.start();
			// console.log("relire instruction " + relireInstruction1);
			sourceInstructions.onended = function(){
				if(!lancementJeu2){
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
					setAudioSource(sourceInstructions, 2, sonsJeu2Instructions);
					sourceInstructions.start();
					// console.log("FIN JEU INSTRUCTIONS");
				}
			}
		}else{
			sourceInstructions.start();
			sourceInstructions.onended = function(){
				if(!lancementJeu2){
					//Création de la sourceInstructions
					sourceInstructions = context.createBufferSource();
					pannerInstructions = context.createPanner();
					pannerInstructions.setPosition(0, 15, 0);
					//Routing
					sourceInstructions.connect(pannerInstructions);
					pannerInstructions.connect(gainInstructions);
					gainInstructions.connect(context.destination);
					sourceInstructions.loop = false;
					setAudioSource(sourceInstructions, 1, sonsJeu2Instructions);
					sourceInstructions.start();
					// console.log("INSTRUCTIONS 2J");
					sourceInstructions.onended = function(){
						if(!lancementJeu2){
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
							setAudioSource(sourceInstructions, 2, sonsJeu2Instructions);
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
	window.addEventListener("keydown", keyboardInstruction2, false);

	//this.init();
	function keyboardInstruction2(event){
		//Transforme keyCode en String correspondant
		touche = String.fromCharCode(event.keyCode);
		console.log(touche);

		switch(touche){
			case " ":
				console.log("Lancer Jeu");
				//Pour que la fin des instructions ne se lance pas si le jeu est déjà lancé
				//On retire l'event listener
				window.removeEventListener("keydown", keyboardInstruction2);
				//On arrete de looper le son
				sourceInstructions.loop = false;
				//On coupe le son
				sourceInstructions.stop();
				//Pour que la fin des instructions ne se lance pas si le jeu est déjà lancé
				lancementJeu2 = true;
				//On affiche lance le jeu
				var jeu2 = new Jeu2();
				jeu2.init();
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
