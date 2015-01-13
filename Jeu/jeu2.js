var jeu2 = function(){};


jeu2.prototype.init = function() {
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	//SONS
	var nbSons = 0;
	var ordreSons = [];
	//TOUCHES
	var nbTouches = 0;
	var ordreTouches = [];
	//Fichiers sons
	var fileList2 = [
		"white-noise-long", 
		"position"
	];

	/******

		1ER SON

	******/
	//Random entre 0 et 60
	var rand = Math.floor((Math.random() * 60));
	//Random entre 0 et 6
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
	
	//Evt clavier
	//window.addEventListener("keydown", keyboardJeu2, false );

	function relanceSon(){
		if(nbSons == 5){
			window.addEventListener("keydown", keyboardJeu2, false);
		}else{
			console.log("Nbsons "+nbSons);
			//Random entre 0 et 60
			var rand = Math.floor((Math.random() * 60));
			//Random entre 0 et 6
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
		console.log("Jeu win");
	}

	function finJeuLose(){
		console.log("Jeu lose");
	}

/*******

	VERIF SEQUENCE

*******/
	function verifSequence() {
		var verification;
		// console.log("verif sequence");
		console.log(ordreSons);
		console.log(ordreTouches);
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
				return;	
			}
		}
		if(verification == true){
			console.log("Séquence valide"); 
		} else{
			console.log("Séquance non valide");
		}
	}
/*******

	KEYBOARD

*******/
	function keyboardJeu2(event){
		touche = String.fromCharCode(event.keyCode);
		console.log(touche);
		nbTouches++;
		//Si l'utilisateur a dejà appuyé sur 6 touches on verifie la séquence
		if(nbTouches > 5){
			verifSequence();
			window.removeEventListener("keydown", keyboardJeu2);
		}
		//Sinon on ajoute la touche au tableau ordreTouches
		else{
			switch(touche){
				case "E":
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
					break;
				case "R":
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
					break;
				case "T":
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
					break;
				case "D":
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
					break;
				case "F":
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
					break;
				case "G":
					//On retire le listener evt clavier pour que le joueur n'appuie pas sur une autre touche pendant que le son est en train d'etre jouer
					window.removeEventListener("keydown", keyboardJeu2);
					ordreTouches.push(5);
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
					break;
				default:
					return;
			}
			console.log(ordreTouches);
		}
		
	}

};



