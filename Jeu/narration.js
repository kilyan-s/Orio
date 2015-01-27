var urlListeIntro;
//Choix pierre: 0 = garder; 1 = jeter
var choixpierre; 
var sonFondNarration, pannerFondNarrationn, gainFondNarration;
var source1;
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
	// console.log("intro");

	bufferList = new Array(urlListeIntro.length);
	for (var i = 0; i< urlListeIntro.length; i++){
		bufferList = 0;
	}	
	// setAudioSource2(source1, 0, urlListeIntro);
};

Narration.prototype.part1 = function(){

	var chrono1 = new Chrono();
	chrono1.init(0);
	chrono1.start();
	var tempChargement2 = 7;
	context = null;
	//Initialize audio context
	context = new webkitAudioContext();
	//Création de la source
	source = context.createBufferSource();
	panner = context.createPanner();
	listener = context.listener

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

	/*
	*
	* Animation premiere partie narration
	*	On lance chaque animation en fonction du temps (en secondes) écoulé
	*
	*/
	var time = window.setInterval(anim, 1000);

	var animation = new Animation1();

	function anim(){
		console.log(chrono1.getTimeStamp());
		//1ere animation
		if(chrono1.getTimeStamp() == 1){ 	
			ctx.fillStyle = "rgba(0, 0, 0, 1)";
		 	ctx.fillRect (0, 0, canvas.width, canvas.height);
			// ctx.clearRect(0, 0, canvas.width, canvas.height);
 			ctx.fillStyle = "rgba(255, 255, 255, 1)";
 			ctx.fillText("Chargement !", canvas.width/2, (canvas.height/2 - 25));	
		}
		if(chrono1.getTimeStamp() == tempChargement2){
			animation.part1();
		}
		if(chrono1.getTimeStamp() == tempChargement2 + 8){
			animation.part2();
		}
		if(chrono1.getTimeStamp() == tempChargement2 + 10){
			// console.log("porte");
			animation.porteFerme();
		}
		if(chrono1.getTimeStamp() == tempChargement2 + 14){
			animation.part3();
		}
		if(chrono1.getTimeStamp() == tempChargement2 + 60){
			animation.part4();
		}
		if(chrono1.getTimeStamp() == tempChargement2 + 95){
			animation.part5();
		}
		if(chrono1.getTimeStamp() == tempChargement2 + 107){
			animation.part4();
		}
		if(chrono1.getTimeStamp() == tempChargement2 + 112){
			//Cristal
			animation.part6();
		}
		if(chrono1.getTimeStamp() == tempChargement2 + 130){
			//ilma court
			animation.part7();
		}
		if(chrono1.getTimeStamp() == tempChargement2 + 137){
			//ilma arrive place du village
			animation.part8();
		}
		if(chrono1.getTimeStamp() == tempChargement2 + 158){
			//azahara arrive
			animation.part9();
		}
		if(chrono1.getTimeStamp() == tempChargement2 + 162){//165
			//main
			animation.part10();
		}
		if(chrono1.getTimeStamp() == tempChargement2 + 171){
			//ilma Calin
			animation.part11();
		}
		if(chrono1.getTimeStamp() == tempChargement2 + 176){//179
			//ilma parle
			animation.part12();
		}
		if(chrono1.getTimeStamp() == tempChargement2 + 200){
			//wido parle
			animation.part13();
		}
		if(chrono1.getTimeStamp() == tempChargement2 + 236){
			//rentrent chez azahara
			animation.part14();
		}
		if(chrono1.getTimeStamp() == tempChargement2 + 240){
			//Azahara appelle orio
			animation.maisonVide();
		}
		if(chrono1.getTimeStamp() == tempChargement2 + 251){
			//Orio arrive
			animation.part15();
		}
		if(chrono1.getTimeStamp() == tempChargement2 + 259){
			//Orio et azahara parlent
			animation.part16();
		}
		if(chrono1.getTimeStamp() == tempChargement2 + 321){
			//Orio allongé
			animation.part17();
		}
		if(chrono1.getTimeStamp() == tempChargement2 + 334){
			//azahara endort orio
			animation.part18();
		}
		if(chrono1.getTimeStamp() == tempChargement2 + 342){
			//Orio ferme les yeux
			animation.part19();
		}
		if(chrono1.getTimeStamp() == tempChargement2 + 358){
			// clearInterval(timer);
			// ctx.clearRect(0, 0, canvas.width, canvas.height);
			// ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
 		// 	ctx.fillRect (0, 0, canvas.width, canvas.height);
 			ctx.clearRect(0, 0, canvas.width, canvas.height);
			var background = document.getElementById("bg");
			background.src = "img/jeu1/anime.gif";
			background.style.visibility = "visible";
			animation.fondu();
		}
		if(chrono1.getTimeStamp() == tempChargement2 + 365){
			clearInterval(timer);
			// ctx.clearRect(0, 0, canvas.width, canvas.height);
			// var background = document.getElementById("bg");
			// background.src = "img/jeu1/anime.gif";
			// background.style.visibility = "visible";
		}
		//Fin du son
		if(chrono1.getTimeStamp() == tempChargement2 + 375){
			//animation.part18();
			// console.log("fin son");
			
		}
	}
	
	source.onended = function(){
		animation.fin();
		chrono1.pause();
		clearInterval(time);
		//Lancement du jeu 1
		var jeu1st = new Jeu1();
		jeu1st.instructions();
	}
	//On vide le canvas
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ctx.fillText("Première partie de narration", canvas.width/2, canvas.height/2);
};

