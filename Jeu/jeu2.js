var jeu2 = function(){};

jeu2.prototype.init = function() {
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	//SONS
	var nbSons = 0;
	var ordreSons = [];
	//TOUCHES
	var nbTouches = 0;
	var ordreTouches = [];
	//Fichiers sons
	var fileList = [];

	/******

		1ER SON

	******/
	//Random entre 0 et 60
	var rand = Math.floor((Math.random() * 60));
	//Random entre 0 et 6
	rand = Math.floor(rand / 10);
	console.log(rand);
	//Ajoute le numéro du son au tableau pour la vérification
	ordreSons.push(rand);
	//Incrémente nbSons
	nbSons++;
	//Lance le 2e son
	relanceSon();

	//Evt clavier
	//window.addEventListener("keydown", keyboardJeu2, false );

	function relanceSon(){
		if(nbSons == 5){
			window.addEventListener("keydown", keyboardJeu2, false);
		}else{
			console.log("Nbsons "+nbSons);
			//Random entre 0 et 60
			var rand = Math.floor((Math.random() * 60));
			//Random entre 0 et 6
			rand = Math.floor(rand / 10);
			//On ajoute l'index du son au tab
			ordreSons.push(rand);
			console.log(ordreSons);
			//Incrément nbSons pour limiter le jeu ne nb sons
			nbSons++;
			if(nbSons < 6){
				relanceSon();
			}
		}
		
	}

/*******

	FIN JEU

*******/

	function finJeuWin() {
		console.log("Jeu win");
	}

	function finJeuLose(){
		console.log("Jeu lose");
	}

/*******

	VERIF SEQUENCE

*******/
	function verifSequence() {
		var verification;
		console.log("verif sequence");
		console.log(ordreTouches);
		if(ordreSons.length != ordreTouches.length){
			console.log("Pas meme longeur");
			return false;
		}

		for (var i = 0; i<ordreSons.length; i++){
			console.log(ordreSons[i]+" = "+ordreTouches[i]);
			if(ordreSons[i] == ordreTouches[i]){

				verification = true;
			}
			else{
				verification = false;
			}
		}
		if(verification == true){
			console.log("Séquence valide"); 
		} else{
			console.log("Séquance non valide");
		}
	}
/*******

	KEYBOARD

*******/
	function keyboardJeu2(event){
		touche = String.fromCharCode(event.keyCode);
		console.log(touche);
		nbTouches++;
		//Si l'utilisateur a dejà appuyé sur 6 touches on verifie la séquence
		if(nbTouches > 5){
			verifSequence();
			window.removeEventListener("keydown", keyboardJeu2);
		}
		//Sinon on ajoute la touche au tableau ordreTouches
		else{
			switch(touche){
				case "E":
					ordreTouches.push(0);
					break;
				case "R":
					ordreTouches.push(1);
					break;
				case "T":
					ordreTouches.push(2);
					break;
				case "D":
					ordreTouches.push(3);
					break;
				case "F":
					ordreTouches.push(4);
					break;
				case "G":
					ordreTouches.push(5);
					break;
				default:
					return;
			}
			console.log(ordreTouches);
		}
		
	}

};



