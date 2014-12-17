window.onload = function(){
	/*****

		récupération du canvas

	******/
	canvas = document.getElementById('canvas');
	if(!canvas)
	{
	    alert("Impossible de récupérer le canvas");
	    return;
	}
	//Récupération du context 2d
	ctx = canvas.getContext('2d');
	if(!ctx)
	{
	    alert("Impossible de récupérer le context du canvas");
	    return;
	}
	//Affichages des instructions pour le choix du modes
	afficherMode();

};

/*
*
*	CHOIX MODE DE JEU
*
*/
function afficherMode(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font = "bold 16px Arial";
 	ctx.fillText("Choisissez un mode de jeu", canvas.width/2, canvas.height/2);

 	ctx.fillText("D: 1 joueur", canvas.width/3, canvas.height/1.5);
	ctx.fillText("F: 2 joueurs", 2*canvas.width/3, canvas.height/1.5);
	//Fichier modejeu.js
	mode = new ModeJeu;
	mode.init();
	console.log(mode);
}
