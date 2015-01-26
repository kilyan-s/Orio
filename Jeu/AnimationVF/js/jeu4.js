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
	
	// var nuage4Img = new Image();
	// nuage4Img.src = "img/jeu4/cloud4.png";
	// var nuage4 = {
	// 	positionX : 200,
	// 	positionY : 170,
	// 	vitesse : -0.75
	// };

	// var nuage5Img = new Image();
	// nuage5Img.src = "img/jeu4/cloud5.png";
	// var nuage5 = {
	// 	positionX : 480,
	// 	positionY : 20,
	// 	vitesse : -0.9
	// };
	
	// var nuage6Img = new Image();
	// nuage6Img.src = "img/jeu4/cloud6.png";
	// var nuage6 = {
	// 	positionX : 710,
	// 	positionY : 160,
	// 	vitesse : 0.8
	// };

	// var nuage7Img = new Image();
	// nuage7Img.src = "img/jeu4/cloud7.png";
	// var nuage7 = {
	// 	positionX : -200,
	// 	positionY : 100,
	// 	vitesse : 1
	// };
	
	// var nuage8Img = new Image();
	// nuage8Img.src = "img/jeu4/cloud8.png";
	// var nuage8 = {
	// 	positionX : 400,
	// 	positionY : 130,
	// 	vitesse : -0.95
	// };

	var bg = new Image();
	bg.src = "img/jeu4/bg.png";

	function deplacer (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= -10) {
			nomObjet.vitesse *= -1;
			console.log(nomObjet.positionX);
		} 
		else if(nomObjet.positionX <= -500){
			nomObjet.vitesse *= -1;
			// console.log("ok");
		}
	}

	// console.log(context);

	var timer = window.setInterval(animation, 30);

	// function rotation(nomObjet){
	// 	nomObjet.rotate(45 * Math.PI / 180);
	// }

	function animation() {
		context.clearRect(0,0, canvas.width, canvas.height);

		context.drawImage(bg, 0, 0);

		//context.drawImage(soleilImg, 20, -20);

		
		context.drawImage(nuage1Img, nuage1.positionX, nuage1.positionY);
		context.drawImage(nuage2Img, nuage2.positionX, nuage2.positionY);
		context.drawImage(nuage3Img, nuage3.positionX, nuage3.positionY);


		// context.drawImage(nuage4Img, nuage4.positionX, nuage4.positionY);
		// context.drawImage(nuage5Img, nuage5.positionX, nuage5.positionY);
		// context.drawImage(nuage6Img, nuage6.positionX, nuage6.positionY);
		// context.drawImage(nuage7Img, nuage7.positionX, nuage7.positionY);
		// context.drawImage(nuage8Img, nuage8.positionX, nuage8.positionY);

		//console.log(nuage1.positionX);
		// console.log(nuage2.positionX);
		deplacer(nuage1);
		deplacer(nuage2);
		deplacer(nuage3);
		// deplacer(nuage4);
		// deplacer(nuage5);
		// deplacer(nuage6);
		// deplacer(nuage7);
		// deplacer(nuage8);
		//rotation(soleil);
	}
};