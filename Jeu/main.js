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
	if (window.hasOwnProperty('AudioContext') && !window.hasOwnProperty('webkitAudioContext')){
		window.webkitAudioContext = AudioContext;
	}
    

	var background = document.getElementById("bg");
	background.style.visibility = "hidden";

	//On démarre le jeu
	var casque1 = new Casque();
	casque1.init();
	//Affichages des instructions pour le choix du modes
	//afficherMode();

};

/*
*
*	CHOIX MODE DE JEU
*
*/
function afficherMode(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font = "bold 16px Arial";
	ctx.textAlign = 'center';
 	ctx.fillText("Choisissez un mode de jeu", canvas.width/2, canvas.height/2);

 	ctx.fillText("F: 1 joueur", canvas.width/3, canvas.height/1.5);
	ctx.fillText("J: 2 joueurs", 2*canvas.width/3, canvas.height/1.5);
	//Fichier modejeu.js
	mode = new ModeJeu;
	mode.init();
	console.log(mode);
}
