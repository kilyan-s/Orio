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

	var AzaharaImg = new Image();
	AzaharaImg.src = "img/chezAzahara/azahara.svg";
	var azahara = {
		positionX : 350,
		positionY : 240,
		vitesse : 0.15,
	};

	var OrioImg = new Image();
	OrioImg.src = "img/chezAzahara/Orio.svg";
	var orio = {
		positionX : 180,
		positionY : 180,
		vitesse : -0.1,
	};

	var limiteD = orio.positionX+5;
	var limiteG = orio.positionX-5;

	var limiteDA = azahara.positionX+5;
	var limiteGA = azahara.positionX-5;

	var bg = new Image();
	bg.src = "img/chezAzahara/bg.svg";
	
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

	console.log(context);

	var timer = window.setInterval(animation, 30);

	// function rotation(nomObjet){
	// 	nomObjet.rotate(45 * Math.PI / 180);
	// }

	function animation() {
		context.clearRect(0,0, canvas.width, canvas.height);

		context.drawImage(bg, 0, 0);
		context.drawImage(OrioImg, orio.positionX, orio.positionY);
		context.drawImage(AzaharaImg, azahara.positionX, azahara.positionY);

		deplacer(orio);
		deplacerAzahara(azahara);
	}
};