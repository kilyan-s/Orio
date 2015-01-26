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
	mainImg.src = "img/filleIlma/main.svg";
	var main = {
		positionX : 140,
		positionY : 90,
		vitesse : 1
	};

	var limiteH = main.positionY-30;
	var limiteB = main.positionY+30;

	var bg = new Image();
	bg.src = "img/filleIlma/bg.svg";
	
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


	//console.log(context);

	var timer = window.setInterval(animation, 30);

	// function rotation(nomObjet){
	// 	nomObjet.rotate(45 * Math.PI / 180);
	// }

	function animation() {
		context.clearRect(0,0, canvas.width, canvas.height);

		context.drawImage(bg, 0, 0);
		context.drawImage(mainImg, main.positionX, main.positionY);

		courrir(main);
	}
};