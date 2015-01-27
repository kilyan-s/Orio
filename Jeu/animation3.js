var timer;

var Animation3 = function(){};

//Mur cassé
Animation3.prototype.part1 = function() {
	var orioImg = new Image();
	orioImg.src = "img/animation/orioMur/orio.svg";
	var orio = {
		positionX : 320,
		positionY : 478,
		vitesse : 0.3,
	};

	var limiteD = orio.positionX+5;
	var limiteG = orio.positionX-5;

	var bg = new Image();
	bg.src = "img/animation/orioMur/bg-sans-mur.svg";
	
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
		ctx.drawImage(orioImg, orio.positionX, orio.positionY);

		deplacer(orio);
	}
};
//Orio marche
Animation3.prototype.part2 = function() {
	clearInterval(timer);
	var orioImg = new Image();
	orioImg.src = "img/animation/orioCourt/Oriocourt.svg";
	var orio = {
		positionX : 0,
		positionY : 60,
		vitesse : -2.3
	};

	var limiteH = orio.positionY-20;
	var limiteB = orio.positionY+20;

	var bgImg = new Image();
	bgImg.src = "img/animation/orioCourt/bg.svg";
	var bg = {
		positionX : 0,
		positionY : 0,
		vitesse : 2.5
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
		ctx.drawImage(orioImg, orio.positionX, orio.positionY);

		courrir(orio);
		defiler(bg);
	}

};
//porte en bois
var porte = new Image();
porte.src = "img/animation/porteMaison/bg.svg";
Animation3.prototype.part3 = function() {
	clearInterval(timer);

	ctx.clearRect(0,0, canvas.width, canvas.height);
	ctx.drawImage(porte, 0, 0);
};

//Orio essaie d'ouvrir la porte en bois
Animation3.prototype.part4 = function() {
	clearInterval(timer);
	var mainImg = new Image();
	mainImg.src = "img/animation/orioOuvrePorte/main.svg";

	var main = {
		positionX : 280,
		positionY : 140,
		vitesse : 0.5
	};

	var limiteHG = main.positionY-10;
	var limiteBG = main.positionY+10;

	var bgImg = new Image();
	bgImg.src = "img/animation/orioOuvrePorte/bg.svg";
	
	function deplacerG (nomObjet){
		nomObjet.positionY += nomObjet.vitesse;
		if(nomObjet.positionY >= limiteBG) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionY <= limiteHG){
			nomObjet.vitesse *= -1;
		}
	}

	
	timer = window.setInterval(animation, 30);

	function animation() {
		ctx.clearRect(0,0, canvas.width, canvas.height);

		ctx.drawImage(bgImg, 0, 0);
		ctx.drawImage(mainImg, main.positionX, main.positionY);

		deplacerG(main);
	}
	
};
//Orio prend le crochet
Animation3.prototype.part5 = function() {
	clearInterval(timer);
	var mainImg = new Image();
	mainImg.src = "img/animation/choixCrochet/main.svg";
	var main = {
		positionX : -20,
		positionY : 80,
		vitesse : 0.3,
	};

	var limiteD = main.positionX+5;
	var limiteG = main.positionX-5;

	var bg = new Image();
	bg.src = "img/animation/choixCrochet/bg.svg";
	
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
		ctx.drawImage(mainImg, main.positionX, main.positionY);

		deplacer(main);
	}
	
};
//Orio essaie de crocheter la serrure
Animation3.prototype.part6 = function() {
	clearInterval(timer);
	var gaucheImg = new Image();
	gaucheImg.src = "img/animation/crochet/gauche.svg";
	var gauche = {
		positionX : -128,
		positionY : 200,
		vitesse : 0.5
	};

	var limiteHG = gauche.positionY-10;
	var limiteBG = gauche.positionY+10;


	var droiteImg = new Image();
	droiteImg.src = "img/animation/crochet/droite.svg";
	var droite = {
		positionX : 390,
		positionY : 280,
		vitesse : -0.25
	};

	var limiteHD = droite.positionY-10;
	var limiteBD = droite.positionY+10;

	var bgImg = new Image();
	bgImg.src = "img/animation/crochet/bg.svg";
	
	function deplacerG (nomObjet){
		nomObjet.positionY += nomObjet.vitesse;
		if(nomObjet.positionY >= limiteBG) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionY <= limiteHG){
			nomObjet.vitesse *= -1;
		}
	}

	function deplacerD (nomObjet){
		nomObjet.positionY += nomObjet.vitesse;
		if(nomObjet.positionY >= limiteBD) {
			nomObjet.vitesse *= -1;
		} 
		else if(nomObjet.positionY <= limiteHD){
			nomObjet.vitesse *= -1;
		}
	}
	
	timer = window.setInterval(animation, 30);

	function animation() {
		ctx.clearRect(0,0, canvas.width, canvas.height);

		ctx.drawImage(bgImg, 0, 0);
		ctx.drawImage(gaucheImg, gauche.positionX, gauche.positionY);
		ctx.drawImage(droiteImg, droite.positionX, droite.positionY);

		deplacerG(gauche);
		deplacerD(droite);
	}
};
//Plan tete Orio 
Animation3.prototype.part7 = function() {
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

	var bg = new Image();
	bg.src = "img/animation/orioConcentre/bg.svg";
	
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
		ctx.drawImage(orioImg, orio.positionX, orio.positionY);

		deplacer(orio);
	}
	
};
//fin
Animation3.prototype.fin = function() {
	clearInterval(timer);
	// ctx.clearRect(0,0, canvas.width, canvas.height);
};