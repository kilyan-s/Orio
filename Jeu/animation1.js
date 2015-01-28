var timer;

var Animation1 = function(){};

//Chambre porte fermée
Animation1.prototype.part1 = function() {
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
//Chambre porte ouverte
Animation1.prototype.part2 = function() {
	window.clearInterval(timer);
	var persoImg = new Image();
	persoImg.src = "img/animation/chambre/child.svg";
	var perso = {
		positionX : 238,
		positionY : 478,
		vitesse : 0.3,
	};

	var mereImg = new Image();
	mereImg.src = "img/animation/chambre/mere.svg";
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

//Chambre porte fermé
Animation1.prototype.porteFerme = function() {
	window.clearInterval(timer);

	var persoImg = new Image();
	persoImg.src = "img/animation/chambre/child.svg";
	var perso = {
		positionX : 238,
		positionY : 478,
		vitesse : 0.3,
	};

	var mereImg = new Image();
	mereImg.src = "img/animation/chambre/mere.svg";
	var mere = {
		positionX : 348,
		positionY : 125,
		vitesse : 0.15,
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

//Mere près du lit
Animation1.prototype.part3 = function() {
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
//Plan Village
Animation1.prototype.part4 = function() {
	clearInterval(timer);
	var nuage1Img = new Image();
	nuage1Img.src = "img/animation/planVillage/cloud1.svg";
	var nuage1 = {
		positionX : 0,
		positionY : 50,
		vitesse : 0.7
	};
	
	var nuage2Img = new Image();
	nuage2Img.src = "img/animation/planVillage/cloud2.svg";
	var nuage2 = {
		positionX : 710,
		positionY : 60,
		vitesse : -0.6
	};

	var nuage3Img = new Image();
	nuage3Img.src = "img/animation/planVillage/cloud3.svg";
	var nuage3 = {
		positionX : 400,
		positionY : 140,
		vitesse : 0.8
	};
	
	var nuage4Img = new Image();
	nuage4Img.src = "img/animation/planVillage/cloud4.svg";
	var nuage4 = {
		positionX : 200,
		positionY : 170,
		vitesse : -0.75
	};

	var nuage5Img = new Image();
	nuage5Img.src = "img/animation/planVillage/cloud5.svg";
	var nuage5 = {
		positionX : 480,
		positionY : 20,
		vitesse : -0.9
	};
	
	var nuage6Img = new Image();
	nuage6Img.src = "img/animation/planVillage/cloud6.svg";
	var nuage6 = {
		positionX : 710,
		positionY : 160,
		vitesse : 0.8
	};

	var nuage7Img = new Image();
	nuage7Img.src = "img/animation/planVillage/cloud7.svg";
	var nuage7 = {
		positionX : -200,
		positionY : 100,
		vitesse : 1
	};
	
	var nuage8Img = new Image();
	nuage8Img.src = "img/animation/planVillage/cloud8.svg";
	var nuage8 = {
		positionX : 400,
		positionY : 130,
		vitesse : -0.95
	};

	var soleilImg = new Image();
	var soleil = {
		positionX : 150,
		positionY : 30,
		angle : 360
	};
	soleilImg.src = "img/animation/menu/sun.svg";

	var bg = new Image();
	bg.src = "img/animation/menu/bg.svg";

	function deplacer (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= 880) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= -200){
			nomObjet.vitesse *= -1;
		}
	}
	
	timer = window.setInterval(animation, 30);

	function animation() {
		ctx.clearRect(0,0, canvas.width, canvas.height);
		ctx.drawImage(bg, 0, 0);
		ctx.drawImage(soleilImg, 20, -20);
		ctx.drawImage(nuage1Img, nuage1.positionX, nuage1.positionY);
		ctx.drawImage(nuage2Img, nuage2.positionX, nuage2.positionY);
		ctx.drawImage(nuage3Img, nuage3.positionX, nuage3.positionY);
		ctx.drawImage(nuage4Img, nuage4.positionX, nuage4.positionY);
		ctx.drawImage(nuage5Img, nuage5.positionX, nuage5.positionY);
		ctx.drawImage(nuage6Img, nuage6.positionX, nuage6.positionY);
		ctx.drawImage(nuage7Img, nuage7.positionX, nuage7.positionY);
		ctx.drawImage(nuage8Img, nuage8.positionX, nuage8.positionY);

		deplacer(nuage1);
		deplacer(nuage2);
		deplacer(nuage3);
		deplacer(nuage4);
		deplacer(nuage5);
		deplacer(nuage6);
		deplacer(nuage7);
		deplacer(nuage8);
	}
};
//Plan présentation Azahara
Animation1.prototype.part5 = function() {
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

//Autre plan village ( part 4 )

//Cristal Main
Animation1.prototype.part6 = function() {
	clearInterval(timer);
	var cristalImg = new Image();
	cristalImg.src = "img/animation/cristal/cristal.svg";
	var cristal = {
		positionX : 215,
		positionY : 140,
		vitesse : 1,
	};

	var limiteD = cristal.positionX+5;
	var limiteG = cristal.positionX-5;

	var bg = new Image();
	bg.src = "img/animation/cristal/bg.svg";
	
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

//Hilma court
Animation1.prototype.part7 = function() {
	clearInterval(timer);
	var ilmaImg = new Image();
	ilmaImg.src = "img/animation/ilmacourt/ilma.svg";
	var ilma = {
		positionX : 40,
		positionY : 60,
		vitesse : 6
	};

	var limiteH = ilma.positionY-20;
	var limiteB = ilma.positionY+20;

	var bgImg = new Image();
	bgImg.src = "img/animation/ilmacourt/bg.svg";
	var bg = {
		positionX : 0,
		positionY : 0,
		vitesse : 8
	};
	
	function courrir (nomObjet){
		nomObjet.positionY += nomObjet.vitesse;
		if(nomObjet.positionY >= limiteB) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionY <= limiteH){
			nomObjet.vitesse *= -1;
		}
	}

	function defiler (nomObjet){
		nomObjet.positionY -= nomObjet.vitesse;
	}
	
	timer = window.setInterval(animation, 30);

	function animation() {
		ctx.clearRect(0,0, canvas.width, canvas.height);

		ctx.drawImage(bgImg, bg.positionX, bg.positionY);
		ctx.drawImage(ilmaImg, ilma.positionX, ilma.positionY);

		courrir(ilma);
		defiler(bg);
	}
};

//Foule
Animation1.prototype.part8 = function() {
	clearInterval(timer);
	var ilmaImg = new Image();
	ilmaImg.src = "img/animation/placeVillageFoule/ilma.svg";
	var ilma = {
		positionX : 280,
		positionY : 78,
		vitesse : 0.15,
	};

	var fouleImg = new Image();
	fouleImg.src = "img/animation/placeVillageFoule/foule.svg";
	var foule = {
		positionX : 0,
		positionY : 440,
		vitesse : 0.3,
	};

	var limiteD = ilma.positionX+5;
	var limiteG = ilma.positionX-5;

	var limiteDFoule = foule.positionX+5;
	var limiteGFoule = foule.positionX-5;

	var bg = new Image();
	bg.src = "img/animation/placeVillageFoule/bg.svg";
	
	function deplacer (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteD) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteG){
			nomObjet.vitesse *= -1;
		}
	}

	function deplacerFoule (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteDFoule) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteGFoule){
			nomObjet.vitesse *= -1;
		}
	}
	
	timer = window.setInterval(animation, 30);

	function animation() {
		ctx.clearRect(0,0, canvas.width, canvas.height);

		ctx.drawImage(bg, 0, 0);
		ctx.drawImage(ilmaImg, ilma.positionX, ilma.positionY);
		ctx.drawImage(fouleImg, foule.positionX, foule.positionY);

		deplacer(ilma);
		deplacerFoule(foule);
	}
};

