var c=document.getElementById("canvas");
var ctx=c.getContext("2d");

var perso = {
		x: 333,
		y:364,
		dep: 277,
		url: "img/perso.svg"
	}

	/////// Perso
	var imgperso = new Image();
	imgperso.src = perso.url;

	ctx.drawImage(imgperso, perso.x, perso.y);