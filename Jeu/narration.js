var urlListeIntro;
//Choix pierre: 0 = garder; 1 = jeter
var choixpierre; 
var sonFondNarration, pannerFondNarrationn, gainFondNarration;
var Narration = function(){

};

Narration.prototype.init = function(){
	window.addEventListener("keydown", function(event){
		touche = String.fromCharCode(event.keyCode);
		switch(touche){
			case "Q":
				source.stop();
				break;
		}
	}, false)
	urlListeIntro = [
		"sons/narration/part1.mp3",
		"sons/narration/part2.mp3",
		"sons/narration/part3.mp3",
		"sons/narration/part4.mp3",
		"sons/narration/part5.mp3",
		"sons/narration/part6.mp3",
		"sons/narration/part7/1.mp3",
		"sons/narration/part7/1_garder.mp3",
		"sons/narration/part7/1_laisser.mp3",
		"sons/narration/part7/2.mp3",
		"sons/narration/part7/2_garder.mp3",
		"sons/narration/part7/2_laisser.mp3",
		"sons/narration/part7/2_rien.mp3",
		"sons/narration/part7/3.mp3",
		"sons/narration/part8/fin_bien.mp3",
		"sons/narration/part8/fin_mal.mp3",
		"sons/narration/choixpierre.mp3",
		"sons/generique/generique.mp3",
		"sons/narration/part7/fondsonore.mp3"
	];
	console.log("intro");

	bufferList = new Array(urlListeIntro.length);
	for (var i = 0; i< urlListeIntro.length; i++){
		bufferList = 0;
	}	
};

Narration.prototype.part1 = function(){
	//Création de la source
	source = context.createBufferSource();


	//Routing
	source.connect(panner);
	panner.connect(context.destination);
	//Position panner
	panner.setPosition(0, 2, 0);
	//Position listener
	listener.setPosition(0, 0, 0);

	source.loop = false;
	setAudioSource2(source, 0, urlListeIntro);
	source.start();

	source.onended = function(){
		//Lancement du jeu 1
		var jeu1st = new Jeu1();
		jeu1st.instructions();
	}
	//On vide le canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillText("Première partie de narration", canvas.width/2, canvas.height/2);
};

Narration.prototype.part2 = function(){
	//Retire le background
	var background = document.getElementById("bg");
	background.style.visibility = "hidden";
	//Création de la source
	source = context.createBufferSource();
	panner = context.createPanner();
	//Position panner
	panner.setPosition(0, 2, 0);
	//Position listener
	listener.setPosition(0, 0, 0);
	//Routing
	source.connect(panner);
	panner.connect(context.destination);

	source.loop = false;
	setAudioSource2(source, 1, urlListeIntro);
	source.start();

	source.onended = function(){
		//Lancement du jeu 2
		var jeu2 = new Jeu2();
		jeu2.instructions();
	}
	//On vide le canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillText("2e partie de narration", canvas.width/2, canvas.height/2);
};

Narration.prototype.part3 = function(){
	//Création de la source
	source = context.createBufferSource();
	panner = context.createPanner();
	//Routing
	source.connect(panner);
	panner.connect(context.destination);
	//Position panner
	panner.setPosition(0, 2, 0);
	//Position listener
	listener.setPosition(0, 0, 0);

	source.loop = false;
	setAudioSource2(source, 2, urlListeIntro);
	source.start();

	source.onended = function(){
		//Lancement du jeu 3
		var jeu3 = new Jeu3();
		jeu3.instructions();
	}
	//On vide le canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillText("3e partie de narration", canvas.width/2, canvas.height/2);
};

Narration.prototype.part4 = function(){
	//Création de la source
	source = context.createBufferSource();
	panner = context.createPanner();
	//Position panner
	panner.setPosition(0, 2, 0);
	//Position listener
	listener.setPosition(0, 0, 0);
	//Routing
	source.connect(panner);
	panner.connect(context.destination);

	source.loop = false;
	setAudioSource2(source, 3, urlListeIntro);
	source.start();

	source.onended = function(){
		//Lancement du jeu 4
		var jeu4 = new Jeu4();
		jeu4.instructions();
	}
	//On vide le canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillText("4e partie de narration", canvas.width/2, canvas.height/2);
};