Narration.prototype.part2 = function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var background = document.getElementById("bg");
	background.src = "img/jeu1/anime.gif";
	background.style.visibility = "visible";

	var chrono2 = new Chrono();
	chrono2.init(0);
	chrono2.start();
	var tempChargement2 = 2;

	/*
	*
	* Animation premiere partie narration
	*	On lance chaque animation en fonction du temps (en secondes) écoulé
	*
	*/
	var time = window.setInterval(anim, 1000);

	var animation = new Animation2();

	function anim(){
		console.log(chrono2.getTimeStamp());
		//1ere animation
		if(chrono2.getTimeStamp() == tempChargement2 + 9){
			//Retire le background
			var background = document.getElementById("bg");
			background.style.visibility = "hidden";
			//Orio foret
			animation.part1();
		}
		if(chrono2.getTimeStamp() == tempChargement2 + 55){
			//Orio marche
			animation.part2();
			// console.log(bg.positionY);
		}
		if(chrono2.getTimeStamp() == tempChargement2 + 77){
			// console.log("2" + bg.positionY);
			//Orio accelere
			animation.part3();
		}
		if(chrono2.getTimeStamp() == tempChargement2 + 83){
			//Orio cogne mur
			animation.part4();
		}
		if(chrono2.getTimeStamp() == tempChargement2 + 111){
			// animation.fin();
			// chrono2.pause();
			// clearInterval(time);
		}
	}

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
		animation.fin();
		chrono2.pause();
		clearInterval(time);
		var jeu2 = new Jeu2();
		jeu2.instructions();
	}
	//On vide le canvas
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ctx.fillText("2e partie de narration", canvas.width/2, canvas.height/2);
};

