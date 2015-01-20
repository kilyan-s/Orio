var victoire2 = 0;
var nbSons;
var ordreSons;
//TOUCHES
var nbTouches;
var ordreTouches;

var Jeu2 = function(){};


Jeu2.prototype.init = function() {
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	//SONS
	nbSons = 0;
	ordreSons = [];
	//TOUCHES
	nbTouches = 0;
	ordreTouches = [];
	//Fichiers sons
	var fileList2 = [
		"white-noise.wav", 
		"position.wav",
		"",
		"",
		"",
		"sons/commun/recommencer.mp3"
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
	//Création du context audio
	context = new webkitAudioContext();
	//Création source & panner & listener
	source = context.createBufferSource();
	panner = context.createPanner();
	listener = context.listener;
	//Position panner
	panner.setPosition(50, 50, 0);
	//Position listener
	listener.setPosition(50, 10, 0);
	//Routing
	source.connect(panner);
	panner.connect(context.destination);
	//Chargement du son
	setAudioSource(source, 0, fileList2);
	//Lancement du son
	source.start();
	//Lorsque le son est fini on joue le suivant
	source.onended = function() {
		//Joue le son suivant
		relanceSon();
	}
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillText("2e jeu", canvas.width/2, canvas.height/2);

	//Evt clavier
	//window.addEventListener("keydown", keyboardJeu2, false );

	function relanceSon(){
		if(nbSons == 5){
			window.addEventListener("keydown", keyboardJeu2, false);
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
			setAudioSource(source, 0, fileList2);
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

/*******

	FIN JEU

*******/

	function finJeuWin() {
		//On vide le canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.textAlign = 'center';
	 	ctx.fillText("Félicitiation vous avez évité tous les obstacles !", canvas.width/2, canvas.height/2);
	 	console.log("Jeu Win");

	 	victoire2 = 1;
	 	//On retire l'event listener pour arreter les déplacements du joueur
	 	window.removeEventListener("keydown", keyboardJeu2);
	 	//On réinitialise la position du lsitener et du panner
	 	listener.setPosition(0,0,0);
	 	panner.setPosition(0,0,0);
	 	//Lancement de la 2e partie de narration
	 	var narration = new Narration();
	 	narration.init();
	 	narration.part3();
	}

	function finJeuLose(){
		//On vide le canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.textAlign = 'center';
	 	ctx.fillText("Vous avez perdu !", canvas.width/2, canvas.height/2);
	 	ctx.fillText("Appuyez sur espace pour relancer le jeu!", canvas.width/2, canvas.height/3);
	 	console.log("Jeu Lose");

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
	 	panner.setPosition(0,0,0);
	 	listener.setPosition(0,0,0);
	 	//Création de la source
		sonRecommencer = context.createBufferSource();

		//Routing
		sonRecommencer.connect(panner);
		panner.connect(context.destination);

		sonRecommencer.loop = true;
		setAudioSource(sonRecommencer, 5, fileList2);
		sonRecommencer.start();

		victoire2 = 0;
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

		for (var i = 0; i<ordreSons.length; i++){
			//console.log(ordreSons[i]+" = "+ordreTouches[i]);
			if(ordreSons[i] == ordreTouches[i]){
				verification = true;
			}
			else{
				verification = false;
				console.log("Séquence non valide");
				finJeuLose();
				return;	
			}
		}
		if(verification == true){
			console.log("Séquence valide"); 
			finJeuWin();
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
					setAudioSource(source, 0, fileList2);
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
					setAudioSource(source, 0, fileList2);
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
					setAudioSource(source, 0, fileList2);
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
					setAudioSource(source, 0, fileList2);
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
					setAudioSource(source, 0,fileList2);
					//On lance le son
					source.start();
					//lorsque le son est fini on remet le listener d'evt
					source.onended = function(){
						window.addEventListener("keydown", keyboardJeu2, false);	
					}
					//On incrément le nb touche que si c'est une touche du jeu
					nbTouches++;
					break;
					default:
						return;
				}
			console.log(ordreTouches);
		//Si l'utilisateur a dejà appuyé sur 6 touches on verifie la séquence
		if(nbTouches >= 5){
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


Jeu2.prototype.instructions = function() {
	console.log("instructions");
	sonsJeu2Instructions = [
	"sons/instructions/jeu2.mp3",
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
		setAudioSource(source, 0, sonsJeu2Instructions);
	}else{
		setAudioSource(source, 1, sonsJeu2Instructions);
	}
	
	source.start();

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillText("Instructions jeu 2", canvas.width/2, canvas.height/2);

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
				//On retire l'event listener
				window.removeEventListener("keydown", keyboardInstruction2);
				//On arrete de looper le son
				source.loop = false;
				//On coupe le son
				source.stop();
				//On affiche lance le jeu
				var jeu2 = new Jeu2();
				jeu2.init();
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
					setAudioSource(source, 0, sonsJeu2Instructions);
				}else{
					setAudioSource(source, 1, sonsJeu2Instructions);
				}
				source.start();
				break;
			default:
				return;
		}
	}

};
