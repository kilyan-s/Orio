var canvas, context;
var WIDTH, HEIGHT;
var joueur;

//Intervals
var intervalAnimate;
var intervalObstacle;
//variables pour le sons
var source;
var audioCtx, audioContext;
var panner, listener;
var gainNode;

//Pour savoir quel jeu est lancé
var jeu1, jeu2, jeu3, jeu4 = 0;
/******

	Document chargé

*******/
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
	context = canvas.getContext('2d');
	if(!context)
	{
	    alert("Impossible de récupérer le context du canvas");
	    return;
	}

	WIDTH = canvas.width;
	HEIGHT = canvas.height;
	
	/*

		LISTENER & PANNER POSITION

	*/
	//Création d'un context audio
	audioContext = window.AudioContext || window.webkitAudioContext;
	audioCtx = new AudioContext();

	//Source audio
	panner = audioCtx.createPanner();
	//Listener
	listener = audioCtx.listener;
	//On définit la position du listener au centre de l'écran et z=100 (arbitraire) et on l'affiche à l'écran
	listener.setPosition(WIDTH/2, HEIGHT/2, 100);

	//Chargement des sons
	getData();
	console.log(source);

	/*****

		Création du joueur

	*****/
	joueur = {
		posX: WIDTH/2,
		posY: HEIGHT - 100,
		posZ: 10,
		orientation: 1,
		diametre: 20,
		fillColor: "rgba(0, 0, 200, 0.5)",
  	strokeColor: "rgba(200, 0, 0, 1)",

  		setPosition: function(x, y, z){
  			this.posX += x;  			
  			this.posY += y;
  			this.posZ += z;
  			//Déplacement du listener
  			listener.setPosition(this.posX, this.posY, this.posZ);
  			// console.log(listener);
  			// console.log(this.posX);
  		}
	};


	/******

		Intervals


	*******/
	intervalAnimate = setInterval(animate, 50);
	// intervalObstacle = setInterval(createObstacle, 3000);

	/******

		Animation
	
	*****/
	//Fonction appelée tous les 20ms 
	function animate(){
		//On efface le canvas à chaque fois
		context.clearRect(0, 0, WIDTH, HEIGHT);

	/*Dessin du contour du canvas*/
		context.lineWidth= "2";
		context.strokeStyle = "#000";
		context.strokeRect(0,0,canvas.width,canvas.height);

	/*Dessin du personnage*/
		//dessin d'un cercle
		/*context.beginPath();
		//Couleur de remplissage
		context.fillStyle = joueur.fillColor;
		//Couleur stroke
		context.strokeStyle = joueur.strokeColor;
		//Dessin de la forme
		context.arc(joueur.posX, joueur.posY, joueur.diametre, 0, Math.PI*2);
		//remplissage de la forme
		context.fill();*/

		// jeu1Anim();
		jeu4Anim();
	} //Fin animate
	//On lance le jeu 4
	jeu4 = 1;
	debutJeu4()
};//Fin doc ready


/*****

	KEYBOARD

*****/
var touche;
window.onkeydown = function(event){
	//Transforme keyCode en String correspondant
	touche = String.fromCharCode(event.keyCode);
	console.log(touche);

	//Verification de la touche appuyé et action
	// verifKey1()
	// verifKey2()
	// verifKey3()
	verifKey4()
}

function getData(){
	//on créé un buffer
	source = audioCtx.createBufferSource();
	//On créé la requete XHR
	request = new XMLHttpRequest();
	//On donne le nom du fichier à charger
	request.open('GET', 'white-noise.wav', true);
	//On définit le type de retour de la requere
	request.responseType = 'arraybuffer';

	request.onload = function(){
		//On attribut a audioData la réponse de la requete => arrayBuffer qui contient le son
		var audioData = request.response;
		//On utilise la fonction decodeAudioData 
		audioCtx.decodeAudioData(audioData, function(buffer) {
				myBuffer = buffer;
				source.buffer = myBuffer;
				// Create a gain node.
 				gainNode = audioCtx.createGain();
 				gainNode.gain.value = 4;
				//on connect le panner à la source
				source.connect(panner);
				panner.connect(gainNode);
				//On connecte le panner a la destination du contexte audio cad la sortie audio de l'ordi
				gainNode.connect(audioCtx.destination);
				//On appelle la fonction positionPanner qui modifie la position du panner et son affichage
				source.loop = true;
			},
			function(e){"Error while decoding audio data"+e.err}

		);

	}
	//Envoie de la requete
	request.send();
}