Narration.prototype.part3 = function(){
	var chrono3 = new Chrono();
	chrono3.init(0);
	chrono3.start();
	var tempChargement3 = 1;

	/*
	*
	* Animation premiere partie narration
	*	On lance chaque animation en fonction du temps (en secondes) écoulé
	*
	*/
	var time = window.setInterval(anim, 1000);

	var animation = new Animation3();

	function anim(){
		console.log(chrono3.getTimeStamp());
		//1ere animation
		if(chrono3.getTimeStamp() == tempChargement3){
			//Orio foret mur cassé
			animation.part1();
		}
		if(chrono3.getTimeStamp() == tempChargement3 + 10){
			//Orio marche
			animation.part2();
		}
		if(chrono3.getTimeStamp() == tempChargement3 + 24){
			//porte
			animation.part3();
		}
		if(chrono3.getTimeStamp() == tempChargement3 + 30){
			//Orio ouvre porte
			animation.part4();
		}
		if(chrono3.getTimeStamp() == tempChargement3 + 39){
			//Orio prend crochet
			animation.part5();
		}
		if(chrono3.getTimeStamp() == tempChargement3 + 45){
			//Orio essaie crocheter serrure
			animation.part6();
		}
		if(chrono3.getTimeStamp() == tempChargement3 + 54){
			//Orio tete
			animation.part7();
		}
		if(chrono3.getTimeStamp() == tempChargement3 + 64){
			// animation.fin();
			// chrono3.pause();
			// clearInterval(time);
		}
	}
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
		animation.fin();
		chrono3.pause();
		clearInterval(time);
		//Lancement du jeu 3
		var jeu3 = new Jeu3();
		jeu3.instructions();
	}
	//On vide le canvas
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ctx.fillText("3e partie de narration", canvas.width/2, canvas.height/2);
};

Narration.prototype.part4 = function(){
	var animation4 = new Animation4();
	animation4.part1();
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
		animation4.fin();
		var jeu4 = new Jeu4();
		jeu4.instructions();
	}
	//On vide le canvas
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ctx.fillText("4e partie de narration", canvas.width/2, canvas.height/2);
};

var imgpersoImg = new Image();
imgpersoImg.src = "img/jeu1/perso.svg";

Narration.prototype.part5 = function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var background = document.getElementById("bg");
	background.src="img/jeu1/anime.gif";
	background.style.visibility = "visible";


	ctx.drawImage(imgpersoImg, 333, 364);

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
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ctx.fillText("5e partie de narration", canvas.width/2, canvas.height/2);
};

Narration.prototype.part6 = function(){
	var chrono6 = new Chrono();
	chrono6.init(0);
	chrono6.start();
	var tempChargement6 = 1;

	/*
	*
	* Animation premiere partie narration
	*	On lance chaque animation en fonction du temps (en secondes) écoulé
	*
	*/
	var time = window.setInterval(anim, 1000);

	var animation = new Animation4();

	function anim(){
		console.log(chrono6.getTimeStamp());
		//1ere animation
		if(chrono6.getTimeStamp() == tempChargement6){
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			var background = document.getElementById("bg");
			background.style.visibility = "hidden";
			//Plan Azahara
			animation.azahara();
		}
		if(chrono6.getTimeStamp() == tempChargement6 + 7){
			//Plan Orio
			animation.orio();
		}
	}
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
		animation.fin();
		chrono6.pause();
		clearInterval(time);
		// Lancement du choix de la pierre
		var narration = new Narration();
		narration.init();
		narration.choixpierre();
	}
	//On vide le canvas
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ctx.fillText("6e partie de narration", canvas.width/2, canvas.height/2);
};

Narration.prototype.choixpierre = function(){
	//Plan Pierre
	var animation = new Animation4();
	animation.choixPierre();
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
		//plan Orio 
		animation.orio()
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
			animation.fin();
			var narration = new Narration();
			narration.init();
			narration.part7();
		};
	}

	//On vide le canvas
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ctx.fillText("Choix pierre", canvas.width/2, canvas.height/2);
};

Narration.prototype.part7 = function(){
	var chrono7 = new Chrono();
	chrono7.init(0);
	chrono7.start();
	var tempChargement7 = 1;

	/*
	*
	* Animation premiere partie narration
	*	On lance chaque animation en fonction du temps (en secondes) écoulé
	*
	*/
	var time = window.setInterval(anim, 1000);

	var animation = new Animation4();

	function anim(){
		console.log(chrono7.getTimeStamp());
		//1ere animation
		if(chrono7.getTimeStamp() == tempChargement7){
			//Plan Azahara
			animation.azahara();
		}
		if(chrono7.getTimeStamp() == tempChargement7 + 1){
			//Plan Orio
			animation.orio();
		}
		if(chrono7.getTimeStamp() == tempChargement7 + 3){
			//Plan Orio
			animation.azahara();
		}
		if(chrono7.getTimeStamp() == tempChargement7 + 13){
			//Plan Orio
			animation.orio();
		}
	}

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
		animation.fin();
		chrono7.pause();
		clearInterval(time);
		// Lancement du 2e choix de la pierre
		var narration = new Narration();
		narration.init();
		narration.choixpierre2();
	}
	//On vide le canvas
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ctx.fillText("7e partie de narration", canvas.width/2, canvas.height/2);
};

