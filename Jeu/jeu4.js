var lancementJeu4 = false;
var Jeu4 = function(){};

//reverb pour éléments d'ambiance
// pour la reverb
var convolverGlobal;
// pour la reverb
var convolverGlobal;
// pour la reverb early
var convolverEarly;
// spatialisation de la voix
var panner4;
//Spatialisation
var pannerEarly
// spatialisation neon
var pannerneon;
var pannerfrigo;
var pannereau;
var pannertelephone;
var pannerchat;
// Source pour la voix
var source4;
var sourceeau;
var sourcefrigo;
var sourcetelephone;
var sourceneon;
var sourcechat;
// Gain reverb pour global
var dryGainNodeGlobal;
var wetGainNodeGlobal;
// Gain reverb pour reflection
var dryGainNodeEarly;
var wetGainNodeEarly;
var listener;
var lowFilter;

// Les coordonnées du listener
var listenerx = 0;
var listenery = 0;
var listenerz = 0;

// les coordonnées du panner, de la voix, elles sont aléatoires
var x = Math.floor(Math.random() * (100) - 50);
var y = Math.floor(Math.random() * (100) - 50);
var z = -4;

// Code pour faire apparaitre plus ou moins la reverb
var cL =listenery+listenerx;
var cS = y+x 
var distance = Math.abs(cL-cS);

// Boolean pour savoir si le joueur a trouvé l'objet
var trouve = false;

// le numéro du son qui vient d'être joué
var numSon = 0;

var hilightedElement = 0;
var bufferList;

var fileCount = 14;
var fileList4 = [
    "sons/jeu4/hugo/gen1.wav",
    "sons/jeu4/hugo/gen2.wav",
    "sons/jeu4/hugo/gen3.wav",
    "sons/jeu4/hugo/gen4.wav",
    "sons/jeu4/hugo/derriereloin.wav",
    "sons/jeu4/hugo/derriereproche.wav",
    "sons/jeu4/hugo/devantloin.wav",
    "sons/jeu4/hugo/devantproche.wav",
    "sons/jeu4/hugo/toutproche.wav",
    "sons/jeu4/hugo/trouve.wav",
    "sons/jeu4/ambiance/eau.wav",
    "sons/jeu4/ambiance/frigo.wav",
    "sons/jeu4/ambiance/neon.wav",
    "sons/jeu4/ambiance/telephone.wav",
    "sons/jeu4/ambiance/chat.wav",
    "sons/narration/part5.mp3",
    "sons/narration/part5.mp3"
];



var kInitialReverbLevel = 0.6;