//Foule apparition azahara
Animation1.prototype.part9 = function() {
	clearInterval(timer);
	var ilmaImg = new Image();
	ilmaImg.src = "img/animation/placeVillageFoule/ilma.svg";
	var ilma = {
		positionX : 280,
		positionY : 65,
		vitesse : 0.15,
	};

	var fouleImg = new Image();
	fouleImg.src = "img/animation/placeVillageFoule/foule.svg";
	var foule = {
		positionX : 0,
		positionY : 440,
		vitesse : 0.3,
	};

	var azaharaImg = new Image();
	azaharaImg.src = "img/animation/placeVillagefoule/azahara.svg";
	var azahara = {
		positionX : 80,
		positionY : 140,
		vitesse : -0.1,
	};

	var limiteD = ilma.positionX+5;
	var limiteG = ilma.positionX-5;

	var limiteDA = azahara.positionX+5;
	var limiteGA = azahara.positionX-5;

	var limiteDFoule = foule.positionX+5;
	var limiteGFoule = foule.positionX-5;

	var bg = new Image();
	bg.src = "img/animation/placeVillageFoule/bg.svg";
	
	function deplacer (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteD) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteG){
			nomObjet.vitesse *= -1;
		}
	}

	function deplacerFoule (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteDFoule) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteGFoule){
			nomObjet.vitesse *= -1;
		}
	}

	function deplacerAzahara (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteDA) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteGA){
			nomObjet.vitesse *= -1;
		}
	}

	timer = window.setInterval(animation, 30);

	function animation() {
		ctx.clearRect(0,0, canvas.width, canvas.height);

		ctx.drawImage(bg, 0, 0);
		ctx.drawImage(ilmaImg, ilma.positionX, ilma.positionY);
		ctx.drawImage(fouleImg, foule.positionX, foule.positionY);
		ctx.drawImage(azaharaImg, azahara.positionX, azahara.positionY);

		deplacer(ilma);
		deplacerFoule(foule);
		deplacerAzahara(azahara);
	}
};

