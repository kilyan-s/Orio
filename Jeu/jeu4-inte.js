var Jeu4 = function(){};

//reverb pour éléments d'ambiance
// pour la reverb
var convolverGlobal;
// pour la reverb
var convolverGlobal;
// pour la reverb early
var convolverEarly;
// spatialisation de la voix
var panner;
//Spatialisation
var pannerEarly
// spatialisation neon
var pannerneon;
var pannerfrigo;
var pannereau;
var pannertelephone;
var pannerchat;
// Source pour la voix
var source;
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

	// Initialize audio
	context = new webkitAudioContext();

	// Initialisation de la personne qui écoute
	listener = context.listener;
	listener.setPosition(listenerx, listenery, listenerz);

	// Initialisation des sources
	source = context.createBufferSource();
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
	panner = context.createPanner();
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
	source.connect(panner);
	// Connect dry mix, connect un son sans passer par la reverb
	panner.connect(dryGainNodeGlobal);
	dryGainNodeGlobal.connect(context.destination);
	// Connect dry mix, connect un son sans passer par la reverb
	panner.connect(dryGainNodeEarly);
	dryGainNodeEarly.connect(context.destination);
	// Connect wet mix, connecte un son en passant par la reverb
	panner.connect(convolverGlobal);
	convolverGlobal.connect(wetGainNodeGlobal);
	wetGainNodeGlobal.connect(context.destination);
	// Connect wet mix, connecte un son en passant par la reverb
	panner.connect(convolverEarly);
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
	source.playbackRate.value = 1.0;
	// positionnement de la source je suppose
	panner.setPosition(x, y, z);
	// Load up initial sound
	setAudioSource(source, 0, fileList4);
	var currentTime = context.currentTime;
	source.start(currentTime + 0.020);

	source.onended = function() {
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
	 	source = context.createBufferSource();
	 	// On conncete au circuit
		 source.connect(panner);

		
		//Code pour déterminer quel son lancer
		
		// Si le listener est devant la source
		if (listenery-y > -10 && listenery-y < -5 ){
			setAudioSource(source, 6, fileList4);
		}
		
		// Si le listener est devant la source très proche
		if (listenery-y > -5 && listenery-y < -1 ){
			setAudioSource(source, 7, fileList4);
		}
		
		// Si le listener est derriere la source très proche
		if (listenery-y > 1 && listenery-y < 5 ){
			setAudioSource(source, 5, fileList4);
		}
		
		// Si le listener est derriere la source 
			if (listenery-y > 5 && listenery-y < 10 ){
			setAudioSource(source, 4, fileList4);
		}
		
		// Si le listener est sur la source 
			if (trouve==true){
			setAudioSource(source,9, fileList4);
		}
		
		else{
		
			// on pioche un nombre aléatoire enter 0 et 3
			var nb = Math.floor(Math.random() * (3));
			setAudioSource(source, nb, fileList4);
		}
		
		// On récupère le temps courant et on lance le son avec 2sec de retard pour espacer les différents sons
	 	var currentTime = context.currentTime;
	 	source.start(currentTime + 1.5);
	 	//Si le joueur a trouvé on attend la fin du dernier son pour finir le jeu
	 	if(trouve == true){
	 		source.onended = function(){
	 			finJeuWin();
	 		}
	 	}
		
		// Si le joueur n'a pas trouvé la source, on relance un son
		if (trouve==false){
			source.onended = function() {
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
			     	listenerx = x
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
		window.removeEventListener("keydown", keyboardJeu4);

		source.stop();
		sourceeau.stop();
		sourcefrigo.stop();
		sourcetelephone.stop();
		sourceneon.stop();
		sourcechat.stop();

		var narration = new Narration();
		narration.part5();
	}
	
};

Jeu4.prototype.instructions = function() {
	console.log("instructions jeu 4");
	sonsJeu4Instructions = [
	"sons/instructions/jeu4.mp3",
	"sons/instructions/jeu3.mp3"
	];

	//Création de la source
	source = context.createBufferSource();

	//Routing
	source.connect(panner);
	panner.connect(context.destination);

	source.loop = true;
	//On donne les instructions selon le mode de jeu
	if(mode == 0 ){
		setAudioSource(source, 0, sonsJeu4Instructions);
	}else{
		setAudioSource(source, 1, sonsJeu4Instructions);
	}
	
	source.start();

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillText("Instructions jeu 4", canvas.width/2, canvas.height/2);

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
				source.loop = false;
				//On coupe le son
				source.stop();
				//On affiche lance le jeu
				var jeu4 = new Jeu4();
				jeu4.init();
				break;
			case "F":
				console.log("Relire instructions");
				source.stop();
				//Création de la source
				source = context.createBufferSource();

				//Routing
				source.connect(panner);
				panner.connect(context.destination);

				source.loop = true;
				//On donne les instructions selon le mode de jeu
				if(mode == 0 ){
					setAudioSource(source, 0, sonsJeu4Instructions);
				}else{
					setAudioSource(source, 1, sonsJeu4Instructions);
				}
				source.start();
				break;
			default:
				return;
		}
	}

};