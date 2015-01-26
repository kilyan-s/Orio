window.onload = function(){

	var canvas = document.getElementById("mon_canvas");
	var ctx = canvas.getContext("2d");

	// var soleil = {
	// 	x: 30,
	// 	y:30,
	// 	url: "img/sun.svg"
	// }

	// /////// SUN
	// var imgsoleil = new Image();
	// imgsoleil.src = soleil.url;

	// ctx.clearRect(0,0, canvas.width, canvas.height);
	// ctx.drawImage(imgsoleil, soleil.x, soleil.y);


	// Load up our image.
	var source = new Image();
	source.src = "img/sun.svg";
	// Render our SVG image to the canvas once it loads.
	source.onload = function(){
	    ctx.drawImage(source,0,0,79,78, 10, 10, 79,78);
	}
}