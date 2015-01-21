window.onload = function(){
	// var tab = ["toto", "blabla"];

	// for (var i = 0; i<tab.length; i++){
	// 	window['source'+tab[i]] = null;

	// }
	// console.log(sourcetoto);
	// console.log(sourceblabla);

	// sourcetoto  = 10;
	// console.log(sourcetoto);

	// audioContext = window.AudioContext || window.webkitAudioContext;
	// audioCtx = new AudioContext();

	// sourcetoto = audioCtx.createPanner();
	// console.log(sourcetoto);

	// console.log(tab[0]);
	// tab[0]["nom"] = "hello";
	// console.log(tab[0]["nom"]);


	/**

		TAB SON

	**/

	var tabSon = [
		{
			"nom": "toto",
			"x": 10,
			"y": 10,
			"z": 10,
		},
		{
			"nom": "hello",
			"x": 20,
			"y": 20,
			"z": 20,
		},
		{
			"nom": "yo",
			"x": 30,
			"y": 30,
			"z": 30,
		}
	];

	//"sounds/jeu4/"+nom+".wav",

	console.log(tabSon);
	console.log(tabSon[0]);
	//console.log(tabSon[0][0]);

	console.log(tabSon[0]["nom"]);
	console.log(tabSon[0]["x"]);
	console.log(tabSon[0]["y"]);
	console.log(tabSon[0]["z"]);


	console.log(tabSon[1]["nom"]);
	console.log(tabSon[1]["x"]);
	console.log(tabSon[1]["y"]);
	console.log(tabSon[1]["z"]);
};