//Main Azahara sur la tete de l'enfant
Animation1.prototype.part10 = function() {
	clearInterval(timer);

	var mainImg = new Image();
	mainImg.src = "img/animation/filleIlma/main.svg";
	var main = {
		positionX : 140,
		positionY : 90,
		vitesse : 1
	};

	var limiteH = main.positionY-30;
	var limiteB = main.positionY+30;

	var bg = new Image();
	bg.src = "img/animation/filleIlma/bg.svg";
	
	function courrir (nomObjet){
		nomObjet.positionY += nomObjet.vitesse;
		if(nomObjet.positionY >= limiteB) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionY <= limiteH){
			nomObjet.vitesse *= -1;
		}
	}
	timer = window.setInterval(animation, 30);

	function animation() {
		ctx.clearRect(0,0, canvas.width, canvas.height);

		ctx.drawImage(bg, 0, 0);
		ctx.drawImage(mainImg, main.positionX, main.positionY);

		courrir(main);
	}
};

//Ilma calin avec sa fille
Animation1.prototype.part11 = function() {
	clearInterval(timer);
	var ilmaImg = new Image();
	ilmaImg.src = "img/animation/IlmaCalin/ilma.svg";
	var ilma = {
		positionX : 280,
		positionY : 65,
		vitesse : 0.15,
	};

	var fouleImg = new Image();
	fouleImg.src = "img/animation/placeVillageFoule/foule.svg";
	var foule = {
		positionX : 0,
		positionY : 440,
		vitesse : 0.3,
	};

	var azaharaImg = new Image();
	azaharaImg.src = "img/animation/placeVillagefoule/azahara.svg";
	var azahara = {
		positionX : 80,
		positionY : 140,
		vitesse : -0.1,
	};

	var limiteD = ilma.positionX+5;
	var limiteG = ilma.positionX-5;

	var limiteDA = azahara.positionX+5;
	var limiteGA = azahara.positionX-5;

	var limiteDFoule = foule.positionX+5;
	var limiteGFoule = foule.positionX-5;

	var bg = new Image();
	bg.src = "img/animation/placeVillageFoule/bg.svg";
	
	function deplacer (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteD) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteG){
			nomObjet.vitesse *= -1;
		}
	}

	function deplacerFoule (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteDFoule) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteGFoule){
			nomObjet.vitesse *= -1;
		}
	}

	function deplacerAzahara (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteDA) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteGA){
			nomObjet.vitesse *= -1;
		}
	}

	timer = window.setInterval(animation, 30);

	function animation() {
		ctx.clearRect(0,0, canvas.width, canvas.height);

		ctx.drawImage(bg, 0, 0);
		ctx.drawImage(ilmaImg, ilma.positionX, ilma.positionY);
		ctx.drawImage(fouleImg, foule.positionX, foule.positionY);
		ctx.drawImage(azaharaImg, azahara.positionX, azahara.positionY);

		deplacer(ilma);
		deplacerFoule(foule);
		deplacerAzahara(azahara);
	}
};