Narration.prototype.choixpierre2 = function(){
	//Plan Pierre
	var animation = new Animation4();
	animation.choixPierre();
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
		//Plan Orio
		animation.orio();
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
				//Si le choix est déjà de garder
				if(choixpierre == 0){
					//Ne rien faire
					setAudioSource2(source, 12, urlListeIntro);
					window.removeEventListener("keydown", keyboardChoixPierre2);
				}
				else{
					//Sinon on garde la pierre
					choixpierre = 0; 
					setAudioSource2(source, 10, urlListeIntro);
					window.removeEventListener("keydown", keyboardChoixPierre2);
				}
				break;
			//Jeter la pierre
			case "J":
				//Si choix est deja de jeter
				if(choixpierre == 1){
					//Ne rien faire
					setAudioSource2(source, 12, urlListeIntro);
					window.removeEventListener("keydown", keyboardChoixPierre2);
				}
				else{
					//Sinon on jette la pierre
					choixpierre = 1; 
					setAudioSource2(source, 11, urlListeIntro);
					window.removeEventListener("keydown", keyboardChoixPierre2);
				}
				break;
			
			default:
				return;
		}
		source.start();
		source.onended = function(){
			animation.fin();
			var narration = new Narration();
			narration.init();
			narration.part8();
		};
	}

	//On vide le canvas
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ctx.fillText("2 Choix pierre", canvas.width/2, canvas.height/2);
};

Narration.prototype.part8 = function(){
	//Plan Azahara
	var animation = new Animation4();
	animation.azahara();
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
		animation.fin();
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
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ctx.fillText("8e partie de narration", canvas.width/2, canvas.height/2);
};

Narration.prototype.finBien = function(){
	//Plan chambre mère près du lit
	var animation = new Animation4();
	animation.mereLit();
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
		animation.fin();
		// Lancement de la fin de la narration
		var narration = new Narration();
		narration.init();
		narration.generique();
		
	}
	//On vide le canvas
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ctx.fillText("Narration fin bien", canvas.width/2, canvas.height/2);
};

Narration.prototype.finMal = function(){
	var chronoFinMal = new Chrono();
	chronoFinMal.init(0);
	chronoFinMal.start();
	var tempChargementFinMal = 1;

	var time = window.setInterval(anim, 1000);

	var animation = new Animation4();

	function anim(){
		console.log(chronoFinMal.getTimeStamp());
		// console.log(animation);
		//1ere animation
		if(chronoFinMal.getTimeStamp() == tempChargementFinMal){
			//Plan mere pres du lit
			animation.mereLitFinMal();
		}
		if(chronoFinMal.getTimeStamp() == tempChargementFinMal + 13){
			//Plan mere de dos ouvre la porte
			animation.porteOuverte();
		}
		if(chronoFinMal.getTimeStamp() == tempChargementFinMal + 15){
			//Plan porte fermée chambre vide
			animation.porteFerme();
		}

	}
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
		animation.fin();
		chronoFinMal.pause();
		clearInterval(time);
		// Lancement de la fin de la narration
		var narration = new Narration();
		narration.init();
		narration.generique();
		
	}
	//On vide le canvas
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ctx.fillText("Narration fin bien", canvas.width/2, canvas.height/2);
};

var generiqueImg = new Image();
generiqueImg.src = "img/generique/generique.svg";

Narration.prototype.generique = function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(generiqueImg, 0, 0);

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