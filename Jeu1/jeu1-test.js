/*
	120						Obstacle






	20						Joueur

	28							50								72		


*/
// Temporary patch until all browsers support unprefixed context.
if (window.hasOwnProperty('AudioContext') && !window.hasOwnProperty('webkitAudioContext'))
    window.webkitAudioContext = AudioContext;

// init() once the page has finished loading.
window.onload = init;

var context;
var buffer;

var panner;

var source;

var gain;


/******

	Draw

*******/

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


/*
	REVERB
*/
// Gain reverb pour global
var dryGainNodeGlobal;
var wetGainNodeGlobal;
// Gain reverb pour reflection
var dryGainNodeEarly;
var wetGainNodeEarly;
var lowFilter;

// pour la reverb
var convolverGlobal;
// pour la reverb early
var convolverEarly;

// Code pour faire apparaitre plus ou moins la reverb
var cL;
var cS;
var distance;
var dist;

/*
	LISTENER
*/
var listener;
//Position du listener
var listenerx = 50;
var listenery = 20;
var listenerz = 0;

/*
	OBSTACLE
*/
//position de l'obstacle
var obstaclex = 50;
var obstacley = 120;
var obstaclez = 0;
var nbObstacles = 0;

var depX = 0;
var depY = 5;
var depZ = 0;

var tabDeplacement = [[-1,5],[0,5],[1,5]];

//Si collision
var collision = false;

var urlSon = "white-noise.wav";

var bufferList;
//Délai entre chaque obstacle
var delai = 1.5;
var fileList = [
	"white-noise-long"
];
//Interval pour l'animation
var interval;
var score1;
//Touche appuyée
var touche;
//compteur pour les vies lors de la collision
var i =0;
/******

	On définit les zones de collision

*******/
zoneGauche = {
	x: 28,
	y: listenery,
	taille: 20 
};
zoneMilieu = {
	x: 50,
	y: listenery,
	taille: 20 
};
zoneDroite = {
	x: 72,
	y: listenery,
	taille: 20
};


var perso = {
	x: 333,
	y:364,
	dep: 277,
	url: "img/perso.svg"
}

/////// Perso
var imgperso = new Image();
imgperso.src = perso.url;

var vie = 3;
var coeur = new Image();
coeur.src = "img/vie.svg"

// Permet de changer le type de reverb
function setReverbImpulseResponse(url, convolver) {
    // Load impulse response asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = function() { 
        context.decodeAudioData(
            request.response,
            function(buffer) {
                convolver.buffer = buffer;
            },

            function(buffer) {
                // console.log("Error decoding impulse response!");
            }
        );
    }

    request.send();
}

// Permet de changer le son de la source
function setAudioSource(chooseSource, i) {
    var buffer = bufferList[i];

    // See if we have cached buffer
    if (buffer) {
        chooseSource.buffer = buffer;
    } else {
        // Load asynchronously
        var url = fileList[i]+".wav";

        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";

        request.onload = function() { 
            context.decodeAudioData(
                request.response,
                function(buffer) {
                    mixToMono(buffer);
                    chooseSource.buffer = buffer;
                    bufferList[i] = buffer;  // cache it
                },

                function(buffer) {
                    // console.log("Error decoding audio source data!");
                }
            );
        }

        request.send();
    }
}

// Permet de convertir les sons qui sont en stéréo en mono, en effet, la spatialisation ne marche bien qu'avec des sons en mono
function mixToMono(buffer) {
    if (buffer.numberOfChannels == 2) {
        var pL = buffer.getChannelData(0);
        var pR = buffer.getChannelData(1);
        var length = buffer.length;
        
        for (var i = 0; i < length; ++i) {
            var mono = 0.5 * (pL[i] + pR[i]);
            pL[i] = mono;
            pR[i] = mono;
        }
    }
}

function setSourceBuffer(buffer) {
    source.buffer = buffer;
}


/*
*	Start panning
*
*/

