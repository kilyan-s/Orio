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
	ilmaImg.src = "img/ilmacourt/ilma.svg";
	var ilma = {
		positionX : 40,
		positionY : 60,
		vitesse : 6
	};

	var limiteH = ilma.positionY-20;
	var limiteB = ilma.positionY+20;

	var bgImg = new Image();
	bgImg.src = "img/ilmacourt/bg.svg";
	var bg = {
		positionX : 0,
		positionY : 0,
		vitesse : 8
	};
	
	function courrir (nomObjet){
		nomObjet.positionY += nomObjet.vitesse;
		if(nomObjet.positionY >= limiteB) {
			nomObjet.vitesse *= -1;
			console.log(nomObjet.positionY);
		} 
		else if(nomObjet.positionY <= limiteH){
			nomObjet.vitesse *= -1;
			console.log("ok");
		}
	}

	function defiler (nomObjet){
		nomObjet.positionY -= nomObjet.vitesse;
	}

	//console.log(context);

	var timer = window.setInterval(animation, 30);

	// function rotation(nomObjet){
	// 	nomObjet.rotate(45 * Math.PI / 180);
	// }

	function animation() {
		context.clearRect(0,0, canvas.width, canvas.height);

		context.drawImage(bgImg, bg.positionX, bg.positionY);
		context.drawImage(ilmaImg, ilma.positionX, ilma.positionY);

		courrir(ilma);
		defiler(bg);
	}
};