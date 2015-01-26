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

	var ilmaImg = new Image();
	ilmaImg.src = "img/Ilma.svg";
	var ilma = {
		positionX : 280,
		positionY : 65,
		vitesse : 0.2,
	};

	var fouleImg = new Image();
	fouleImg.src = "img/placeVillageFoule/foule.svg";
	var foule = {
		positionX : 0,
		positionY : 440,
		vitesse : 0.3,
	};

	var azaharaImg = new Image();
	azaharaImg.src = "img/placeVillagefoule/azahara.svg";
	var azahara = {
		positionX : 80,
		positionY : 140,
		vitesse : -0.1,
	};

	var WidoImg = new Image();
	WidoImg.src = "img/Wido.svg";
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
	bg.src = "img/placeVillageFoule/bg.svg";
	
	function deplacer (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteD) {
			nomObjet.vitesse *= -1;
			console.log(nomObjet.positionX);
		} 
		else if(nomObjet.positionX <= limiteG){
			nomObjet.vitesse *= -1;
			console.log("ok");
		}
	}

	function deplacerFoule (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteDFoule) {
			nomObjet.vitesse *= -1;
			console.log(nomObjet.positionX);
		} 
		else if(nomObjet.positionX <= limiteGFoule){
			nomObjet.vitesse *= -1;
			console.log("ok");
		}
	}

	function deplacerAzahara (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteDA) {
			nomObjet.vitesse *= -1;
			console.log(nomObjet.positionX);
		} 
		else if(nomObjet.positionX <= limiteGA){
			nomObjet.vitesse *= -1;
			console.log("ok");
		}
	}

	function deplacerWido (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteDW) {
			nomObjet.vitesse *= -1;
			console.log(nomObjet.positionX);
		} 
		else if(nomObjet.positionX <= limiteGW){
			nomObjet.vitesse *= -1;
			console.log("ok");
		}
	}

	console.log(context);

	var timer = window.setInterval(animation, 30);

	// function rotation(nomObjet){
	// 	nomObjet.rotate(45 * Math.PI / 180);
	// }

	function animation() {
		context.clearRect(0,0, canvas.width, canvas.height);

		context.drawImage(bg, 0, 0);
		context.drawImage(ilmaImg, ilma.positionX, ilma.positionY);
		context.drawImage(fouleImg, foule.positionX, foule.positionY);
		context.drawImage(azaharaImg, azahara.positionX, azahara.positionY);
		context.drawImage(WidoImg, wido.positionX, wido.positionY);

		deplacer(ilma);
		deplacerFoule(foule);
		deplacerAzahara(azahara);
		deplacerWido(wido);
	}
};