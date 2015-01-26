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
	ilmaImg.src = "img/placeVillageFoule/ilma.svg";
	var ilma = {
		positionX : 280,
		positionY : 78,
		vitesse : 0.15,
	};

	var fouleImg = new Image();
	fouleImg.src = "img/placeVillageFoule/foule.svg";
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

		deplacer(ilma);
		deplacerFoule(foule);
	}
};