//Ilma parle à azahara
Animation1.prototype.part12 = function() {
	clearInterval(timer);
	var ilmaImg = new Image();
	ilmaImg.src = "img/animation/Ilma.svg";
	var ilma = {
		positionX : 280,
		positionY : 65,
		vitesse : 0.15,
	};

	var fouleImg = new Image();
	fouleImg.src = "img/animation/placeVillageFoule/foule.svg";
	var foule = {
		positionX : 0,
		positionY : 440,
		vitesse : 0.3,
	};

	var azaharaImg = new Image();
	azaharaImg.src = "img/animation/placeVillagefoule/azahara.svg";
	var azahara = {
		positionX : 80,
		positionY : 140,
		vitesse : -0.1,
	};

	var limiteD = ilma.positionX+5;
	var limiteG = ilma.positionX-5;

	var limiteDA = azahara.positionX+5;
	var limiteGA = azahara.positionX-5;

	var limiteDFoule = foule.positionX+5;
	var limiteGFoule = foule.positionX-5;

	var bg = new Image();
	bg.src = "img/animation/placeVillageFoule/bg.svg";
	
	function deplacer (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteD) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteG){
			nomObjet.vitesse *= -1;
		}
	}

	function deplacerFoule (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteDFoule) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteGFoule){
			nomObjet.vitesse *= -1;
		}
	}

	function deplacerAzahara (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteDA) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteGA){
			nomObjet.vitesse *= -1;
		}
	}

	timer = window.setInterval(animation, 30);

	function animation() {
		ctx.clearRect(0,0, canvas.width, canvas.height);

		ctx.drawImage(bg, 0, 0);
		ctx.drawImage(ilmaImg, ilma.positionX, ilma.positionY);
		ctx.drawImage(fouleImg, foule.positionX, foule.positionY);
		ctx.drawImage(azaharaImg, azahara.positionX, azahara.positionY);

		deplacer(ilma);
		deplacerFoule(foule);
		deplacerAzahara(azahara);
	}
};

//Wido arrive
Animation1.prototype.part13 = function() {
	clearInterval(timer);
	var ilmaImg = new Image();
	ilmaImg.src = "img/animation/Ilma.svg";
	var ilma = {
		positionX : 280,
		positionY : 65,
		vitesse : 0.2,
	};

	var fouleImg = new Image();
	fouleImg.src = "img/animation/placeVillageFoule/foule.svg";
	var foule = {
		positionX : 0,
		positionY : 440,
		vitesse : 0.3,
	};

	var azaharaImg = new Image();
	azaharaImg.src = "img/animation/placeVillagefoule/azahara.svg";
	var azahara = {
		positionX : 80,
		positionY : 140,
		vitesse : -0.1,
	};

	var WidoImg = new Image();
	WidoImg.src = "img/animation/Wido.svg";
	var wido = {
		positionX : 520,
		positionY : 110,
		vitesse : -0.15,
	};

	var limiteD = ilma.positionX+5;
	var limiteG = ilma.positionX-5;

	var limiteDA = azahara.positionX+5;
	var limiteGA = azahara.positionX-5;

	var limiteDFoule = foule.positionX+5;
	var limiteGFoule = foule.positionX-5;

	var limiteDW = wido.positionX+5;
	var limiteGW = wido.positionX-5;

	var bg = new Image();
	bg.src = "img/animation/placeVillageFoule/bg.svg";
	
	function deplacer (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteD) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteG){
			nomObjet.vitesse *= -1;
		}
	}

	function deplacerFoule (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteDFoule) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteGFoule){
			nomObjet.vitesse *= -1;
		}
	}

	function deplacerAzahara (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteDA) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteGA){
			nomObjet.vitesse *= -1;
		}
	}

	function deplacerWido (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteDW) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteGW){
			nomObjet.vitesse *= -1;
		}
	}

	timer = window.setInterval(animation, 30);

	function animation() {
		ctx.clearRect(0,0, canvas.width, canvas.height);

		ctx.drawImage(bg, 0, 0);
		ctx.drawImage(ilmaImg, ilma.positionX, ilma.positionY);
		ctx.drawImage(fouleImg, foule.positionX, foule.positionY);
		ctx.drawImage(azaharaImg, azahara.positionX, azahara.positionY);
		ctx.drawImage(WidoImg, wido.positionX, wido.positionY);

		deplacer(ilma);
		deplacerFoule(foule);
		deplacerAzahara(azahara);
		deplacerWido(wido);
	}
};

