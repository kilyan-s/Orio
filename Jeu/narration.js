var Narration = function(){

};

Narration.prototype.init = function(){
	var urlListeIntro = [
		"sons/narration/part1.mp3",
		"sons/narration/part2.mp3",
		"sons/narration/part3.mp3",
		"sons/narration/part4.mp3",
		"sons/narration/part5.mp3",
		"sons/narration/part6.mp3",
		"sons/narration/part7.mp3",
		"sons/narration/partchoixpierre.mp3",
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

	//Création de la source
	source = context.createBufferSource();

	//Routing
	source.connect(panner);
	panner.connect(context.destination);

	source.loop = false;
	setAudioSource(source, 0, urlListeIntro);
	source.start();

	source.onended = function(){
		//Lancement du jeu 1
		var jeu = new jeu3();
		jeu.init();
	}
	
	//On vide le canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillText("Première partie de narration", canvas.width/2, canvas.height/2);
	
}
