var ModeJeu = function(){

};
var nuage1Img = new Image();
nuage1Img.src = "img/menu/cloud1.svg";
var nuage1 = {
	positionX : 0,
	positionY : 50,
	vitesse : 0.7
};

var nuage2Img = new Image();
nuage2Img.src = "img/menu/cloud2.svg";
var nuage2 = {
	positionX : 710,
	positionY : 60,
	vitesse : -0.6
};

var nuage3Img = new Image();
nuage3Img.src = "img/menu/cloud3.svg";
var nuage3 = {
	positionX : 400,
	positionY : 140,
	vitesse : 0.8
};

var nuage4Img = new Image();
nuage4Img.src = "img/menu/cloud4.svg";
var nuage4 = {
	positionX : 200,
	positionY : 170,
	vitesse : -0.75
};

var soleilImg = new Image();
var soleil = {
	positionX : 150,
	positionY : 30,
	angle : 360
};
soleilImg.src = "img/menu/sun.svg";

var bandeau = new Image();
bandeau.src = "img/menu/OrioBanner.svg";

var soloImg = new Image();
var solo = "img/menu/1J.svg";
var soloActive = "img/menu/1Jhover.svg";
soloImg.src =  solo;

var coopImg = new Image();
var coop = "img/menu/2J.svg";
var coopActive = "img/menu/2Jhover.svg";
coopImg.src = coop;

var explication = new Image();
var explication1j = "img/menu/instruction1J.svg";
var explication2j = "img/menu/instruction2J.svg";

var bg = new Image();
bg.src = "img/menu/bg.svg";

//Deplacer le objets sur la scene
function deplacer (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= 880) {
			nomObjet.vitesse *= -1;
			// console.log(nomObjet.positionX);
		} 
		else if(nomObjet.positionX <= -200){
			nomObjet.vitesse *= -1;
			// console.log("ok");
		}
	}

ModeJeu.prototype.init = function(){
	/*****
	*
	*
	*	AFFICHAGE
	*
	*
	*****/
	var timer = window.setInterval(animation, 30);
	
	function animation() {
		ctx.clearRect(0,0, canvas.width, canvas.height);

		ctx.drawImage(bg, 0, 0);

		ctx.drawImage(soleilImg, 20, -20);

		ctx.drawImage(nuage1Img, nuage1.positionX, nuage1.positionY);
		ctx.drawImage(nuage2Img, nuage2.positionX, nuage2.positionY);
		ctx.drawImage(nuage3Img, nuage3.positionX, nuage3.positionY);
		ctx.drawImage(nuage4Img, nuage4.positionX, nuage4.positionY);
		ctx.drawImage(bandeau, 192.5,60);
		ctx.drawImage(soloImg, 192.5, 310);
		ctx.drawImage(coopImg, 404.5, 310);
		ctx.drawImage(explication, 192.5, 397);

		// ctx.fillStyle = "rgba(255,255,255,0.65)";
 	// 	ctx.fillRect (192.5, 397, 414, 147);

		//console.log(nuage1.positionX);
		deplacer(nuage1);
		deplacer(nuage2);
		deplacer(nuage3);
		deplacer(nuage4);
		//rotation(soleil);

		// console.log(soleil.positionX);
	}

	// console.log(mode);

	/*****
	*
	*
	*	SONS
	*
	*
	*****/
	var sonsMode = [
	"sons/mode/choixmode.mp3",
	"sons/mode/mode1j.mp3",
	"sons/mode/mode2j.mp3"
	];

	//Création de la source
	source = context.createBufferSource();

	//Création du panner
	//panner = context.createPanner();
	//Routing
	source.connect(panner);
	panner.connect(context.destination);

	source.loop = true;
	setAudioSource(source, 0, sonsMode);
	source.start();

	/*******

		KEYBOARD

	*******/
	window.addEventListener("keydown", keyboardMode, false );

	function keyboardMode(event){
		//Transforme keyCode en String correspondant
		touche = String.fromCharCode(event.keyCode);
		// console.log(touche);

		switch(touche){
			case "F":
				//Mode 1 joueur
				// console.log("1j");
				mode = 0;
				explicationMode(mode);
				//changement de l'affichage, selection d'un mode
				soloImg.src = soloActive;
				coopImg.src = coop;
				break;
			case "J":
				//Mode 2 joueur
				// console.log("2j");
				mode = 1;
				explicationMode(mode);
				//Changement de l'affiche selection d'un mode
				soloImg.src = solo;
				coopImg.src = coopActive;
				break;
			case " ":
				//On arrete le son
				source.stop();
				//On vide le canvas
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				//On affiche le message de validation du mode de jeu
				if(mode == 0){
					ctx.fillText("Vous avez validé le mode 1 joueur", canvas.width/2, canvas.height/2);
				} else if ( mode == 1){
					//On affiche le nouveau message
					ctx.fillText("Vous avez validé le mode 2 joueurs", canvas.width/2, canvas.height/2);
				}
				//On arrete le timer
				window.clearInterval(timer);
				//On retire le listener d'evenement clavier
				window.removeEventListener("keydown", keyboardMode);

				//Fichier Narrattion.js
				//Lancement de la premiere phase de narration
				var narration = new Narration();
				narration.init();
				narration.part1();
				/*var jeu = new Jeu4();
				jeu.instructions();*/
				break;
			default:
				return;
		}
	}

	explicationMode = function(mode){
		if(mode == 0){
			source.stop();
			//Création de la source
			source = context.createBufferSource();

			//Routing
			source.connect(panner);
			panner.connect(context.destination);

			source.loop = true;
			setAudioSource(source, 1, sonsMode);
			source.start();

			// //On vide le canvas
			// ctx.clearRect(0, 0, canvas.width, canvas.height);

			// ctx.drawImage(bgImg, 0, 0);
			//On affiche le nouveau message
			// ctx.fillText("Hello world", 10, 50, 414);
			// ctx.fillText("Vous avez choisis le mode 1 joueur", canvas.width/2, canvas.height/2);
			// ctx.fillText("F: 1 joueur", canvas.width/3, canvas.height/1.5);
			// ctx.fillText("J: 2 joueurs", 1.5*canvas.width/3, canvas.height/1.5);
			// ctx.fillText("Espace: Valider", 2*canvas.width/3, canvas.height/1.5);	
			//Affichage des explications mode 1 j
			explication.src = explication1j;
		}
		else if(mode == 1){
			source.stop();
			//Création de la source
			source = context.createBufferSource();

			//Routing
			source.connect(panner);
			panner.connect(context.destination);

			source.loop = true;
			setAudioSource(source, 2, sonsMode);
			source.start();

			/*//On vide le canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			ctx.drawImage(bgImg, 0, 0);*/
			//On affiche le nouveau message
			/*ctx.fillText("Vous avez choisis le mode 2 joueurs", canvas.width/2, canvas.height/2);
			ctx.fillText("F: 1 joueur", canvas.width/3, canvas.height/1.5);
			ctx.fillText("J: 2 joueurs", 1.5*canvas.width/3, canvas.height/1.5);
			ctx.fillText("Espace: Valider", 2*canvas.width/3, canvas.height/1.5);	*/
			//Affichage des explications mode 2 j
			explication.src = explication2j;
		}
	}
}