//Wido, Ilma et Azahara entrent dans la maison
Animation1.prototype.part14 = function() {
	clearInterval(timer);
	var ilmaImg = new Image();
	ilmaImg.src = "img/animation/IlmaDos.svg";
	var ilma = {
		positionX : 280,
		positionY : 165,
		vitesse : 0.2,
	};


	var azaharaImg = new Image();
	azaharaImg.src = "img/animation/AzaharaDos.svg";
	var azahara = {
		positionX : 90,
		positionY : 240,
		vitesse : -0.1,
	};

	var WidoImg = new Image();
	WidoImg.src = "img/animation/WidoDos.svg";
	var wido = {
		positionX : 520,
		positionY : 210,
		vitesse : -0.15,
	};

	var limiteD = ilma.positionX+5;
	var limiteG = ilma.positionX-5;

	var limiteDA = azahara.positionX+5;
	var limiteGA = azahara.positionX-5;

	var limiteDW = wido.positionX+5;
	var limiteGW = wido.positionX-5;

	var bg = new Image();
	bg.src = "img/animation/porte/bg.svg";
	
	function deplacer (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteD) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteG){
			nomObjet.vitesse *= -1;
		}
	}

	function deplacerAzahara (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteDA) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteGA){
			nomObjet.vitesse *= -1;
		}
	}

	function deplacerWido (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteDW) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteGW){
			nomObjet.vitesse *= -1;
		}
	}

	timer = window.setInterval(animation, 30);

	function animation() {
		ctx.clearRect(0,0, canvas.width, canvas.height);

		ctx.drawImage(bg, 0, 0);
		ctx.drawImage(ilmaImg, ilma.positionX, ilma.positionY);
		ctx.drawImage(azaharaImg, azahara.positionX, azahara.positionY);
		ctx.drawImage(WidoImg, wido.positionX, wido.positionY);

		deplacer(ilma);
		deplacerAzahara(azahara);
		deplacerWido(wido);
	}
};
//Interieur maison vide
var bgMaisonInterieur = new Image();
bgMaisonInterieur.src = "img/animation/chezAzahara/bg.svg";

Animation1.prototype.maisonVide = function() {
	clearInterval(timer);
	

	ctx.clearRect(0,0, canvas.width, canvas.height);
	ctx.drawImage(bgMaisonInterieur, 0, 0);

};
//Orio descend
Animation1.prototype.part15 = function() {
	clearInterval(timer);
	var bg = new Image();
	bg.src = "img/animation/chezAzahara/bg.svg";

	var persoImg = new Image();
	persoImg.src = "img/animation/chezAzahara/Orio.svg";
	var perso = {
		positionX : 280,
		positionY : 75,
		vitesse : 0.3,
	};

	var limiteD = perso.positionX+5;
	var limiteG = perso.positionX-5;
	
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

//Orio parle à Azahara
Animation1.prototype.part16 = function() {
	clearInterval(timer);
	var AzaharaImg = new Image();
	AzaharaImg.src = "img/animation/chezAzahara/azahara.svg";
	var azahara = {
		positionX : 350,
		positionY : 240,
		vitesse : 0.15,
	};

	var OrioImg = new Image();
	OrioImg.src = "img/animation/chezAzahara/Orio.svg";
	var orio = {
		positionX : 180,
		positionY : 180,
		vitesse : -0.1,
	};

	var limiteD = orio.positionX+5;
	var limiteG = orio.positionX-5;

	var limiteDA = azahara.positionX+5;
	var limiteGA = azahara.positionX-5;

	var bg = new Image();
	bg.src = "img/animation/chezAzahara/bg.svg";
	
	function deplacer (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteD) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteG){
			nomObjet.vitesse *= -1;
		}
	}

	function deplacerAzahara (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteDA) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionX <= limiteGA){
			nomObjet.vitesse *= -1;
		}
	}
	
	timer = window.setInterval(animation, 30);

	function animation() {
		ctx.clearRect(0,0, canvas.width, canvas.height);

		ctx.drawImage(bg, 0, 0);
		ctx.drawImage(OrioImg, orio.positionX, orio.positionY);
		ctx.drawImage(AzaharaImg, azahara.positionX, azahara.positionY);

		deplacer(orio);
		deplacerAzahara(azahara);
	}
};

//Orio allongé
Animation1.prototype.part17 = function() {
	clearInterval(timer);
	var orioImg = new Image();
	orioImg.src = "img/animation/AzaharaReve/orio.svg";
	var orio = {
		positionX : 60,
		positionY : 95,
		vitesse : 0.5
	};

	var limiteH = orio.positionY-5;
	var limiteB = orio.positionY+5;

	var bg = new Image();
	bg.src = "img/animation/AzaharaReve/bg.svg";
	
	function deplacer (nomObjet){
		nomObjet.positionY += nomObjet.vitesse;
		if(nomObjet.positionY >= limiteB) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionY <= limiteH){
			nomObjet.vitesse *= -1;
		}
	}

	timer = window.setInterval(animation, 30);

	function animation() {
		ctx.clearRect(0,0, canvas.width, canvas.height);

		ctx.drawImage(bg, 0, 0);
		ctx.drawImage(orioImg, orio.positionX, orio.positionY);

		deplacer(orio);
	}
};

