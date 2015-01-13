// Utilities
var context = null;
var revInput = null;

// Création des variables des filtres pour pouvoir les utiliser dans plusieurs fonctions, le numéro correspond à la fréquence qui est masquée/affichée
var filtre86 = null;
var filtre132 = null;
var filtre175 = null;
var filtre220 = null;
var filtrelow = null;


var SubtractiveSynth = function() {
  this.vco = context.createOscillator();
  this.vco.type = "square";
  
  this.vcf = context.createBiquadFilter();
  this.vcf.frequency = 5000;
  this.vcf.Q = 0;
  this.vca = context.createGain();
  this.vca.gain.value = 0;
  
  this.vco.connect(this.vcf);
  this.vcf.connect(this.vca);
  this.vca.connect(revInput);
  
  this.vco.start(0);
};

SubtractiveSynth.prototype.play = function(vel) {
  var currentTime = context.currentTime;
  // VCA Envelope
  var peakLevel = 1;
  var attackTime = 30 / 1000;
  var decayTime = 200 / 1000;
  var sustainPercent = 50 / 100;
  var releaseTime = 500 / 1000;
  
  this.vca.gain.linearRampToValueAtTime(peakLevel, currentTime + attackTime);
  this.vca.gain.linearRampToValueAtTime(peakLevel * sustainPercent, currentTime + attackTime + decayTime);
  this.vca.gain.linearRampToValueAtTime(0, currentTime + attackTime + decayTime + releaseTime);
  
  // VCF Envelope
  peakLevel = 200  + 4000 * vel / 127; // 0 <= vel <= 127
  attackTime = 30 / 1000;
  decayTime = 200 / 1000;
  sustainPercent = 50 / 100;
  releaseTime = 500 / 1000;
  this.vcf.frequency.linearRampToValueAtTime(peakLevel, currentTime + attackTime);
  this.vcf.frequency.linearRampToValueAtTime(peakLevel * sustainPercent, currentTime + attackTime + decayTime);
  this.vcf.frequency.linearRampToValueAtTime(0, currentTime + attackTime + decayTime + releaseTime);
  
};

function loadSample(destinationBuffer, url) {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = 'arraybuffer';

  request.onload = function() { 
    context.decodeAudioData(request.response, function(buffer) {
        destinationBuffer.buf = buffer;
    });
  }
  request.onerror = function() {
    alert('failed to fetch the file');
  }
  request.send();
}

// web audio application
var app = {

  musicLooping: false,
  isInitialized: false,
  context: null,

  btnSoundBuffer: { buf: null },
  loopSoundBuffer: { buf: null },
  impulseSoundBuffer: { buf: null },
  loopingBufferSource: null,
  
  synth: null,
  
  initialize: function() {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      context = new AudioContext();
    }
    catch(e) {
      alert('Web Audio API is not supported in this browser');
    }
    loadSample(this.btnSoundBuffer, "./assets/btnSnd.wav"); 
    loadSample(this.loopSoundBuffer, "./assets/jeu3pfe_final.wav");  
    loadSample(this.impulseSoundBuffer, "./assets/ir_rev_short.wav");  
     
  },
  
  
  // Fonction qui permet de créer les reverbs, le compresseur....
  initAudio: function() {
    revInput = context.createGain();
    var reverb = context.createConvolver();
    reverb.buffer = this.impulseSoundBuffer.buf;
    var revDry = context.createGain(0.9);
    var revWet = context.createGain(0.1);
    var comp = context.createDynamicsCompressor();
    
    revInput.connect(revDry);
    revInput.connect(reverb);
    reverb.connect(revWet);
    revWet.connect(comp);
    revDry.connect(comp);
    comp.connect(context.destination);
    
    this.synth = new SubtractiveSynth();
    isInitialized = true;
  },
  
  
  
  // Fonction qui communique avec les sliders pour changer le gain des filtres
  changeGain86 : function() {
  	filtre86.frequency.value = document.getElementById("changeGain86").value;
  },
  
  changeGain132 : function() {
  	filtre132.frequency.value = document.getElementById("changeGain132").value;
  },

    changeGain175 : function() {
  	filtre175.frequency.value = document.getElementById("changeGain175").value;
  },
  
      changeGain220 : function() {
  	filtre220.frequency.value = document.getElementById("changeGain220").value;
  },


  
  
  
  
  toggleLoopSound : function() {
    
    
    // Création des deux filtres      
    // Créé le filtre
    filtre86 = context.createBiquadFilter();
    // Choisir le type du filtre, ici c'est peaking, ce type de filtre permet de sélectionner une fréquence bien spécifique 
	filtre86.type = "peaking";
	// On choisit la frequence du filtre
	filtre86.frequency.value = 86;
	// On choisit "l'étendue" du filtre, si ce chiffre est grand on va bien cibler la fréquence, si celui-ci est bas on vas sélectionner plus de fréquence aux alentours
	filtre86.Q.value = 20;
	// Permet de monter le gain ou non de cette fréquence --> va de -40 à 40
	filtre86.gain.value = 10;
	
	filtre132 = context.createBiquadFilter();
	filtre132.type = "peaking";
	filtre132.frequency.value = 132;
	filtre132.Q.value = 20;
	filtre132.gain.value = 0;
             
	filtre175 = context.createBiquadFilter();
	filtre175.type = "peaking";
	filtre175.frequency.value = 175;
	filtre175.Q.value = 20;
	filtre175.gain.value = 0; 
	
	filtre220 = context.createBiquadFilter();
	filtre220.type = "peaking";
	filtre220.frequency.value = 220;
	filtre220.Q.value = 20;
	filtre220.gain.value = 0;  
	
	filtrelow = context.createBiquadFilter();
	filtrelow.type = "lowpass";
	filtrelow.frequency.value = 260;
	filtrelow.Q.value = 1;
	filtrelow.gain.value = -60;  
  
    if (!isInitialized)
      return;
    if (this.musicLooping) {
      this.loopingBufferSource.stop(0);
    } else {
      this.loopingBufferSource = context.createBufferSource();
      this.loopingBufferSource.buffer = this.loopSoundBuffer.buf;
      this.loopingBufferSource.loop = true;
      var gainNode = context.createGain();
      gainNode.gain = 0.9;
      // Connexion des deux filtres au buffer
      this.loopingBufferSource.connect(filtrelow);
      filtrelow.connect(filtre220);
      filtre220.connect(filtre175);
      filtre175.connect(filtre132);
      filtre132.connect(filtre86);
	  filtre86.connect(gainNode);
      gainNode.connect(context.destination);
      this.loopingBufferSource.start(0);
    }
    if (this.musicLooping == true) {
      this.musicLooping = false;
    } else {
      this.musicLooping = true;
    }
  },
  
};

