/**
*
*	 Ce fichier sert à declarer toutes les variable en début de programme pour ne pas avoir d'erreur de var qui n'existent pas
*
*/

var canvas;
var ctx;
var context;
var source;
var audioCtx, audioContext;
var panner, listener;
var fileList;
var gain;

var jeu1, jeu2, jeu3, jeu4 = 0;
var mode;

//Touche appuyé
var touche;


// Permet de changer le type de reverb
function setReverbImpulseResponse(url, convolver) {
    // Load impulse response asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = function() { 
        context.decodeAudioData(
            request.response,
            function(buffer) {
                convolver.buffer = buffer;
            },

            function(buffer) {
                // console.log("Error decoding impulse response!");
            }
        );
    }

    request.send();
}

// Permet de changer le son de la source
function setAudioSource(chooseSource, i, tab) {
    // bufferList = new Array(tab.length);
    // for (var i = 0; i< tab.length; i++){
    //     bufferList = 0;
    // }

    var buffer = bufferList[i];

    // See if we have cached buffer
    if (buffer) {
        chooseSource.buffer = buffer;
    } else {
        // Load asynchronously
        var url = tab[i];

        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";

        request.onload = function() { 
            context.decodeAudioData(
                request.response,
                function(buffer) {
                    mixToMono(buffer);
                    chooseSource.buffer = buffer;
                    bufferList[i] = buffer;  // cache it
                },

                function(buffer) {
                    // console.log("Error decoding audio source data!");
                }
            );
        }

        request.send();
    }
}

// Permet de changer le son de la source pour le jeu 2 car les sons sont déjà spatialisées et si on les met en mono ca ne fonctionne plus
function setAudioSource2(chooseSource, i, tab) {
    // bufferList = new Array(tab.length);
    // for (var i = 0; i< tab.length; i++){
    //     bufferList = 0;
    // }

    var buffer = bufferList[i];

    // See if we have cached buffer
    if (buffer) {
        chooseSource.buffer = buffer;
    } else {
        // Load asynchronously
        var url = tab[i];

        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";

        request.onload = function() { 
            context.decodeAudioData(
                request.response,
                function(buffer) {
                    // mixToMono(buffer);
                    chooseSource.buffer = buffer;
                    bufferList[i] = buffer;  // cache it
                },

                function(buffer) {
                    // console.log("Error decoding audio source data!");
                }
            );
        }

        request.send();
    }
}

// Permet de convertir les sons qui sont en stéréo en mono, en effet, la spatialisation ne marche bien qu'avec des sons en mono
function mixToMono(buffer) {
    if (buffer.numberOfChannels == 2) {
        var pL = buffer.getChannelData(0);
        var pR = buffer.getChannelData(1);
        var length = buffer.length;
        
        for (var i = 0; i < length; ++i) {
            var mono = 0.5 * (pL[i] + pR[i]);
            pL[i] = mono;
            pR[i] = mono;
        }
    }
}

function setSourceBuffer(buffer) {
    source.buffer = buffer;
}
