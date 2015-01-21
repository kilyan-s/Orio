var obstacle;
var nbObstacles = 0;
var tabObstacles = new Array;
//Tableau qui contient les 3 valeurs possible de déplacement des obstacles: gauche, milieu, droite
var tabDeplacement = [[-5,10],[0,10],[5,10]];
var score1 = 0;

//Zones de collision
var zoneGauche, zoneMilieu, zoneDroite;
//Interval obstacles
var intervalObstacle = setInterval(createObstacle, 3000);

/******

	On définit les zones de collision

*******/
zoneGauche = {
	x: 50,
	y: 350,
	taille: 100 
};
zoneMilieu = {
	x: 200,
	y: 350,
	taille: 100 
};
zoneDroite = {
	x: 350,
	y: 350,
	taille: 100
};

/*****

	Obstacle

*****/

obstacle = function(depX, depY, depZ) {
	this.posX = WIDTH/2,
	this.posY = 50,
	this.posZ = 400,
	this.cote = 20,
	this.deplacementX  = depX
	this.deplacementY = depY,
	this.deplacementZ = depZ,
	this.fillColor = "rgba(200, 0, 0, 0.5)",
	this.strokeColor = "rgba(200, 0, 0, 1)",

	this.setPosition = function(){
		this.posX += this.deplacementX ;  			
		this.posY += this.deplacementY;
		this.posZ += this.deplacementZ;
		panner.setPosition(this.posX, this.posY, this.posZ);
		// console.log(this.posX);
	}
};
/******

	Jeu 1 anim

******/
function jeu1Anim(){
	// console.log(source);
	//On entre dans le premier jeu
	jeu1 = 1;
	/* Dessin des obstacles */
	for (var i = 0; i<tabObstacles.length; i++){
		context.fillStyle = "#FF0000";
		context.fillRect(tabObstacles[i].posX, tabObstacles[i].posY, tabObstacles[i].cote,	tabObstacles[i].cote);

		/* Changement position Obstacle */
		if(tabObstacles[i].posX >= WIDTH|| tabObstacles[i].posY >= HEIGHT){
			/*tabObstacles[i].posX = WIDTH/2;
			tabObstacles[i].posY = 50;*/
			//On arrete le son
			// source.stop();
			//On retire l'obstacle du tableau si il est sorti de l'écran
			tabObstacles.pop(tabObstacles[i]);
		}else{
			//On fait bouger l'obstacle
			tabObstacles[i].setPosition();
		}

	}
	//Dessin des zones de collisions
	context.strokeStyle = "#000";
	context.strokeRect(zoneGauche.x, zoneGauche.y, zoneGauche.taille, zoneGauche.taille);
	context.strokeRect(zoneMilieu.x, zoneMilieu.y, zoneMilieu.taille, zoneMilieu.taille);
	context.strokeRect(zoneDroite.x, zoneDroite.y, zoneDroite.taille, zoneDroite.taille);

	//On vérifie si il y a une collision
	collision();
	//console.log(nbObstacles);
	//console.log(score1);
}
/******

	Creation des obstacles


*******/
function createObstacle(){
	nbObstacles ++;
	//On limite le jeu a 10 obstacles
	if (nbObstacles > 10 ){
		finJeuWin();
	}else{
		//On tire un nb aleatoirement pou savoir quel deplacement aura l'obstacle
		var alea = Math.floor((Math.random() * 30));
		console.log(alea);
		alea = Math.floor((alea/10));
		console.log(alea);
		//On créé l'obstacle
		// var obstacle1 = new obstacle(tabDeplacement[alea][0], tabDeplacement[alea][1]);
		var obstacle1 = new obstacle(tabDeplacement[alea][0], tabDeplacement[alea][1], 50);
		//On ajoute l'obstacle au tableau de obstacles
		tabObstacles.push(obstacle1);
		console.log(obstacle1);
		console.log(tabObstacles);
		//Début du son
		source.start(0);
		//On incrémente le score
		score1++;
	}
	
}

/******

	Collision
	On définit des zones pour la collision

*******/
function collision(){
	//On vérifie la collision seulement si il y a un obstacle
	if (tabObstacles[0]){
		//Collision zone gauche
		if(tabObstacles[0].posX <= (zoneGauche.x + zoneGauche.taille) && tabObstacles[0].posY >= zoneGauche.y && joueur.posX <= (zoneGauche.x + zoneGauche.taille) && joueur.posY >= zoneGauche.y) {
			console.log("Collision zone gauche");

			clearInterval(intervalAnimate);
			clearInterval(intervalObstacle);

			//Ecran fin de jeu
			finJeuLose();
		}

		//Collision zone Milieu
		if(tabObstacles[0].posX == (zoneMilieu.x + 50) && tabObstacles[0].posY >= zoneMilieu.y && joueur.posX == (zoneMilieu.x + 50) && joueur.posY >= zoneMilieu.y) {
			console.log("Collision zone milieu");

			clearInterval(intervalAnimate);
			clearInterval(intervalObstacle);

			//Ecran fin de jeu
			finJeuLose();
		}

		//Collision zone droite
		if(tabObstacles[0].posX >= zoneDroite.x  && tabObstacles[0].posY >= zoneDroite.y && joueur.posX >= zoneDroite.x && joueur.posY >= zoneDroite.y) {
			console.log("Collision zone droite");

			clearInterval(intervalAnimate);
			clearInterval(intervalObstacle);

			//Ecran fin de jeu
			finJeuLose();
		}
	}
	
}

/******

	Fin du jeu

*******/
function finJeuLose(){
	//Si le joueur touche un obstacle on décrémente le score car l'obastacle touché ne doit pas être compatabilisé
	score1--;
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.font = "bold 16px Arial";
 	context.fillText("Vous avez perdu !", canvas.width/2, canvas.height/2);
 	source.stop();
	//Le jeu 1 est fini
 	jeu1 = 0;
}

function finJeuWin(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.font = "bold 16px Arial";
 	context.fillText("Félicitiation vous avez évité tous les obstacles !", 10, canvas.height/2);
 	//On arrete les intervals
 	clearInterval(intervalAnimate);
	clearInterval(intervalObstacle);
	source.stop();
	//Le jeu 1 est fini
 	jeu1 = 0;
}

/*******

	KEYBOARD

*******/
function verifKey1(){
	switch(touche){
		case "D":
		//On verifie la position du joueur avant de le deplacher
			if(joueur.posX > 100){
				joueur.setPosition(-150, 0, 0);
			}
			break;
		case "F":
			//On verifie la position du joueur avant de le deplacher
			if(joueur.posX < 400){
				joueur.setPosition(150, 0, 0);
			}
			break;
		default:
			return;
	}

}