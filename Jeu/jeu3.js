/**


**/
var Jeu3 = function(){};

Jeu3.prototype.init = function() {
	console.log("salut !");
	/*******
		Position du crochet et des goupilles eh Hz
	*******/
	var crochetPos = 30;

	var goupille1 = 86;
	var goupille2 = 132;
	var goupille3 = 175;
	var goupille4 = 220;
	//Déplacement du crochet à chaque touche appuyée 
	var deplacement = 1;
	//Pour savoir quelles goupilles sont levées 
	var goupille1bool = false;
	var goupille2bool = false;
	var goupille3bool = false;
	var goupille4bool = false;

	//Min des frequences des EQ
	var goupille1Min = 76;
	var goupille2Min = 122;
	var goupille3Min = 153;
	var goupille4Min = 200;

	//Max des frequences des EQ
	var goupille1Max = 96;
	var goupille2Max = 142;
	var goupille3Max = 198;
	var goupille4Max = 250;

	var fileList3 = [
		"sons/jeu3/son.wav"
	];

	//
	var revInput = null;

	// Création des variables des filtres pour pouvoir les utiliser dans plusieurs fonctions, le numéro correspond à la fréquence qui est masquée/affichée
	var filtre86 = null;
	var filtre132 = null;
	var filtre175 = null;
	var filtre220 = null;
	var filtrelow = null;

	/*
		Il faut re-créer le context à chaque fois sinon il n'est pas visible dans les autres fichiers
	*/
	context = new webkitAudioContext;
	source = context.createBufferSource();
	panner = context.createPanner();
	listener = context.listener;

	panner.setPosition(50,50,0);
	listener.setPosition(50,10,0);

	/*source.connect(panner);
	panner.connect(context.destination);*/

	/**

		Création des filtres

	**/
	// Créé le filtre
  filtre86 = context.createBiquadFilter();
  // Choisir le type du filtre, ici c'est peaking, ce type de filtre permet de sélectionner une fréquence bien spécifique 
	filtre86.type = "peaking";
	// On choisit la frequence du filtre
	filtre86.frequency.value = 76;
	// On choisit "l'étendue" du filtre, si ce chiffre est grand on va bien cibler la fréquence, si celui-ci est bas on vas sélectionner plus de fréquence aux alentours
	filtre86.Q.value = 20;
	// Permet de monter le gain ou non de cette fréquence --> va de -40 à 40
	filtre86.gain.value = 10;

	filtre132 = context.createBiquadFilter();
	filtre132.type = "peaking";
	filtre132.frequency.value = 122;
	filtre132.Q.value = 20;
	filtre132.gain.value = 0;
             
	filtre175 = context.createBiquadFilter();
	filtre175.type = "peaking";
	filtre175.frequency.value = 153;
	filtre175.Q.value = 20;
	filtre175.gain.value = 0; 
	
	filtre220 = context.createBiquadFilter();
	filtre220.type = "peaking";
	filtre220.frequency.value = 200;
	filtre220.Q.value = 20;
	filtre220.gain.value = 0;  
	
	filtrelow = context.createBiquadFilter();
	filtrelow.type = "lowpass";
	filtrelow.frequency.value = 100;
	filtrelow.Q.value = 1;
	filtrelow.gain.value = -60; 

	//Choisit la source
	setAudioSource(source, 0, fileList3);
	source.loop = true;

	var gainNode = context.createGain();
  gainNode.gain = 0.9;
  // Connexion des deux filtres au buffer
  source.connect(filtrelow);
  filtrelow.connect(filtre220);
  filtre220.connect(filtre175);
  filtre175.connect(filtre132);
  filtre132.connect(filtre86);
	filtre86.connect(gainNode);
  gainNode.connect(context.destination);
      
	source.start(0);
	window.addEventListener("keydown", keyboardJeu3, false);

	/*var interval = window.setInterval(animation, 150);
	//Animation lancé toutes les 300ms
	function animation() {
		//console.log("animation");
		
	}*/
/*******

	Test goupille
	Teste la position du crochet par rapport à la goupille

*******/
	function testGoupille() {
		if (filtre86.frequency.value >= (goupille1 - 1) && filtre86.frequency.value <= (goupille1 + 1)){
			console.log("Goupille 1");
			goupille1bool = true; 
			//On passe au 2e EQ
			//On passe le gain de l'EQ 86Hz à 0
			filtre86.gain.value = 0;
			//On change la frequence du filtre lowpass
			filtrelow.frequency.value = 150;
			//On passe le gain de l'EQ 132Hz à 11
			filtre132.gain.value = 11;

		}
		if (filtre132.frequency.value >= (goupille2 - 1) && filtre132.frequency.value <= (goupille2 + 1)){
			console.log("Goupille 2");
			goupille2bool = true;
			//On passe à l'EQ 3
			filtre132.gain.value = 0;
			filtrelow.frequency.value = 200;
			filtre175.gain.value = 8;
		}
		if(filtre175.frequency.value >= (goupille3 - 2) && filtre175.frequency.value <= (goupille3 + 3)){
			console.log("Goupille 3");
			goupille3bool = true;
			//On passe a l'EQ 4
			filtre175.gain.value = 0;
			filtrelow.frequency.value = 260;
			filtre220.gain.value = 8;
		}
		if(filtre220.frequency.value >= (goupille4 - 1) && filtre220.frequency.value <= (goupille4 + 4)){
			console.log("Goupille 4");
			goupille4bool = true;
		}

		//Si toutes les goupilles ont été levées
		if(goupille1bool == true && goupille2bool == true && goupille3bool == true && goupille4bool == true ){
			finJeuWin();
		}

		console.log("goupille1: " + goupille1bool);
		console.log("goupille2: " + goupille2bool);
		console.log("goupille3: " + goupille3bool);
		console.log("goupille4: " + goupille4bool);
	}

/*******

	FIN JEU

*******/
function finJeuWin(){
	console.log("Gagné");
	source.stop();
}
/*******

	KEYBOARD

*******/
	function keyboardJeu3(event) {
		touche = String.fromCharCode(event.keyCode);
		// console.log(touche);

		switch(touche){
			//Avancer
			case "J":
				if(goupille1bool == false && goupille2bool == false && goupille3bool == false && goupille4bool == false){
					// Deplacer EQ1
					console.log("Deplacer EQ1");
					//ON increment la fréquence du filtre
					filtre86.frequency.value += 1;
					console.log(filtre86.frequency.value);
					//Le max de la frequence du filtre est 96Hz
					if (filtre86.frequency.value >= 96){
						filtre86.frequency.value = 96; 
						console.log("Vous ne pouvez plus avancer");
					}
				}
				else if(goupille1bool == true && goupille2bool == false && goupille3bool == false && goupille4bool == false){
					//Deplacer EQ2
					console.log("Deplacer EQ2");
					filtre132.frequency.value += 1;
					console.log(filtre132.frequency.value);
					if (filtre132.frequency.value >= 142){
						filtre132.frequency.value = 142; 
						console.log("Vous ne pouvez plus avancer");
					}
				}
				else if (goupille1bool == true && goupille2bool == true && goupille3bool == false && goupille4bool == false){
					//Deplacer EQ3
					console.log("Deplacer EQ3");
					filtre175.frequency.value += 1;
					console.log(filtre175.frequency.value);
					if (filtre175.frequency.value >= 198){
						filtre175.frequency.value = 198; 
						console.log("Vous ne pouvez plus avancer");
					}
				}
				else if (goupille1bool == true && goupille2bool == true && goupille3bool == true && goupille4bool == false){
					// Deplacer EQ4
					console.log("Deplacer EQ4"); 
					filtre220.frequency.value += 1;
					console.log(filtre220.frequency.value);
					if (filtre220.frequency.value >= 250){
						filtre220.frequency.value = 250; 
						console.log("Vous ne pouvez plus avancer");
					}
				}
				// crochetPos += deplacement;
				// console.log(crochetPos);
				break;
			//Reculer
			case "F":
				if(goupille1bool == false && goupille2bool == false && goupille3bool == false && goupille4bool == false){
					// Deplacer EQ1
					console.log("Deplacer EQ1");
					filtre86.frequency.value -= 1;
					console.log(filtre86.frequency.value);
					if (filtre86.frequency.value <= 76){
						filtre86.frequency.value = 76; 
						console.log("Vous ne pouvez plus reculer");
					}
				}
				else if(goupille1bool == true && goupille2bool == false && goupille3bool == false && goupille4bool == false){
					//Deplacer EQ2
					console.log("Deplacer EQ2");
					filtre132.frequency.value -= 1;
					console.log(filtre132.frequency.value);
					if (filtre132.frequency.value <= 122){
						filtre132.frequency.value = 122; 
						console.log("Vous ne pouvez plus reculer");
					}
				}
				else if (goupille1bool == true && goupille2bool == true && goupille3bool == false && goupille4bool == false){
					//Deplacer EQ3
					console.log("Deplacer EQ3");
					filtre175.frequency.value -= 1;
					console.log(filtre175.frequency.value);
					if (filtre175.frequency.value <= 153){
						filtre175.frequency.value = 153; 
						console.log("Vous ne pouvez plus reculer");
					}
				}
				else if (goupille1bool == true && goupille2bool == true && goupille3bool == true && goupille4bool == false){
					// Deplacer EQ4
					console.log("Deplacer EQ4");
					filtre220.frequency.value -= 1;
					console.log(filtre220.frequency.value);
					if (filtre220.frequency.value <= 200){
						filtre220.frequency.value = 200; 
						console.log("Vous ne pouvez plus reculer");
					}
				}
				// crochetPos -= deplacement;
				// console.log(crochetPos);
				break;
			//Lever
			case " ":
				console.log("soulever");
				testGoupille();
				break;

			default:
				return;
		}
	}
};