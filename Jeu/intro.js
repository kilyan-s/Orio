var introNarration = function(){

};

introNarration.prototype.init = function(){
	var urlListeIntro = [
		"",
		""
	];
	console.log("intro");

	bufferList = new Array(urlListeIntro.length);
	for (var i = 0; i< urlListeIntro.length; i++){
		bufferList = 0;
	}

	//On vide le canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillText("Première partie de narration", canvas.width/2, canvas.height/2);

	setTimeout(function(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillText("Lancement du premier jeu", canvas.width/2, canvas.height/2);
		ctx.fillText("L'assemblage s'arrête pour l'instant ici", canvas.width/2, 2*canvas.height/3);

		//Lancement du jeu 1
		var jeu = new jeu3();
		jeu.init();

	}, 3000)


	
}