Narration.prototype.part5 = function(){
	//Son fond Narration
	sonFondNarration = context.createBufferSource();
	pannerFondNarration = context.createPanner();
	gainFondNarration = context.createGain();
	gainFondNarration.gain.value = 5;

	pannerFondNarration.setPosition(0, 2, 0);

	sonFondNarration.connect(pannerFondNarration);
	pannerFondNarration.connect(gainFondNarration);
	gainFondNarration.connect(context.destination);

	setAudioSource2(sonFondNarration, 18, urlListeIntro);
	sonFondNarration.loop = true;
	sonFondNarration.start();

	// var listener = context.listener;
	//Création de la source
	source  = context.createBufferSource();
	panner = context.createPanner();
	//Position panner
	panner.setPosition(0, 2, 0);
	//Position listener
	listener.setPosition(0, 0, 0);
	//Routing
	source.connect(panner);
	panner.connect(context.destination);
	source.loop = false;
	setAudioSource2(source, 5, urlListeIntro);
	source.start();

	source.onended = function(){
		// Lancement de la narration part 6
		var narration = new Narration();
		narration.init();
		narration.part6();
	}
	//On vide le canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillText("5e partie de narration", canvas.width/2, canvas.height/2);
};

Narration.prototype.part6 = function(){
	//Création de la source
	source  = context.createBufferSource();
	panner = context.createPanner();
	//Position panner
	panner.setPosition(0, 2, 0);
	//Position listener
	listener.setPosition(0, 0, 0);
	//Routing
	source.connect(panner);
	panner.connect(context.destination);
	source.loop = false;
	//Changer 6
	setAudioSource2(source, 6, urlListeIntro);
	source.start();

	source.onended = function(){
		// Lancement du choix de la pierre
		var narration = new Narration();
		narration.init();
		narration.choixpierre();
	}
	//On vide le canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillText("6e partie de narration", canvas.width/2, canvas.height/2);
};

Narration.prototype.choixpierre = function(){
	//Choix pierre: 0 = garder; 1 = jeter
	//Création de la source
	source  = context.createBufferSource();
	panner = context.createPanner();
	//Position panner
	panner.setPosition(0, 2, 0);
	//Position listener
	listener.setPosition(0, 0, 0);
	//Routing
	source.connect(panner);
	panner.connect(context.destination);
	source.loop = false;
	setAudioSource2(source, 16, urlListeIntro);
	source.start();

	source.onended = function(){
		window.addEventListener("keydown", keyboardChoixPierre, false);
	};

	function keyboardChoixPierre(event) {
		touche = String.fromCharCode(event.keyCode);
		// console.log(touche);
		//Création de la source
		source = context.createBufferSource();
		panner = context.createPanner();
		//Position panner
		panner.setPosition(0, 2, 0);
		//Position listener
		listener.setPosition(0, 0, 0);
		//Routing
		source.connect(panner);
		panner.connect(context.destination);
		source.loop = false;
		//Choix de la source
		switch(touche){
			//Garder la pierre
			case "F":
				choixpierre = 0; 
				setAudioSource2(source, 7, urlListeIntro);
				window.removeEventListener("keydown", keyboardChoixPierre);
				break;
			//Jeter la pierre
			case "J":
				choixpierre = 1; 
				setAudioSource2(source, 8, urlListeIntro);
				window.removeEventListener("keydown", keyboardChoixPierre);
				break;
			default:
				return;
		}
		source.start();
		source.onended = function(){
			var narration = new Narration();
			narration.init();
			narration.part7();
		};
	}

	//On vide le canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillText("Choix pierre", canvas.width/2, canvas.height/2);
};

Narration.prototype.part7 = function(){
	//Création de la source
	source  = context.createBufferSource();
	panner = context.createPanner();
	//Position panner
	panner.setPosition(0, 2, 0);
	//Position listener
	listener.setPosition(0, 0, 0);
	//Routing
	source.connect(panner);
	panner.connect(context.destination);
	source.loop = false;
	//Changer 9
	setAudioSource2(source, 9, urlListeIntro);
	source.start();

	source.onended = function(){
		// Lancement du 2e choix de la pierre
		var narration = new Narration();
		narration.init();
		narration.choixpierre2();
	}
	//On vide le canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillText("7e partie de narration", canvas.width/2, canvas.height/2);
};

