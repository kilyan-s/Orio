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

	var orioImg = new Image();
	orioImg.src = "img/AzaharaReve/orio.svg";
	var orio = {
		positionX : 60,
		positionY : 95,
		vitesse : 0.35
	};

	var azaharaImg = new Image();
	azaharaImg.src = "img/AzaharaReve/azahara.svg";
	var azahara = {
		positionX : 60,
		positionY : 365,
		vitesse : -0.2
	};

	var limiteH = orio.positionY-5;
	var limiteB = orio.positionY+5;

	var limiteHA = azahara.positionY-5;
	var limiteBA = azahara.positionY+5;

	var bg = new Image();
	bg.src = "img/AzaharaReve/bg.svg";
	
	function deplacer (nomObjet){
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

	function deplacerA (nomObjet){
		nomObjet.positionY += nomObjet.vitesse;
		if(nomObjet.positionY >= limiteBA) {
			nomObjet.vitesse *= -1;
			console.log(nomObjet.positionY);
		} 
		else if(nomObjet.positionY <= limiteHA){
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
		context.drawImage(orioImg, orio.positionX, orio.positionY);
		context.drawImage(azaharaImg, azahara.positionX, azahara.positionY);

		deplacer(orio);
		deplacerA(azahara);
	}
};