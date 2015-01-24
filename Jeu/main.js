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