Jeu4.prototype.init = function() {
	var listener = context.listener;
	// fonctions qui permettent de faire déplacer le listener, à refaire mieux ;)
	function gauche() {
		listenerx -= 1;
		listener.setPosition(listenerx, listenery, listenerz);
	}

	function droite() {
		listenerx += 1;
		listener.setPosition(listenerx, listenery, listenerz);
	}

	function arriere() {
		listenery -= 1;
		listener.setPosition(listenerx, listenery, listenerz);
	}

	function avant() {
		listenery += 1;
		listener.setPosition(listenerx, listenery, listenerz);
	}
	/**
	*
		SONS FOND
	*
	**/
	sourceFond = context.createBufferSource();
	pannerFond = context.createPanner();

	var gainFond = context.createGain();
	gainFond.gain.value = 1;

	pannerFond.setPosition(0, 10, 0);

	sourceFond.connect(pannerFond);
	pannerFond.connect(gainFond);
	gainFond.connect(context.destination);
	//Musique de fond
	setAudioSource(sourceFond, 16, fileList4);
	sourceFond.loop = true;
	sourceFond.start();

	// Initialize audio
	// context = new webkitAudioContext();

	// // Initialisation de la personne qui écoute
	// listener = context.listener;
	// listener.setPosition(listenerx, listenery, listenerz);

	// Initialisation des sources
	source4 = context.createBufferSource();
	sourceeau = context.createBufferSource();
	sourcefrigo = context.createBufferSource();
	sourcetelephone = context.createBufferSource();
	sourceneon = context.createBufferSource();
	sourcechat = context.createBufferSource();

	// Sert pour la reverb, pour déverser un son dans un canal sans reverb et dans un autre canal avec reverb, permet de doser le niveau de reverb
	dryGainNodeGlobal = context.createGain();
	wetGainNodeGlobal = context.createGain();
	dryGainNodeEarly = context.createGain();
	wetGainNodeEarly = context.createGain();

	// permet la spatialisation des sources
	panner4 = context.createPanner();
	pannerEarly = context.createPanner();
	pannereau = context.createPanner();
	pannerchat = context.createPanner();
	pannerfrigo = context.createPanner();
	pannerneon = context.createPanner();
	pannertelephone = context.createPanner();
	  
	// On ne l'utilise pas mais je le laisse, car sinon çà créé la merde lors des connexions des différents éléments audio
	lowFilter = context.createBiquadFilter();
	lowFilter.type = "highpass"; 
	lowFilter.frequency.value = 500.0;
	lowFilter.Q.value = 5.0;


	// sert à créer une reverb à convolution
	convolverGlobal = context.createConvolver();
	convolverEarly = context.createConvolver();

	 
	// Connexion des sons de la personne
	// Connect audio processing graph
	source4.connect(panner4);
	// Connect dry mix, connect un son sans passer par la reverb
	panner4.connect(dryGainNodeGlobal);
	dryGainNodeGlobal.connect(context.destination);
	// Connect dry mix, connect un son sans passer par la reverb
	panner4.connect(dryGainNodeEarly);
	dryGainNodeEarly.connect(context.destination);
	// Connect wet mix, connecte un son en passant par la reverb
	panner4.connect(convolverGlobal);
	convolverGlobal.connect(wetGainNodeGlobal);
	wetGainNodeGlobal.connect(context.destination);
	// Connect wet mix, connecte un son en passant par la reverb
	panner4.connect(convolverEarly);
	convolverEarly.connect(wetGainNodeEarly);
	wetGainNodeEarly.connect(lowFilter);
	lowFilter.connect(context.destination);

	// Code pour faire apparaitre plus ou moins la reverb
	cL =listenery+listenerx;
	cS = y+x 
	distance = Math.abs(cL-cS);	
	var distanceMax = 142;	
	var dist = distance/distanceMax;
	dist = dist * dist;
	dist = dist + 0.05;
	console.log(dist);

	wetGainNodeEarly.gain.value = dist;
	wetGainNodeGlobal.gain.value = dist;
	dryGainNodeEarly.gain.value = 1-dist;
	dryGainNodeGlobal.gain.value = 1-dist;
     
     
     
	// che pas
	source4.playbackRate.value = 1.0;
	// positionnement de la source je suppose
	panner4.setPosition(x, y, z);
	// Load up initial sound
	setAudioSource(source4, 0, fileList4);
	var currentTime = context.currentTime;
	source4.start(currentTime + 0.020);

	source4.onended = function() {
		relanceSon();
	}
  
  window.addEventListener("keydown", keyboardJeu4, false);
     
	lanceSonAmbiance(sourceeau, pannereau, 30, 30, 0, 10);
  lanceSonAmbiance(sourcefrigo, pannerfrigo, 30, 30, -10, 11);
	lanceSonAmbiance(sourcetelephone, pannertelephone, -60, -100, 0, 13);
  lanceSonAmbiance(sourceneon, pannerneon, 0, 20, 200, 12);
  lanceSonAmbiance(sourcechat, pannerchat, -40, 100, 100, 14);
	 




	// On choisit la réponse impulsive pour la reverb, selon cette réponse on aura des reverbs différentes
	setReverbImpulseResponse('sons/jeu4/impulse-responses/global.wav', convolverEarly);
	setReverbImpulseResponse('sons/jeu4/impulse-responses/global.wav', convolverGlobal);
	 

//}
 
	function lanceSonAmbiance(source, panner, x, y, z, son){
		//Je m'occupe du son de l'eau, je créé des connexions pour passer par un autre panner  &&&&&&&&&&&&&& 
		source.connect(panner);
		// Connect dry mix, connect un son sans passer par la reverb
		panner.connect(dryGainNodeGlobal);
		panner.connect(dryGainNodeEarly);
		// Connect wet mix, connecte un son en passant par la reverb
		panner.connect(convolverGlobal);
		panner.connect(convolverEarly);
		// On choisit le niveau de reverb que l'on veut mettre ici
		panner.connect(convolverGlobal);


		// Charger et lancer le son de l'eau
		setAudioSource(source, son, fileList4);
		panner.setPosition(x, y, z);
		source.loop = true;
		source.playbackRate.value = 1.0;
		var currentTime = context.currentTime;
		source.start(currentTime + 0.020);

	}
 
	function relanceSon(){
	 	
	 	// Création d'un nouveau buffer pour la source, c'est obligé car un buffer ne peut etre lancé qu'une fois....
	 	source4 = context.createBufferSource();
	 	// On conncete au circuit
		 source4.connect(panner4);

		
		//Code pour déterminer quel son lancer
		
		// Si le listener est devant la source
		if (listenery-y > -10 && listenery-y < -5 ){
			setAudioSource(source4, 6, fileList4);
		}
		
		// Si le listener est devant la source très proche
		if (listenery-y > -5 && listenery-y < -1 ){
			setAudioSource(source4, 7, fileList4);
		}
		
		// Si le listener est derriere la source très proche
		if (listenery-y > 1 && listenery-y < 5 ){
			setAudioSource(source4, 5, fileList4);
		}
		
		// Si le listener est derriere la source 
			if (listenery-y > 5 && listenery-y < 10 ){
			setAudioSource(source4, 4, fileList4);
		}
		
		// Si le listener est sur la source 
			if (trouve==true){
				//Changer: son final 15
			setAudioSource(source4, 15, fileList4);
		}
		
		else{
		
			// on pioche un nombre aléatoire enter 0 et 3
			var nb = Math.floor(Math.random() * (3));
			setAudioSource(source4, nb, fileList4);
		}
		
		// On récupère le temps courant et on lance le son avec 2sec de retard pour espacer les différents sons
	 	var currentTime = context.currentTime;
	 	source4.start(currentTime + 1.5);
	 	//Si le joueur a trouvé on attend la fin du dernier son pour finir le jeu
	 	if(trouve == true){
	 		source4.onended = function(){
	 			finJeuWin();
	 		}
	 	}
		
		// Si le joueur n'a pas trouvé la source, on relance un son
		if (trouve==false){
			source4.onended = function() {
				 relanceSon();
			}
		}
		
	}
	 
	function keyboardJeu4(event) {
	 	console.log (listenerx);
	 	console.log (listenery);
	 	console.log (x);
	 	console.log (y);
	 	console.log(trouve);
	 	
	 	var touche = String.fromCharCode(event.keyCode);
	 	
	 	if (event.defaultPrevented) {
	    	return; // Should do nothing if the key event was already consumed.
		}
	 
		// Si le joueur n'a pas trouvé le monsieur on le fait bouger, sinon on ne fait rien
		if (trouve == false){
		
			switch (touche) {
			    case "D":
			      gauche();
			      break;
			    case "R":
			      avant();
			      break;
			    case "G":
			      droite();
			      break;
			    case "F":
			      arriere();
			      break;
			     case "A":
			     	listenery = y;
			     	listenerx = x;
						listener.setPosition(listenerx, listenery, listenerz);
			     	break;
			    default:
			      return; // Quit when this doesn't handle the key event.
			}

			// Code pour faire apparaitre plus ou moins la reverb
			cL =listenery+listenerx;
			cS = y+x 
			distance = Math.abs(cL-cS);	
			var distanceMax = 142;	
			var dist = distance/distanceMax;
			dist = dist * dist;
		  dist = dist + 0.05;
		  console.log(dist);
		    
			wetGainNodeEarly.gain.value = dist;
			wetGainNodeGlobal.gain.value = dist;
			dryGainNodeEarly.gain.value = 1-dist;
			dryGainNodeGlobal.gain.value = 1-dist;
			
			// Consume the event for suppressing "double action".
	  event.preventDefault();
		}
		
		 	
	 	// Si le joueur se trouve sur la bonne case on arrete le jeu
	 	if (listenery == y && listenerx == x){
		 	trouve = true;
	 	}
	}

	/*
	*
	*	Fin Jeu
	*
	*/
	function finJeuWin(){
		//Message visuel Victoire
		ctx.font = "bold 15px Arial";
		ctx.textAlign = 'center';
		ctx.fillStyle = "rgba(255,255,255,0.65)";
 		ctx.fillRect ((canvas.width/2 - 207), (canvas.height/2 - 100), 414, 147);
 		ctx.fillStyle = "rgba(24,109,148,1)";
	 	ctx.fillText("Félicitation vous avez trouvé Hugo !", canvas.width/2, (canvas.height/2 - 25));
	 	
		window.removeEventListener("keydown", keyboardJeu4);

		source.stop();
		sourceeau.stop();
		sourcefrigo.stop();
		sourcetelephone.stop();
		sourceneon.stop();
		sourcechat.stop();
		sourceFond.stop();

		var narration = new Narration();
		narration.part5();
	}
	
};