function init(){

	bufferList = new Array(fileList.length);
	for (var i = 0; i< fileList.length; i++){
		bufferList = 0;
	}

	//Initialize audio context
	context = new webkitAudioContext();

	//Création du listener
	listener = context.listener;
	listener.setPosition(listenerx, listenery, listenerz);

	//Création de la source
	source = context.createBufferSource();

	//Création du panner
	panner = context.createPanner();

	//Reverb
	dryGainNodeGlobal = context.createGain();
	wetGainNodeGlobal = context.createGain();
	dryGainNodeEarly = context.createGain();
	wetGainNodeEarly = context.createGain();

	// On ne l'utilise pas mais je le laisse, car sinon çà créé la merde lors des connexions des différents éléments audio
	lowFilter = context.createBiquadFilter();
	lowFilter.type = "highpass"; 
	lowFilter.frequency.value = 500.0;
	lowFilter.Q.value = 5.0;

	// sert à créer une reverb à convolution
	convolverGlobal = context.createConvolver();
	convolverEarly = context.createConvolver();


	//Création du gain
	gain = context.createGain();
	gain.gain.value = 8;

	/*
	*
	*	ROUTING
	*
	*/
	//Connecte la source au panner
	source.connect(panner);
	//panner.connect(gain);
	//Connecte panner aux écouteur
	//gain.connect(context.destination);

	// Connect dry mix, connect un son sans passer par la reverb
	panner.connect(dryGainNodeGlobal);
	dryGainNodeGlobal.connect(context.destination);
	// Connect dry mix, connect un son sans passer par la reverb
	panner.connect(dryGainNodeEarly);
	dryGainNodeEarly.connect(context.destination);

	// Connect wet mix, connecte un son en passant par la reverb
	panner.connect(convolverGlobal);
	convolverGlobal.connect(wetGainNodeGlobal);
	wetGainNodeGlobal.connect(context.destination);

	// Connect wet mix, connecte un son en passant par la reverb
	panner.connect(convolverEarly);
	convolverEarly.connect(wetGainNodeEarly);
	wetGainNodeEarly.connect(lowFilter);
	lowFilter.connect(context.destination);

	//Code pour faire apparaitre plus ou moins de reverb
	cL = listenery + listenerx;
	cS = obstacley + obstaclex;
	distance = Math.abs(cL-cS);

	var distanceMax = 100;
	dist = distance/distanceMax;
	dist = dist * dist;
	//Pour que la reverb ne soit jamais à 0
	dist = dist + 0.05;
	// console.log("Dist: " + dist);

	wetGainNodeEarly.gain.value = dist;
	wetGainNodeGlobal.gain.value = dist;
	dryGainNodeEarly.gain.value = 1-dist;
	dryGainNodeGlobal.gain.value = 1-dist;

	//Positionne le panner en x:50 y:100
	panner.setPosition(obstaclex, obstacley, obstaclez);

	// console.log(panner);
	source.playbackRate.value = 1.0;
	// console.log(source);
	//Chargement du son initial
	setAudioSource(source, 0);
	//Incrément pour le premier obstacle
	//nbObstacles++;

	//Récupération de l'heure courrante
	var currentTime = context.currentTime;
	//On demarre le son avec un délais de 0.5 sec
	source.start();
	//lorsque le son est fini
	source.onended = function(){
		relanceSon();
	};
	// console.log(source);

	ctx.drawImage(imgperso, perso.x, perso.y);

	interval = window.setInterval(animation, 150);
	

} //fin init

function relanceSon(){
	if(nbObstacles >= 10 && vie != 0){
		clearInterval(interval);
		finJeuWin();
		
	}else{
		//On créé un new audio buffer source car on ne peut lancer start qu'une fois
		source = context.createBufferSource();
		//On reconnecte la source au panner
		source.connect(panner);
		//On repositionne le panner à son emplacement de base (50 100 0)
		obstaclex = 50;
		obstacley = 120;
		panner.setPosition(obstaclex, obstacley, 0);

		//On choisi le son à jouer
		setAudioSource(source, 0);

		//On recupere l'heure courante
		var currentTime = context.currentTime;
		//On laisse un délai d'2sec avant de jouer le son
	 	source.start(currentTime + delai);

	 	//On tire un nb aleatoirement pour savoir quel deplacement aura l'obstacle. On choisi un nb entre 0 - 30 qu'on /10 pour avoir 0 || 1 || 3
		var alea = Math.floor((Math.random() * 30));
		alea = Math.floor((alea/10));
		// console.log("alea: "+alea);

		//On affecte les valeurs de déplacement
		depX = tabDeplacement[alea][0];
		depY = tabDeplacement[alea][1];

		//Si il reste des vies on relance le son
	 	if (vie != 0){
	 		source.onended = function(){
	 			relanceSon();
	 		}
	 	}
	 	//initailisation du compteur pour les vies
	 	i = 0;
	 	nbObstacles ++;
	}

 	// console.log(nbObstacles);
 	// console.log(panner);
 	// console.log("relanceSon");
}

function animation(){
	// console.log("x: " + obstaclex + ", y: " + obstacley + ", z: " +obstaclez);
	//On déplace l'obstacle
	panner.setPosition(obstaclex, obstacley, obstaclez);
	obstaclex += depX;
	obstacley -= depY;
	obstaclez += depZ;

	testCollision();
	//Si l'obastacle est à 15 devant ou derniere le listener on le fait se deplacer plus vite pour eviter d'avoir un son trop fort au moment ou il est pile sur le listener
	/*if(obstacley <= listenery+15 && obstacley >= listenery-15 && obstaclex == listenerx){
		console.log("toto");
		obstacley -= (depY*1.5);
	}*/

	//changement de la reverb
	cL = listenery + listenerx;
	cS = obstacley + obstaclex;
	distance = Math.abs(cL-cS);

	distanceMax = 100;
	dist = distance/distanceMax;
	dist = dist * dist;
	//Pour que la reverb ne soit jamais à 0
	dist = dist + 0.05;
	// console.log("Dist: " + dist);

	wetGainNodeEarly.gain.value = dist;
	wetGainNodeGlobal.gain.value = dist;
	dryGainNodeEarly.gain.value = 1-dist;
	dryGainNodeGlobal.gain.value = 1-dist;

	// console.log("wet gain early: " + wetGainNodeEarly.gain.value);
	// console.log("wet gain global: " + wetGainNodeGlobal.gain.value);
	// console.log("dry gain early: " + dryGainNodeEarly.gain.value);
	// console.log("dry gain global: " + dryGainNodeGlobal.gain.value);
	ctx.clearRect(0,0, canvas.width, canvas.height);

	ctx.drawImage(imgperso, perso.x, perso.y);

	// vies
	// gestion des vies
	if (vie == 3) {
		ctx.drawImage(coeur, 580, 30);
		ctx.drawImage(coeur, 640, 30);
		ctx.drawImage(coeur, 700, 30);
	}

	if (vie == 2) {
		ctx.drawImage(coeur, 640, 30);
		ctx.drawImage(coeur, 700, 30);
	}

	if (vie == 1) {
		ctx.drawImage(coeur, 700, 30);
	}

	if (vie == 0) {
		clearInterval(interval);
		finJeuLose();
		// ctx.fillText("Vous avez perdu !", canvas.width/2, canvas.height/2);
	}
}

