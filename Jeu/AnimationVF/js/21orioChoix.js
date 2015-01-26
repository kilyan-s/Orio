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

	var mainImg = new Image();
	mainImg.src = "img/choixCrochet/main.svg";
	var main = {
		positionX : -20,
		positionY : 80,
		vitesse : 0.3,
	};

	var limiteD = main.positionX+5;
	var limiteG = main.positionX-5;

	var bg = new Image();
	bg.src = "img/choixCrochet/bg.svg";
	
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

	console.log(context);

	var timer = window.setInterval(animation, 30);

	// function rotation(nomObjet){
	// 	nomObjet.rotate(45 * Math.PI / 180);
	// }

	function animation() {
		context.clearRect(0,0, canvas.width, canvas.height);

		context.drawImage(bg, 0, 0);
		context.drawImage(mainImg, main.positionX, main.positionY);

		deplacer(main);
	}
};