var urlListeIntro;
var Narration = function(){

};

Narration.prototype.init = function(){
	urlListeIntro = [
		"sons/narration/part1.mp3",
		"sons/narration/part2.mp3",
		"sons/narration/part3.mp3",
		"sons/narration/part4.mp3",
		"sons/narration/part5.mp3",
		"sons/narration/part6.mp3",
		"sons/narration/part7.mp3",
		"sons/narration/choixpierre.mp3",
		"sons/narration/1_pierre_garder.mp3",
		"sons/narration/1_pierre_jeter.mp3",
		"sons/narration/2_pierre_garder.mp3",
		"sons/narration/2_pierre_jeter.mp3",
		"sons/narration/2_pierre_rien.mp3",
		"sons/narration/fin1.mp3",
		"sons/narration/fin2.mp3",
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

	source.loop = false;
	setAudioSource(source, 10, urlListeIntro);
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
	//Routing
	source.connect(panner);
	panner.connect(context.destination);

	source.loop = false;
	setAudioSource(source, 11, urlListeIntro);
	source.start();

	source.onended = function(){
		//Lancement du jeu 1
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

	source.loop = false;
	setAudioSource(source, 13, urlListeIntro);
	source.start();

	source.onended = function(){
		//Lancement du jeu 1
		var jeu3 = new Jeu3();
		jeu3.instructions();
	}
	//On vide le canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillText("3e partie de narration", canvas.width/2, canvas.height/2);
};

Narration.prototype.part4 = function(){
	listener.setPosition(0,0,0);
	panner.setPosition(0,0,0);
	//Création de la source
	source = context.createBufferSource();
	panner = context.createPanner();
	//Routing
	source.connect(panner);
	panner.connect(context.destination);

	source.loop = false;
	setAudioSource(source, 13, urlListeIntro);
	source.start();

	source.onended = function(){
		//Lancement du jeu 1
		var jeu4 = new Jeu4();
		jeu4.instructions();
	}
	//On vide le canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillText("4e partie de narration", canvas.width/2, canvas.height/2);
};

Narration.prototype.part5 = function(){
	listener.setPosition(0,0,0);
	panner.setPosition(0,0,0);
	//Création de la source
	source  = context.createBufferSource();
	panner = context.createPanner();
	//Routing
	source.connect(panner);
	panner.connect(context.destination);
	source.loop = false;
	setAudioSource(source, 10, urlListeIntro);
	source.start();

	source.onended = function(){
		//Lancement du jeu 1
		//var jeu4 = new Jeu4();
		//jeu4.instructions();
	}
	//On vide le canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillText("5e partie de narration", canvas.width/2, canvas.height/2);
};

Narration.prototype.part6 = function(){

};

Narration.prototype.part7 = function(){

};

Narration.prototype.choixpierre = function(){

};

Narration.prototype.pierreGarder1 = function(){

};

Narration.prototype.pierreJeter1 = function(){

};

Narration.prototype.pierreGarder2 = function(){

};

Narration.prototype.pierreJeter2 = function(){

};

Narration.prototype.pierreRien2 = function(){

};

Narration.prototype.fin1 = function(){

};
Narration.prototype.fin2 = function(){

};