Jeu4.prototype.instructions = function() {
	/***
	*
	*	AFFICHAGE INSTRUCTIONS JEU 4
	*
	***/
	var bgInstruction = new Image();
	bgInstruction.src = "img/jeu4/jeu4_instructions.svg"
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(bgInstruction, 0, 0);

	/***
	*
	*	SONS INSTRUCTIONS JEU 4
	*
	***/
	sonsJeu4Instructions = [
	"sons/instructions/jeu4.mp3",
	"sons/instructions/jeu42j.mp3",
	"sons/instructions/fin_instructions.mp3"
	];

	lireInstructions();
	function lireInstructions(){
		//Création de la source
		sourceInstructions = context.createBufferSource();
		pannerInstructions = context.createPanner();
		gainInstructions = context.createGain();
		gainInstructions.gain.value = 9;
		
		//Routing
		sourceInstructions.connect(pannerInstructions);
		pannerInstructions.connect(gainInstructions);
		gainInstructions.connect(context.destination);
		pannerInstructions.setPosition(0, 15, 0);

		sourceInstructions.loop = false;
		setAudioSource(sourceInstructions, 0, sonsJeu4Instructions);
		//On donne les instructions selon le mode de jeu
		if(mode == 0){
			sourceInstructions.start();
			// console.log("relire instruction " + relireInstruction1);
			sourceInstructions.onended = function(){
				if(!lancementJeu4){
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
					setAudioSource(sourceInstructions, 2, sonsJeu4Instructions);
					sourceInstructions.start();
					// console.log("FIN JEU INSTRUCTIONS");
				}
			}
		}else{
			sourceInstructions.start();
			sourceInstructions.onended = function(){
				if(!lancementJeu4){
					//Création de la sourceInstructions
					sourceInstructions = context.createBufferSource();
					pannerInstructions = context.createPanner();
					pannerInstructions.setPosition(0, 15, 0);
					//Routing
					sourceInstructions.connect(pannerInstructions);
					pannerInstructions.connect(gainInstructions);
					gainInstructions.connect(context.destination);
					sourceInstructions.loop = false;
					setAudioSource(sourceInstructions, 1, sonsJeu4Instructions);
					sourceInstructions.start();
					// console.log("INSTRUCTIONS 2J");
					sourceInstructions.onended = function(){
						if(!lancementJeu4){
							//On lance la phrase de fin d'instruction en boucle
							//Création de la source
							sourceInstructions = context.createBufferSource();
							/*changer*/
							// pannerInstructions = context.createPanner();
							pannerInstructions.setPosition(0, 10, 0);
							//Routing
							sourceInstructions.connect(pannerInstructions);
							pannerInstructions.connect(context.destination);
							sourceInstructions.loop = true;
							setAudioSource(sourceInstructions, 2, sonsJeu4Instructions);
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
	*	KEYBOARD INSTRUCTIONS JEU 4
	*
	***/
	//Evenement clavier
	window.addEventListener("keydown", keyboardInstruction4, false);

	//this.init();
	function keyboardInstruction4(event){
		//Transforme keyCode en String correspondant
		touche = String.fromCharCode(event.keyCode);
		console.log(touche);

		switch(touche){
			case " ":
				console.log("Lancer Jeu 4");
				//On retire l'event listener
				window.removeEventListener("keydown", keyboardInstruction4);
				//On arrete de looper le son
				sourceInstructions.loop = false;
				//On coupe le son
				sourceInstructions.stop();
				lancementJeu4 = true;
				//On affiche lance le jeu
				var jeu4 = new Jeu4();
				jeu4.init();
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