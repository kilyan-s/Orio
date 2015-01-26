var timer;

var Animation2 = function(){};

//Orio dans la foret
Animation2.prototype.part1 = function() {

	var orioImg = new Image();
	orioImg.src = "img/animation/foretNeige/orio.svg";
	var orio = {
		positionX : 320,
		positionY : 478,
		vitesse : 0.3,
	};

	var limiteD = orio.positionX+5;
	var limiteG = orio.positionX-5;

	var bg = new Image();
	bg.src = "img/animation/foretNeige/bg.svg";
	
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

//Orio avance
Animation2.prototype.part2 = function() {
	clearInterval(timer);
	var orioImg = new Image();
	orioImg.src = "img/animation/orioCourt/Oriocourt.svg";
	var orio = {
		positionX : 0,
		positionY : 60,
		vitesse : -1.5
	};

	var limiteH = orio.positionY-20;
	var limiteB = orio.positionY+20;

	var bgImg = new Image();
	bgImg.src = "img/animation/orioCourt/bg.svg";
	var bg = {
		positionX : 0,
		positionY : 0,
		vitesse : 0.8
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

//Orio court
Animation2.prototype.part3 = function() {
	clearInterval(timer);
	var orioImg = new Image();
	orioImg.src = "img/animation/orioCourt/Oriocourt.svg";
	var orio = {
		positionX : 0,
		positionY : 60,
		vitesse : 3
	};

	var limiteH = orio.positionY-20;
	var limiteB = orio.positionY+20;

	var bgImg = new Image();
	bgImg.src = "img/animation/orioCourt/bg.svg";
	var bg = {
		positionX : 0,
		positionY : 0,
		vitesse : 5
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

//Orio cogne mur
Animation2.prototype.part4 = function() {
	clearInterval(timer);
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
	bg.src = "img/animation/orioMur/bg.svg";
	
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
Animation2.prototype.fin = function() {
	clearInterval(timer);
	ctx.clearRect(0,0, canvas.width, canvas.height);
};
