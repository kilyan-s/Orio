var timer;

var Animation4 = function(){};
//
Animation4.prototype.part1 = function() {
	var nuage1Img = new Image();
	nuage1Img.src = "img/jeu4/cloud1.png";
	var nuage1 = {
		positionX : -500,
		positionY : 0,
		vitesse : 1
	};
	
	var nuage2Img = new Image();
	nuage2Img.src = "img/jeu4/cloud2.png";
	var nuage2 = {
		positionX : -500,
		positionY : 0,
		vitesse : 3
	};

	var nuage3Img = new Image();
	nuage3Img.src = "img/jeu4/cloud3.png";
	var nuage3 = {
		positionX : -500,
		positionY : 0,
		vitesse : 5
	};
	
	var bg = new Image();
	bg.src = "img/jeu4/bg.png";

	function deplacer (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= -10) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= -500){
			nomObjet.vitesse *= -1;
		}
	}
	
	timer = window.setInterval(animation, 30);

	function animation() {
		ctx.clearRect(0,0, canvas.width, canvas.height);

		ctx.drawImage(bg, 0, 0);
		// ctx.fillStyle = "rgba(0,0,0,0.7)";
 	// 	ctx.fillRect (0, 0, canvas.width, canvas.height);
		ctx.drawImage(nuage1Img, nuage1.positionX, nuage1.positionY);
		ctx.drawImage(nuage2Img, nuage2.positionX, nuage2.positionY);
		ctx.drawImage(nuage3Img, nuage3.positionX, nuage3.positionY);

		deplacer(nuage1);
		deplacer(nuage2);
		deplacer(nuage3);
	}
}
//Plan présentation Azahara
Animation4.prototype.azahara = function() {
	clearInterval(timer);
	var azaharaImg = new Image();
	azaharaImg.src = "img/animation/orioConcentre/azaharaGrosPlan.svg";
	var azahara = {
		positionX : -10,
		positionY : 0,
		vitesse : 0.3,
	};

	var limiteD = azahara.positionX+5;
	var limiteG = azahara.positionX-5;

	
	function deplacer (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteD) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteG){
			nomObjet.vitesse *= -1;
		}
	}

	timer = window.setInterval(animation, 30);

	function animation() {
		ctx.clearRect(0,0, canvas.width, canvas.height);

		ctx.fillStyle = "rgba(72,52,26,1)";
 		ctx.fillRect (0, 0, 800, 600);

		ctx.drawImage(azaharaImg, azahara.positionX, azahara.positionY);

		deplacer(azahara);
	}
};
//Plan Orio
Animation4.prototype.orio = function() {
	clearInterval(timer);
	var orioImg = new Image();
	orioImg.src = "img/animation/orioConcentre/orio.svg";
	var orio = {
		positionX : -10,
		positionY : 0,
		vitesse : 0.3,
	};

	var limiteD = orio.positionX+5;
	var limiteG = orio.positionX-5;

	
	function deplacer (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteD) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteG){
			nomObjet.vitesse *= -1;
		}
	}

	timer = window.setInterval(animation, 30);

	function animation() {
		ctx.clearRect(0,0, canvas.width, canvas.height);

		ctx.fillStyle = "rgba(164,115,67,1)";
 		ctx.fillRect (0, 0, 800, 600);

		ctx.drawImage(orioImg, orio.positionX, orio.positionY);

		deplacer(orio);
	}
};

Animation4.prototype.choixPierre = function() {
	clearInterval(timer);
	var cristalImg = new Image();
	cristalImg.src = "img/animation/cristal/cristal.svg";
	var cristal = {
		positionX : 145,
		positionY : 130,
		vitesse : 1,
	};

	var limiteD = cristal.positionX+5;
	var limiteG = cristal.positionX-5;

	var bg = new Image();
	bg.src = "img/animation/cristal/bg-choix.svg";
	
	function deplacer (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteD) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteG){
			nomObjet.vitesse *= -1;
		}
	}

	timer = window.setInterval(animation, 30);

	function animation() {
		ctx.clearRect(0,0, canvas.width, canvas.height);

		ctx.drawImage(bg, 0, 0);
		ctx.drawImage(cristalImg, cristal.positionX, cristal.positionY);

		deplacer(cristal);
	}
};
//FIN
//Mere près du lit
Animation4.prototype.mereLit = function() {
	clearInterval(timer);

	var persoImg = new Image();
	persoImg.src = "img/animation/chambre/child.svg";
	var perso = {
		positionX : 238,
		positionY : 478,
		vitesse : 0.3,
	};

	var mereImg = new Image();
	mereImg.src = "img/animation/chambre/mereProfil.svg";
	var mere = {
		positionX : 505,
		positionY : 410,
		vitesse : 0.20,
	};

	var limiteDM = mere.positionX+5;
	var limiteGM = mere.positionX-5;

	var bg = new Image();
	bg.src = "img/animation/chambre/bg.svg";

	function deplacerMere (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteDM) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteGM){
			nomObjet.vitesse *= -1;
		}
	}

	timer = window.setInterval(animation, 30);

	
	function animation() {
		ctx.clearRect(0,0, canvas.width, canvas.height);

		ctx.drawImage(bg, 0, 0);
		ctx.drawImage(persoImg, perso.positionX, perso.positionY);
		ctx.drawImage(mereImg, mere.positionX, mere.positionY);

		//On fait bouger l'enfant que si c'est la fin mal
		deplacerMere(mere);
	}
};

