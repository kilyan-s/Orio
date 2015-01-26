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

	var persoImg = new Image();
	persoImg.src = "img/chambre/child.svg";
	var perso = {
		positionX : 238,
		positionY : 478,
		vitesse : 0.3,
	};

	var mereImg = new Image();
	mereImg.src = "img/chambre/mere.svg";
	var mere = {
		positionX : 348,
		positionY : 105,
		vitesse : 0.15,
	};

	var limiteD = perso.positionX+5;
	var limiteG = perso.positionX-5;

	var limiteDM = mere.positionX+5;
	var limiteGM = mere.positionX-5;

	var bg = new Image();
	bg.src = "img/chambre/bg2.svg";
	
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

	function deplacerMere (nomObjet){
		nomObjet.positionX += nomObjet.vitesse;
		if(nomObjet.positionX >= limiteDM) {
			nomObjet.vitesse *= -1;
			console.log(nomObjet.positionX);
		} 
		else if(nomObjet.positionX <= limiteGM){
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
		context.drawImage(persoImg, perso.positionX, perso.positionY);
		context.drawImage(mereImg, mere.positionX, mere.positionY);

		deplacer(perso);
		deplacerMere(mere);
	}
};