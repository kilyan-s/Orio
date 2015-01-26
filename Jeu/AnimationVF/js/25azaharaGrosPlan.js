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

	var azaharaImg = new Image();
	azaharaImg.src = "img/orioConcentre/azaharaGrosPlan.svg";
	var azahara = {
		positionX : -10,
		positionY : 0,
		vitesse : 0.3,
	};

	var limiteD = azahara.positionX+5;
	var limiteG = azahara.positionX-5;

	
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

		context.fillStyle = "rgba(72,52,26,1)";
 		context.fillRect (0, 0, 800, 600);

		context.drawImage(azaharaImg, azahara.positionX, azahara.positionY);

		deplacer(azahara);
	}
};