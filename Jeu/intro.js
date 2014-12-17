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


	//Passer au jeu 1
	var jeu = new jeu1();
	jeu.init();
}