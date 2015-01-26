window.onload = function(){

	var canvas = document.getElementById('mon_canvas');
    if(!canvas){
		alert("Impossible de récupérer le canvas");
        return;
    }

    var context = canvas.getContext('2d');
    if(!context){
        alert("Impossible de récupérer le context du canvas");
        return;
    }

	var gaucheImg = new Image();
	gaucheImg.src = "img/crochet/gauche.svg";
	var gauche = {
		positionX : -128,
		positionY : 200,
		vitesse : 0.5
	};

	var limiteHG = gauche.positionY-10;
	var limiteBG = gauche.positionY+10;


	var droiteImg = new Image();
	droiteImg.src = "img/crochet/droite.svg";
	var droite = {
		positionX : 390,
		positionY : 280,
		vitesse : -0.25
	};

	var limiteHD = droite.positionY-10;
	var limiteBD = droite.positionY+10;

	var bgImg = new Image();
	bgImg.src = "img/crochet/bg.svg";
	
	function deplacerG (nomObjet){
		nomObjet.positionY += nomObjet.vitesse;
		if(nomObjet.positionY >= limiteBG) {
			nomObjet.vitesse *= -1;
			console.log(nomObjet.positionY);
		} 
		else if(nomObjet.positionY <= limiteHG){
			nomObjet.vitesse *= -1;
			console.log("ok");
		}
	}

	function deplacerD (nomObjet){
		nomObjet.positionY += nomObjet.vitesse;
		if(nomObjet.positionY >= limiteBD) {
			nomObjet.vitesse *= -1;
			console.log(nomObjet.positionY);
		} 
		else if(nomObjet.positionY <= limiteHD){
			nomObjet.vitesse *= -1;
			console.log("ok");
		}
	}

	//console.log(context);

	var timer = window.setInterval(animation, 30);

	// function rotation(nomObjet){
	// 	nomObjet.rotate(45 * Math.PI / 180);
	// }

	function animation() {
		context.clearRect(0,0, canvas.width, canvas.height);

		context.drawImage(bgImg, 0, 0);
		context.drawImage(gaucheImg, gauche.positionX, gauche.positionY);
		context.drawImage(droiteImg, droite.positionX, droite.positionY);

		deplacerG(gauche);
		deplacerD(droite);
	}
};