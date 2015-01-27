var sonsJeu1Instructions;
var sonRecommencer;
var lancementJeu1 = false;
//Lorsqu'on appuie sur F pour relire les instructions avant la fin de celles-ci il y a deux son qui se jouent en meme temps. Cette variable permet de bloquer la lecture du 2e son
var relireInstruction1 = false;

var sourceVie, sourceFond, sourceTouche;
var pannerVie, pannerFond, pannerTouche;
var sourceInstructions, pannerInstructions, gainInstructions, gainAutre;

var Jeu1 = function(){};

Jeu1.prototype.init = function() {
	//On utilise x pour eviter que le son derniereVie se joue à chaque frame
	var x = 0;
	context;
	var buffer;

	var panner;

	var source;

	var gain;
	var victoire1;
	/******

		Draw

	*******/

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var background = document.getElementById("bg");
	background.src = "img/jeu1/anime.gif";
	background.style.visibility = "visible";


	/*
		REVERB
	*/
	// Gain reverb pour global
	var dryGainNodeGlobal;
	var wetGainNodeGlobal;
	// Gain reverb pour reflection
	var dryGainNodeEarly;
	var wetGainNodeEarly;
	var lowFilter;

	// pour la reverb
	var convolverGlobal;
	// pour la reverb early
	var convolverEarly;

	// Code pour faire apparaitre plus ou moins la reverb
	var cL;
	var cS;
	var distance;
	var dist;

	/*
		LISTENER
	*/
	var listener;
	//Position du listener
	var listenerx = 50;
	var listenery = 20;
	var listenerz = 0;

	/*
		OBSTACLE
	*/
	//position de l'obstacle
	var obstaclex = 50;
	var obstacley = 120;
	var obstaclez = 0;
	var nbObstacles = 0;

	var depX = 0;
	var depY = 5;
	var depZ = 0;
	var tabDeplacement = [[-1, 5],[0, 5],[1.2, 5]];

	//Si collision
	var collision = false;

	var urlSon = "white-noise.wav";

	var bufferList;
	//Délai entre chaque obstacle
	var delai = 1.5;
	var fileList = [
		"sons/jeu1/obstacle.wav",
		"sons/jeu1/musiqueFond.wav",
		"sons/jeu1/derniereVie.mp3",
		"sons/jeu1/toucheMur.wav",
		"sons/commun/perdu.mp3",
		"sons/commun/recommencer.mp3",
		"sons/commun/succes.mp3"
	];
	//Interval pour l'animation
	var interval;
	var score1;
	//Touche appuyée
	var touche;
	//compteur pour les vies lors de la collision
	var i =0;
	/******

		On définit les zones de collision

	*******/
	zoneGauche = {
		x: 28,
		y: listenery,
		taille: 20 
	};
	zoneMilieu = {
		x: 50,
		y: listenery,
		taille: 15 
	};
	zoneDroite = {
		x: 72,
		y: listenery,
		taille: 20
	};


	var perso = {
		x: 333,
		y:364,
		dep: 277,
		url: "img/jeu1/perso.svg"
	}

	/////// Perso
	var imgperso = new Image();
	imgperso.src = perso.url;

	var vie = 3;
	var coeur = new Image();
	coeur.src = "img/jeu1/vie.svg"

	 /* console.log("listener x: " + listenerx);
	  console.log("listener y: " + listenery);
	  console.log("zone droite x: " + zoneDroite.x);
	  console.log("zone Droite x + taille: " + (zoneDroite.x  + zoneDroite.taille));
	  console.log("obstacle x: " + obstaclex);
	  console.log("obstacle y: " + obstacley);*/
	/*
	*	Start panning
	* init
	*/

	

	// bufferList = new Array(fileList.length);
	// for (var i = 0; i< fileList.length; i++){
	// 	bufferList = 0;
	// }

	//Initialize audio context
	// context = new webkitAudioContext();

	//Création du listener
	listener = context.listener;
	listener.setPosition(listenerx, listenery, listenerz);

	//Création de la source
	source = context.createBufferSource();
	

	//Création du panner
	panner = context.createPanner();

	//Reverb
	dryGainNodeGlobal = context.createGain();
	wetGainNodeGlobal = context.createGain();
	dryGainNodeEarly = context.createGain();
	wetGainNodeEarly = context.createGain();

	// On ne l'utilise pas mais je le laisse, car sinon çà créé la merde lors des connexions des différents éléments audio
	lowFilter = context.createBiquadFilter();
	lowFilter.type = "highpass"; 
	lowFilter.frequency.value = 500.0;
	lowFilter.Q.value = 5.0;

	// sert à créer une reverb à convolution
	convolverGlobal = context.createConvolver();
	convolverEarly = context.createConvolver();


	//Création du gain
	gain = context.createGain();
	gain.gain.value = 4;

	/*
	*
	*	ROUTING
	*
	*/
	//Connecte la source au panner
	source.connect(panner);
	//panner.connect(gain);
	//Connecte panner aux écouteur
	//gain.connect(context.destination);

	// Connect dry mix, connect un son sans passer par la reverb
	panner.connect(dryGainNodeGlobal);
	dryGainNodeGlobal.connect(gain);
	// Connect dry mix, connect un son sans passer par la reverb
	panner.connect(dryGainNodeEarly);
	dryGainNodeEarly.connect(gain);

	// Connect wet mix, connecte un son en passant par la reverb
	panner.connect(convolverGlobal);
	convolverGlobal.connect(wetGainNodeGlobal);
	wetGainNodeGlobal.connect(gain);

	// Connect wet mix, connecte un son en passant par la reverb
	panner.connect(convolverEarly);
	convolverEarly.connect(wetGainNodeEarly);
	wetGainNodeEarly.connect(lowFilter);
	lowFilter.connect(gain);

	gain.connect(context.destination);

	/**

		Routing derniereVie, mur touché et fond

	**/
	pannerVie = context.createPanner();
	// pannerFond = context.createPanner();
	pannerTouche = context.createPanner();
	gainAutre = context.createGain();
	gainAutre.gain.value = 4
	

	pannerVie.setPosition(listenerx, listenery, 0);
	pannerFond.setPosition(listenerx, listenery + 10, 0);
	pannerTouche.setPosition(listenerx, listenery, 0);

	pannerVie.connect(gainAutre);
	// pannerFond.connect(gainAutre);
	pannerTouche.connect(gainAutre);
	gainAutre.connect(context.destination);

	

	//Code pour faire apparaitre plus ou moins de reverb
	cL = listenery + listenerx;
	cS = obstacley + obstaclex;
	distance = Math.abs(cL-cS);

	var distanceMax = 100;
	dist = distance/distanceMax;
	dist = dist * dist;
	//Pour que la reverb ne soit jamais à 0
	dist = dist + 0.05;
	// console.log("Dist: " + dist);

	wetGainNodeEarly.gain.value = dist;
	wetGainNodeGlobal.gain.value = dist;
	dryGainNodeEarly.gain.value = 1-dist;
	dryGainNodeGlobal.gain.value = 1-dist;

	//Positionne le panner en x:50 y:100
	panner.setPosition(obstaclex, obstacley, obstaclez);

	// console.log(panner);
	source.playbackRate.value = 1.0;

	// console.log(source);
	//Chargement du son initial
	setAudioSource(source, 0, fileList);
	//Incrément pour le premier obstacle
	nbObstacles++;

	//Récupération de l'heure courrante
	var currentTime = context.currentTime;
	//On demarre le son avec un délais de 0.5 sec
	source.start();
	//lorsque le son est fini
	source.onended = function(){
		relanceSon();
	};
	// console.log(source);
	ctx.drawImage(imgperso, perso.x, perso.y);

	interval = window.setInterval(animation, 150);

	window.addEventListener("keydown", verifKey1, false);


	//Fin init
		

	function relanceSon(){
		if(nbObstacles >= 5 && vie != 0){
			source.stop();
			clearInterval(interval);
			finJeuWin();
			
		}else{
			//On créé un new audio buffer source car on ne peut lancer start qu'une fois
			source = context.createBufferSource();
			// panner = context.createPanner();
			//On reconnecte la source au panner
			source.connect(panner);
			//On repositionne le panner à son emplacement de base (50 100 0)
			obstaclex = 50;
			obstacley = 120;
			panner.setPosition(obstaclex, obstacley, 0);

			//On choisi le son à jouer
			setAudioSource(source, 0, fileList);

			//On recupere l'heure courante
			var currentTime = context.currentTime;
			//On laisse un délai d'2sec avant de jouer le son
		 	source.start(currentTime + delai);

		 	//On tire un nb aleatoirement pour savoir quel deplacement aura l'obstacle. On choisi un nb entre 0 - 30 qu'on /10 pour avoir 0 || 1 || 3
			var alea = Math.floor((Math.random() * 30));
			alea = Math.floor((alea/10));
			// console.log("alea: "+alea);
			//On affecte les valeurs de déplacement
			depX = tabDeplacement[alea][0];
			depY = tabDeplacement[alea][1];

		 	if (vie != 0){
		 		source.onended = function(){
		 			relanceSon();
		 		}
		 	}
		 	//initailisation du compteur pour les vies
		 	i = 0;
		 	nbObstacles ++;
		 	// vitesseDep ++;
		 	// tabDeplacement = [[-1,vitesseDep],[0,vitesseDep],[1.2,vitesseDep]];
		}

	 	// console.log(nbObstacles);
	 	// console.log(panner);
	 	// console.log("relanceSon");
	}

	function animation(){
		// console.log("x: " + obstaclex + ", y: " + obstacley + ", z: " +obstaclez);
		//On déplace l'obstacle
		panner.setPosition(obstaclex, obstacley, obstaclez);
		obstaclex += depX;
		obstacley -= depY;
		obstaclez += depZ;
		// console.log(vitesseDep);
		// console.log(obstacley);
		testCollision();
		// console.log(obstaclex);
		//Si l'obastacle est à 15 devant ou derniere le listener on le fait se deplacer plus vite pour eviter d'avoir un son trop fort au moment ou il est pile sur le listener
		/*if(obstacley <= listenery+15 && obstacley >= listenery-15 && obstaclex == listenerx){
			console.log("toto");
			obstacley -= (depY*1.5);
		}*/

		//changement de la reverb
		cL = listenery + listenerx;
		cS = obstacley + obstaclex;
		distance = Math.abs(cL-cS);

		distanceMax = 100;
		dist = distance/distanceMax;
		dist = dist * dist;
		//Pour que la reverb ne soit jamais à 0
		dist = dist + 0.05;
		// console.log("Dist: " + dist);

		wetGainNodeEarly.gain.value = dist;
		wetGainNodeGlobal.gain.value = dist;
		dryGainNodeEarly.gain.value = 1-dist;
		dryGainNodeGlobal.gain.value = 1-dist;

		// console.log("wet gain early: " + wetGainNodeEarly.gain.value);
		// console.log("wet gain global: " + wetGainNodeGlobal.gain.value);
		// console.log("dry gain early: " + dryGainNodeEarly.gain.value);
		// console.log("dry gain global: " + dryGainNodeGlobal.gain.value);
		ctx.clearRect(0,0, canvas.width, canvas.height);
		ctx.drawImage(imgperso, perso.x, perso.y);

		// vies
		// gestion des vies
		if (vie == 3) {
			ctx.drawImage(coeur, 580, 30);
			ctx.drawImage(coeur, 640, 30);
			ctx.drawImage(coeur, 700, 30);
		}

		if (vie == 2) {
			ctx.drawImage(coeur, 640, 30);
			ctx.drawImage(coeur, 700, 30);
		}

		if (vie == 1) {
			ctx.drawImage(coeur, 700, 30);
			//On utilise x sinon le son ce joue à chaque frame
			if(x == 0){
				//Son derniere vie
				sourceVie = context.createBufferSource();
				sourceVie.connect(pannerVie);
				pannerVie.setPosition(listenerx ,listenery+10 ,0);
				//On choisi le son à jouer
				setAudioSource(sourceVie, 2, fileList);
			 	sourceVie.start();
			 	x++;
			}
			
		}

		if (vie == 0) {
			clearInterval(interval);
			finJeuLose();
		}
	}

	//Animation
		//requestAnimationFrame(animation);

	/******

		Collision
		On définit des zones pour la collision

	*******/
	function testCollision(){
		//Collision zone gauche
		if(obstaclex >= zoneGauche.x && obstaclex <= (zoneGauche.x + zoneGauche.taille) && obstacley == listenery && obstacley <= (zoneGauche.y + zoneGauche.taille) && listenerx >= zoneGauche.x && listenerx <= (zoneGauche.x + zoneGauche.taille)) {
			// console.log("COLLISION ZONE GAUCHE");
			//On incrémente le compteur pour tester les collisons afin d'effectuer une seule fois l'update vie
			i++;
			updateVie(i);
		}

		//Collision zone Milieu
		if(obstaclex >= zoneMilieu.x && obstaclex <= (zoneMilieu.x + zoneMilieu.taille) && obstacley == listenery && obstacley <= (zoneMilieu.y + zoneMilieu.taille) && listenerx >= zoneMilieu.x && listenerx <= (zoneMilieu.x + zoneMilieu.taille)) {
			//On incrémente le compteur pour tester les collisons afin d'effectuer une seule fois l'update vie
			// console.log("COLLISION ZONE MILIEU");
			i++;
			updateVie(i);
		}

		//Collision zone droite
		if(obstaclex >= zoneDroite.x && obstaclex <= (zoneDroite.x + zoneDroite.taille) && obstacley == listenery && obstacley <= (zoneDroite.y + zoneDroite.taille) && listenerx >= zoneDroite.x && listenerx <= (zoneDroite.x + zoneDroite.taille)) {
			//On incrémente le compteur pour tester les collisons afin d'effectuer une seule fois l'update vie
			// console.log("COLLISION ZONE DROITE");
			i++;
			updateVie(i);
		}

		
		
	}
	//Permet de changer la valeur de vie une seule fois
	function updateVie(i){
		if (i == 1){
			vie--;
			//A chaque collision on décrémente le nb d'obstacle evité
			nbObstacles--;
		}
	}
	/******

		Fin du jeu

	*******/
	function finJeuLose(){
		//Si le joueur touche un obstacle on décrémente le score car l'obastacle touché ne doit pas être compatabilisé
		// nbObstacles--;
		/*ctx.clearRect(0, 0, canvas.width, canvas.height);*/
		//Message visuel perdu
		ctx.font = "bold 15px Arial";
		ctx.textAlign = 'center';
		ctx.fillStyle = "rgba(255,255,255,0.65)";
 		ctx.fillRect ((canvas.width/2 - 207), (canvas.height/2 - 100), 414, 147);
	 	ctx.fillStyle = "rgba(24,109,148,1)";
	 	ctx.fillText("Vous avez perdu !", canvas.width/2, (canvas.height/2 - 40));
	 	ctx.fillText("Appuyez sur espace pour relancer le jeu!", canvas.width/2, (canvas.height/2 ));
	 	// console.log("Jeu Lose");

	 	// console.log(nbObstacles);
	 	//Repositionne le listener et le panner
	 	listenerx = 50;
	 	listenery = 20;
	 	listener.setPosition(listenerx,listenery,0);
	 	//On arrete le son si il est en train de jouer
	 	source.stop();
	 	//Création de la source
		sonRecommencer = context.createBufferSource();
		lancementJeu1 = false;
		var pannerRecommencer = context.createPanner();
		pannerRecommencer.connect(gain);
		//Son "Vous avez perdu"
		sonRecommencer.connect(pannerRecommencer);
		pannerRecommencer.setPosition(listenerx, listenery + 10, 0);

		sonRecommencer.loop = false;
		setAudioSource(sonRecommencer, 4, fileList);
		sonRecommencer.start();
		//Son "appuyer sur espace pour recommencer"
		sonRecommencer.onended = function(){
			//Création de la source
			sonRecommencer = context.createBufferSource();
			sonRecommencer.connect(pannerRecommencer);
			pannerRecommencer.setPosition(listenerx, listenery + 10, 0);
			sonRecommencer.loop = true;
			setAudioSource(sonRecommencer, 5, fileList);
			sonRecommencer.start();
		}
	 	victoire1 = 0;
	}

	function finJeuWin(){
		/*ctx.clearRect(0, 0, canvas.width, canvas.height);*/
		//Message visuel Victoire
		ctx.font = "bold 15px Arial";
		ctx.textAlign = 'center';
		ctx.fillStyle = "rgba(255,255,255,0.65)";
 		ctx.fillRect ((canvas.width/2 - 207), (canvas.height/2 - 100), 414, 147);
 		ctx.fillStyle = "rgba(24,109,148,1)";
	 	ctx.fillText("Félicitation vous avez évité tous les obstacles !", canvas.width/2, (canvas.height/2 - 25));
	 	
	 	// console.log("Jeu Win");
	 	// console.log(sourceFond);
	 	sourceFond.loop = false;
	 	sourceFond.stop();
	 	victoire1 = 1;
	 	//On retire l'event listener pour arreter les déplacements du joueur
		window.removeEventListener("keydown", verifKey1);
	 	//On réinitialise la position du lsitener et du panner
	 	listener.setPosition(0,0,0);
	 	panner.setPosition(0,2,0);
	 	//Lancement de la 2e partie de narration
	 	var sourceSucces = context.createBufferSource();
	 	var pannerSucces = context.createPanner();
	 	sourceSucces.connect(pannerSucces);
	 	pannerSucces.connect(context.destination);
	 	setAudioSource(sourceSucces, 6, fileList);
	 	sourceSucces.start();

	 	sourceSucces.onended = function(){
	 		var narration = new Narration();
		 	narration.init();
		 	narration.part2();
		 /*	var jeu4 = new Jeu4();
		 	jeu4.instructions();*/
	 	}
	 	sourceFond = null;
	}

	/*******

		KEYBOARD

	*******/
	function verifKey1(event){
		// console.log("VERIFKEY1");
		touche = String.fromCharCode(event.keyCode);
		switch(touche){
			case "F":
			//On verifie la position du listener avant de le deplacer
				if(listenerx > 28){
					listenerx -= 22;
					// console.log(listenerx);
					listener.setPosition(listenerx, listenery, listenerz);
					pannerFond.setPosition(listenerx, listenery + 10, listenerz);
					perso.x -= perso.dep;
					// console.log(perso.x);
				}else{
					//Déplacement interdit
					// sourceTouche.stop();
					//Son derniere vie
					sourceTouche = context.createBufferSource();
					sourceTouche.connect(pannerTouche);
					pannerTouche.setPosition(listenerx-10, listenery, 0);
					//On choisi le son à jouer
					setAudioSource(sourceTouche, 3, fileList);
				 	sourceTouche.start();
				}
				break;
			case "J":
				//On verifie la position du listener avant de le deplacer
				if(listenerx < 72){
					listenerx += 22;
					console.log(listenerx);
					listener.setPosition(listenerx, listenery, listenerz);
					pannerFond.setPosition(listenerx, listenery + 10, listenerz);
					perso.x += perso.dep;
					// console.log(perso.x);
				}else{
					//Déplacement interdit
					// sourceTouche.stop();
					//Son derniere vie
					sourceTouche = context.createBufferSource();
					sourceTouche.connect(pannerTouche);
					pannerTouche.setPosition(listenerx+10, listenery, 0);
					//On choisi le son à jouer
					setAudioSource(sourceTouche, 3, fileList);
				 	sourceTouche.start();
				}
				break;
			//relancer le jeu ou passer à la suite
			case " ":
				if(victoire1 == 0){
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					//Arrete le son "recommencer le jeu"
					sonRecommencer.loop = false;
					sonRecommencer.stop();
					// sourceFond.loop = false;
					// sourceFond.stop();

					window.removeEventListener("keydown", verifKey1);
					//console.log(jeu);
					var jeu = new Jeu1();
					jeu.init();
				}else{
					console.log("jeux suivant");
				}
			default:
				return;
		}

	}
};
/***
*
*
*	INSTRUCTIONS JEU 1
*
*
***/
var bgInstruction = new Image();
bgInstruction.src = "img/jeu1/jeu1_instructions.svg";
Jeu1.prototype.instructions = function() {
	/***
	*
	*	AFFICHAGE INSTRUCTIONS JEU 1
	*
	***/
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(bgInstruction, 0, 0);

	/***
	*
	*	SONS INSTRUCTIONS JEU 1
	*
	***/
	// console.log("instructions");
	sonsJeu1Instructions = [
	"sons/instructions/jeu1.mp3",
	"sons/instructions/jeu12j.mp3",
	"sons/instructions/fin_instructions.mp3",
	"sons/jeu1/musiqueFond.wav"
	];

	//Source Fond
	sourceFond = context.createBufferSource();
	pannerFond = context.createPanner();

	var gainFond = context.createGain();
	gainFond.gain.value = -2;

	pannerFond.setPosition(0, 10, 0);

	sourceFond.connect(pannerFond);
	pannerFond.connect(gainFond);
	gainFond.connect(context.destination);
	//Musique de fond
	setAudioSource(sourceFond, 3, sonsJeu1Instructions);
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
		setAudioSource(sourceInstructions, 0, sonsJeu1Instructions);
		//On donne les instructions selon le mode de jeu
		if(mode == 0){
			sourceInstructions.start();
			// console.log("relire instruction " + relireInstruction1);
			sourceInstructions.onended = function(){
				if(!lancementJeu1){
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
					setAudioSource(sourceInstructions, 2, sonsJeu1Instructions);
					sourceInstructions.start();
					// console.log("FIN JEU INSTRUCTIONS");
				}
			}
		}else{
			sourceInstructions.start();
			sourceInstructions.onended = function(){
				if(!lancementJeu1){
					//Création de la sourceInstructions
					sourceInstructions = context.createBufferSource();
					pannerInstructions = context.createPanner();
					pannerInstructions.setPosition(0, 15, 0);
					//Routing
					sourceInstructions.connect(pannerInstructions);
					pannerInstructions.connect(gainInstructions);
					gainInstructions.connect(context.destination);
					sourceInstructions.loop = false;
					setAudioSource(sourceInstructions, 1, sonsJeu1Instructions);
					sourceInstructions.start();
					// console.log("INSTRUCTIONS 2J");
					sourceInstructions.onended = function(){
						if(!lancementJeu1){
							//On lance la phrase de fin d'instruction en boucle
							//Création de la source
							sourceInstructions = context.createBufferSource();
							pannerInstructions.setPosition(0, 10, 0);
							pannerInstructions.connect(gainInstructions);
							gainInstructions.connect(context.destination);
							//Routing
							sourceInstructions.connect(pannerInstructions);
							pannerInstructions.connect(context.destination);
							sourceInstructions.loop = true;
							setAudioSource(sourceInstructions, 2, sonsJeu1Instructions);
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
	*	KEYBOARD INSTRUCTIONS JEU 1
	*
	***/
	//Evenement clavier
	window.addEventListener("keydown", keyboardInstruction1, false);

	//this.init();
	function keyboardInstruction1(event){
		//Transforme keyCode en String correspondant
		touche = String.fromCharCode(event.keyCode);
		console.log(touche);

		switch(touche){
			case " ":
				console.log("Lancer Jeu");
				//On retire l'event listener
				window.removeEventListener("keydown", keyboardInstruction1);
				//On arrete de looper le son
				sourceInstructions.loop = false; 
				//On coupe le son
				sourceInstructions.stop();
				//Pour que la fin des instructions ne se lance pas si le jeu est déjà lancé
				lancementJeu1 = true;

				//On affiche lance le jeu
				var jeu1 = new Jeu1();
				jeu1.init();
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