Narration.prototype.choixpierre2 = function(){
	//Choix pierre: 0 = garder; 1 = jeter
	//Création de la source
	source  = context.createBufferSource();
	panner = context.createPanner();
	//Position panner
	panner.setPosition(0, 2, 0);
	//Position listener
	listener.setPosition(0, 0, 0);
	//Routing
	source.connect(panner);
	panner.connect(context.destination);
	source.loop = false;
	setAudioSource2(source, 16, urlListeIntro);
	source.start();
	console.log("f = garder, j = jeter, espace = ne pas changer de choix");

	source.onended = function(){
		window.addEventListener("keydown", keyboardChoixPierre2, false);
	};

	function keyboardChoixPierre2(event) {
		touche = String.fromCharCode(event.keyCode);
		//Création de la source
		source = context.createBufferSource();
		panner = context.createPanner();
		//Position panner
		panner.setPosition(0, 2, 0);
		//Position listener
		listener.setPosition(0, 0, 0);
		//Routing
		source.connect(panner);
		panner.connect(context.destination);
		source.loop = false;
		//Choix de la source
		switch(touche){
			//Garder la pierre
			case "F":
				choixpierre = 0; 
				setAudioSource2(source, 10, urlListeIntro);
				window.removeEventListener("keydown", keyboardChoixPierre2);
				break;
			//Jeter la pierre
			case "J":
				choixpierre = 1; 
				setAudioSource2(source, 11, urlListeIntro);
				window.removeEventListener("keydown", keyboardChoixPierre2);
				break;
			//Garder le 1er choix
			case " ":
				// choixpierre = 2; 
				setAudioSource2(source, 12, urlListeIntro);
				window.removeEventListener("keydown", keyboardChoixPierre2);
				break;
			default:
				return;
		}
		source.start();
		source.onended = function(){
			var narration = new Narration();
			narration.init();
			narration.part8();
		};
	}

	//On vide le canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillText("2 Choix pierre", canvas.width/2, canvas.height/2);
};

Narration.prototype.part8 = function(){
	//Création de la source
	source  = context.createBufferSource();
	panner = context.createPanner();
	//Position panner
	panner.setPosition(0, 2, 0);
	//Position listener
	listener.setPosition(0, 0, 0);
	//Routing
	source.connect(panner);
	panner.connect(context.destination);
	source.loop = false;
	//Changer 9
	setAudioSource2(source, 13, urlListeIntro);
	source.start();

	source.onended = function(){
		sonFondNarration.loop = false;
		sonFondNarration.stop();
		// Lancement de la fin de la narration
		var narration = new Narration();
		narration.init();
		if(choixpierre == 0){
			narration.finBien();
		}else{
			narration.finMal();
		}
	}
	//On vide le canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillText("8e partie de narration", canvas.width/2, canvas.height/2);
};

Narration.prototype.finBien = function(){
	//Création de la source
	source  = context.createBufferSource();
	panner = context.createPanner();
	//Position panner
	panner.setPosition(0, 2, 0);
	//Position listener
	listener.setPosition(0, 0, 0);
	//Routing
	source.connect(panner);
	panner.connect(context.destination);
	source.loop = false;
	//Changer 9
	setAudioSource2(source, 14, urlListeIntro);
	source.start();

	source.onended = function(){
		// Lancement de la fin de la narration
		var narration = new Narration();
		narration.init();
		narration.generique();
		
	}
	//On vide le canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillText("Narration fin bien", canvas.width/2, canvas.height/2);
};

Narration.prototype.finMal = function(){
	//Création de la source
	source  = context.createBufferSource();
	panner = context.createPanner();
	//Position panner
	panner.setPosition(0, 2, 0);
	//Position listener
	listener.setPosition(0, 0, 0);
	//Routing
	source.connect(panner);
	panner.connect(context.destination);
	source.loop = false;
	//Changer 9
	setAudioSource2(source, 15, urlListeIntro);
	source.start();

	source.onended = function(){
		// Lancement de la fin de la narration
		var narration = new Narration();
		narration.init();
		narration.generique();
		
	}
	//On vide le canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillText("Narration fin bien", canvas.width/2, canvas.height/2);
};

Narration.prototype.generique = function(){
	//Création de la source
	source  = context.createBufferSource();
	panner = context.createPanner();
	//Position panner
	panner.setPosition(0, 2, 0);
	//Position listener
	listener.setPosition(0, 0, 0);
	//Routing
	source.connect(panner);
	panner.connect(context.destination);
	source.loop = false;
	//Changer 9
	setAudioSource2(source, 17, urlListeIntro);
	source.start();

	//On vide le canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillText("Générique", canvas.width/2, canvas.height/2);
};