//Animation
	//requestAnimationFrame(animation);

/******

	Collision
	On définit des zones pour la collision

*******/
function testCollision(){
	//Collision zone gauche
	if(obstaclex <= (zoneGauche.x + zoneGauche.taille) && obstacley <= zoneGauche.y && listenerx <= (zoneGauche.x + zoneGauche.taille) && listenery == zoneGauche.y) {
		// console.log(obstaclex);
		// console.log(obstacley);
		// console.log(listenerx);
		// console.log(listenery);
		// console.log("Collision zone gauche");
		//collision = true;
		//On incrémente le compteur pour tester les collisons afin d'effectuer une seule fois l'update vie
		i++;
		updateVie(i);

		/*if (vie == 0) {
			clearInterval(interval);
			//Ecran fin de jeu
			finJeuLose();
		}*/
	}

	//Collision zone Milieu
	if(obstaclex == (zoneMilieu.x) && obstacley <= zoneMilieu.y && listenerx == (zoneMilieu.x) && listenery <= zoneMilieu.y) {
		// console.log(obstaclex);
		// console.log(obstacley);
		// console.log(listenerx);
		// console.log(listenery);
		// console.log("Collision zone milieu");
		//collision = true;
		//On incrémente le compteur pour tester les collisons afin d'effectuer une seule fois l'update vie
		i++;
		updateVie(i);
		
		/*if (vie == 0) {
			clearInterval(interval);
			//Ecran fin de jeu
			finJeuLose();
		}*/
	}

	//Collision zone droite
	if(obstaclex >= zoneDroite.x  && obstacley <= zoneDroite.y && listenerx >= zoneDroite.x && listenery == zoneDroite.y) {
		// console.log(obstaclex);
		// console.log(obstacley);
		// console.log(listenerx);
		// console.log(listenery);
		console.log("Collision zone droite");
		//collision = true;
		//console.log("zone droite: "+i);
		//On incrémente le compteur pour tester les collisons afin d'effectuer une seule fois l'update vie
		i++;
		updateVie(i);

		/*if (vie == 0) {
			clearInterval(interval);
			//Ecran fin de jeu
			finJeuLose();
		}*/
	}

	
	
}
//Permet de changer la valeur de vie une seule fois
function updateVie(i){
	if (i == 1){
		vie--;
		//A chaque collision on décrémente le nb d'obstacle evité
		nbObstacles--;
	}
}
/******

	Fin du jeu

*******/
function finJeuLose(){
	//Si le joueur touche un obstacle on décrémente le score car l'obastacle touché ne doit pas être compatabilisé
	// nbObstacles--;
	/*ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font = "bold 16px Arial";*/
	ctx.textAlign = 'center';
 	ctx.fillText("Vous avez perdu !", canvas.width/2, canvas.height/2);
 	console.log("Jeu Lose");
 	console.log(nbObstacles);
}

function finJeuWin(){
	/*ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font = "bold 16px Arial";*/
	ctx.textAlign = 'center';
 	ctx.fillText("Félicitiation vous avez évité tous les obstacles !", canvas.width/2, canvas.height/2);
 	//On arrete les intervals
 	console.log("Jeu Win");
}

/*******

	KEYBOARD

*******/
window.onkeydown = function(event){
	//Transforme keyCode en String correspondant
	touche = String.fromCharCode(event.keyCode);
	// console.log(touche);

	verifKey1()
}

function verifKey1(){
	switch(touche){
		case "D":
		//On verifie la position du listener avant de le deplacer
			if(listenerx > 28){
				listenerx -= 22;
				console.log(listenerx);
				listener.setPosition(listenerx, listenery, listenerz);
				perso.x -= perso.dep;
				console.log(perso.x);
			}
			break;
		case "F":
			//On verifie la position du listener avant de le deplacer
			if(listenerx < 72){
				listenerx += 22;
				console.log(listenerx);
				listener.setPosition(listenerx, listenery, listenerz);
				perso.x += perso.dep;
				console.log(perso.x);
			}
			break;
		default:
			return;
	}

}