//Mere près du lit
Animation4.prototype.mereLitFinMal = function() {
	clearInterval(timer);

	var persoImg = new Image();
	persoImg.src = "img/animation/chambre/child.svg";
	var perso = {
		positionX : 238,
		positionY : 478,
		vitesse : 0.3,
	};

	var mereImg = new Image();
	mereImg.src = "img/animation/chambre/mereProfil.svg";
	var mere = {
		positionX : 505,
		positionY : 410,
		vitesse : 0.20,
	};

	var limiteD = perso.positionX+5;
	var limiteG = perso.positionX-5;
	
	var limiteDM = mere.positionX+5;
	var limiteGM = mere.positionX-5;

	var bg = new Image();
	bg.src = "img/animation/chambre/bg.svg";

	function deplacer (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteD) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteG){
			nomObjet.vitesse *= -1;
		}
	}

	function deplacerMere (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteDM) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteGM){
			nomObjet.vitesse *= -1;
		}
	}

	timer = window.setInterval(animation, 30);

	
	function animation() {
		ctx.clearRect(0,0, canvas.width, canvas.height);

		ctx.drawImage(bg, 0, 0);
		ctx.drawImage(persoImg, perso.positionX, perso.positionY);
		ctx.drawImage(mereImg, mere.positionX, mere.positionY);

		deplacer(perso);
		deplacerMere(mere);
	}
};

//Chambre porte ouverte
Animation4.prototype.porteOuverte = function() {
	window.clearInterval(timer);
	var persoImg = new Image();
	persoImg.src = "img/animation/chambre/child.svg";
	var perso = {
		positionX : 238,
		positionY : 478,
		vitesse : 0.3,
	};

	var mereImg = new Image();
	mereImg.src = "img/animation/chambre/mereDos.svg";
	var mere = {
		positionX : 348,
		positionY : 105,
		vitesse : 0.15,
	};

	var limiteD = perso.positionX+5;
	var limiteG = perso.positionX-5;

	var limiteDM = mere.positionX+5;
	var limiteGM = mere.positionX-5;

	var bg = new Image();
	bg.src = "img/animation/chambre/bg2.svg";
	
	function deplacer (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteD) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteG){
			nomObjet.vitesse *= -1;
		}
	}

	function deplacerMere (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteDM) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteGM){
			nomObjet.vitesse *= -1;
		}
	}
	timer = window.setInterval(animation, 30);

	function animation() {
		ctx.clearRect(0,0, canvas.width, canvas.height);

		ctx.drawImage(bg, 0, 0);
		ctx.drawImage(persoImg, perso.positionX, perso.positionY);
		ctx.drawImage(mereImg, mere.positionX, mere.positionY);

		deplacer(perso);
		deplacerMere(mere);
	}
};
//Chambre porte fermée
Animation4.prototype.porteFerme = function() {
	clearInterval(timer);
	var persoImg = new Image();
	persoImg.src = "img/animation/chambre/child.svg";
	var perso = {
		positionX : 238,
		positionY : 478,
		vitesse : 0.3,
	};

	var limiteD = perso.positionX+5;
	var limiteG = perso.positionX-5;

	var bg = new Image();
	bg.src = "img/animation/chambre/bg.svg";
	
	function deplacer (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteD) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteG){
			nomObjet.vitesse *= -1;
		}
	}

	timer = window.setInterval(animation, 30);

	function animation() {
		ctx.clearRect(0,0, canvas.width, canvas.height);

		ctx.drawImage(bg, 0, 0);
		ctx.drawImage(persoImg, perso.positionX, perso.positionY);

		deplacer(perso);
	}
};
Animation4.prototype.fin = function() {
	clearInterval(timer);
	// ctx.clearRect(0,0, canvas.width, canvas.height);
};