//Azahara endort orio
Animation1.prototype.part18 = function() {
	clearInterval(timer);
	var orioImg = new Image();
	orioImg.src = "img/animation/AzaharaReve/orio.svg";
	var orio = {
		positionX : 60,
		positionY : 99.19,
		vitesse : 0.35
	};

	var azaharaImg = new Image();
	azaharaImg.src = "img/animation/AzaharaReve/azahara.svg";
	var azahara = {
		positionX : 60,
		positionY : 365,
		vitesse : -0.2
	};

	var limiteH = orio.positionY-5;
	var limiteB = orio.positionY+5;

	var limiteHA = azahara.positionY-5;
	var limiteBA = azahara.positionY+5;

	var bg = new Image();
	bg.src = "img/animation/AzaharaReve/bg.svg";
	
	function deplacer (nomObjet){
		nomObjet.positionY += nomObjet.vitesse;
		if(nomObjet.positionY >= limiteB) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionY <= limiteH){
			nomObjet.vitesse *= -1;
		}
	}

	function deplacerA (nomObjet){
		nomObjet.positionY += nomObjet.vitesse;
		if(nomObjet.positionY >= limiteBA) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionY <= limiteHA){
			nomObjet.vitesse *= -1;
		}
	}

	timer = window.setInterval(animation, 30);

	function animation() {
		ctx.clearRect(0,0, canvas.width, canvas.height);

		ctx.drawImage(bg, 0, 0);
		ctx.drawImage(orioImg, orio.positionX, orio.positionY);
		ctx.drawImage(azaharaImg, azahara.positionX, azahara.positionY);

		deplacer(orio);
		deplacerA(azahara);
		// console.log(orio.positionY);
	}
};
//Orio yeux fermés
Animation1.prototype.part19 = function() {
	clearInterval(timer);
	var orioImg = new Image();
	orioImg.src = "img/animation/AzaharaReve/orioPionce.svg";
	var orio = {
		positionX : 60,
		positionY : 95,
		vitesse : 0.35
	};

	var azaharaImg = new Image();
	azaharaImg.src = "img/animation/AzaharaReve/azahara.svg";
	var azahara = {
		positionX : 60,
		positionY : 365,
		vitesse : -0.2
	};

	var limiteH = orio.positionY-5;
	var limiteB = orio.positionY+5;

	var limiteHA = azahara.positionY-5;
	var limiteBA = azahara.positionY+5;

	var bg = new Image();
	bg.src = "img/animation/AzaharaReve/bg.svg";
	
	function deplacer (nomObjet){
		nomObjet.positionY += nomObjet.vitesse;
		if(nomObjet.positionY >= limiteB) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionY <= limiteH){
			nomObjet.vitesse *= -1;
		}
	}

	function deplacerA (nomObjet){
		nomObjet.positionY += nomObjet.vitesse;
		if(nomObjet.positionY >= limiteBA) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionY <= limiteHA){
			nomObjet.vitesse *= -1;
		}
	}

	timer = window.setInterval(animation, 30);

	function animation() {
		ctx.clearRect(0,0, canvas.width, canvas.height);

		ctx.drawImage(bg, 0, 0);
		ctx.drawImage(orioImg, orio.positionX, orio.positionY);
		ctx.drawImage(azaharaImg, azahara.positionX, azahara.positionY);

		deplacer(orio);
		deplacerA(azahara);
	}
};
//Fondu noir
Animation1.prototype.fondu = function() {
	clearInterval(timer);
	var alpha = 1;

	timer = window.setInterval(animation, 70);

	function animation() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "rgba(0, 0, 0,"+ alpha +")";
		ctx.fillRect (0, 0, canvas.width, canvas.height);
		alpha -= 0.01;
	}
}

//Fin de la 1ere partie de narration
Animation1.prototype.fin = function() {
	clearInterval(timer);
	// ctx.clearRect(0,0, canvas.width, canvas.height);
	// ctx.fillStyle("rgba(0, 0, 0, 0.9)");
	// ctx.drawRect(0,0, canvas.width, canvas.height);
	// console.log("Animation1 Fin");
}
