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
	nuage1Img.src = "img/menu/cloud1.svg";
	var nuage1 = {
		positionX : 0,
		positionY : 50,
		vitesse : 0.7
	};
	
	var nuage2Img = new Image();
	nuage2Img.src = "img/menu/cloud2.svg";
	var nuage2 = {
		positionX : 710,
		positionY : 60,
		vitesse : -0.6
	};

	var nuage3Img = new Image();
	nuage3Img.src = "img/menu/cloud3.svg";
	var nuage3 = {
		positionX : 400,
		positionY : 140,
		vitesse : 0.8
	};
	
	var nuage4Img = new Image();
	nuage4Img.src = "img/menu/cloud4.svg";
	var nuage4 = {
		positionX : 200,
		positionY : 170,
		vitesse : -0.75
	};

	var soleilImg = new Image();
	var soleil = {
		positionX : 150,
		positionY : 30,
		angle : 360
	};
	soleilImg.src = "img/menu/sun.svg";

	var bandeau = new Image();
	bandeau.src = "img/menu/OrioBanner.svg";

	var solo = new Image();
	solo.src = "img/menu/1J.svg";

	var coop = new Image();
	coop.src = "img/menu/2J.svg";

	var bg = new Image();
	bg.src = "img/menu/bg.svg";


	// var test = {
	// 	positionX: 333,
	// 	positionY:364,
	// 	vitesse: 277,
	// 	url: "img/sun.svg"
	// };
	// var imgtest = new Image();
	// imgtest.src = test.url;
	// context.drawImage(imgtest, test.positionX, test.positionY);



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
		context.drawImage(bandeau, 192.5,60);
		context.drawImage(solo, 192.5, 310);
		context.drawImage(coop, 404.5, 310);

		context.fillStyle = "rgba(255,255,255,0.65)";
 		context.fillRect (192.5, 397, 414, 147);

		//console.log(nuage1.positionX);
		deplacer(nuage1);
		deplacer(nuage2);
		deplacer(nuage3);
		deplacer(nuage4);
		//rotation(soleil);

		console.log(soleil.positionX);
	}
};