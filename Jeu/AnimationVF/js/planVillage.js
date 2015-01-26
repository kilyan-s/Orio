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

	var nuage1Img = new Image();
	nuage1Img.src = "img/planVillage/cloud1.svg";
	var nuage1 = {
		positionX : 0,
		positionY : 50,
		vitesse : 0.7
	};
	
	var nuage2Img = new Image();
	nuage2Img.src = "img/planVillage/cloud2.svg";
	var nuage2 = {
		positionX : 710,
		positionY : 60,
		vitesse : -0.6
	};

	var nuage3Img = new Image();
	nuage3Img.src = "img/planVillage/cloud3.svg";
	var nuage3 = {
		positionX : 400,
		positionY : 140,
		vitesse : 0.8
	};
	
	var nuage4Img = new Image();
	nuage4Img.src = "img/planVillage/cloud4.svg";
	var nuage4 = {
		positionX : 200,
		positionY : 170,
		vitesse : -0.75
	};

	var nuage5Img = new Image();
	nuage5Img.src = "img/planVillage/cloud5.svg";
	var nuage5 = {
		positionX : 480,
		positionY : 20,
		vitesse : -0.9
	};
	
	var nuage6Img = new Image();
	nuage6Img.src = "img/planVillage/cloud6.svg";
	var nuage6 = {
		positionX : 710,
		positionY : 160,
		vitesse : 0.8
	};

	var nuage7Img = new Image();
	nuage7Img.src = "img/planVillage/cloud7.svg";
	var nuage7 = {
		positionX : -200,
		positionY : 100,
		vitesse : 1
	};
	
	var nuage8Img = new Image();
	nuage8Img.src = "img/planVillage/cloud8.svg";
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
	soleilImg.src = "img/menu/sun.svg";

	var bg = new Image();
	bg.src = "img/menu/bg.svg";

	function deplacer (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= 880) {
			nomObjet.vitesse *= -1;
			console.log(nomObjet.positionX);
		} 
		else if(nomObjet.positionX <= -200){
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

		context.drawImage(soleilImg, 20, -20);

		context.drawImage(nuage1Img, nuage1.positionX, nuage1.positionY);
		context.drawImage(nuage2Img, nuage2.positionX, nuage2.positionY);
		context.drawImage(nuage3Img, nuage3.positionX, nuage3.positionY);
		context.drawImage(nuage4Img, nuage4.positionX, nuage4.positionY);
		context.drawImage(nuage5Img, nuage5.positionX, nuage5.positionY);
		context.drawImage(nuage6Img, nuage6.positionX, nuage6.positionY);
		context.drawImage(nuage7Img, nuage7.positionX, nuage7.positionY);
		context.drawImage(nuage8Img, nuage8.positionX, nuage8.positionY);

		//console.log(nuage1.positionX);
		deplacer(nuage1);
		deplacer(nuage2);
		deplacer(nuage3);
		deplacer(nuage4);
		deplacer(nuage5);
		deplacer(nuage6);
		deplacer(nuage7);
		deplacer(nuage8);
		//rotation(soleil);

		console.log(soleil.positionX);
	}
};