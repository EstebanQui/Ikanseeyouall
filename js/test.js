//Randomize letter presentation
Letters = function() {
  // Tableau des lettres a prendre en compte pour le random
  this.lettersDOM = null;
  this.active = null;
  this.letters = [];
  this.alphabet = ["a", "b", "c", "d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","i","u","v","w","x","y","z","~","&","|","^","ç","@","]","[","{","}","ù","*","µ","¤","$","£","€","°",")","(","+","-","/","<",">","²","`","é","è","1","2","3","4","5","6","7","8","9","0"
  ];

  return this;
};
//selection des lettres du HTML
Letters.prototype.init = function( word ) {
  
  this.lettersDOM = document.querySelectorAll('.letter');
  this.active = true;
  let i;
  let nextChar;
  let lettersMax = this.lettersDOM.length;
  
  for ( i = 0; i < this.lettersDOM.length; i++ ) {
    
    if ( word.charAt( i ) != "" )
      nextChar = word.charAt( i );
    else 
      nextChar = false;
    
    this.letters.push( new Letter( this.lettersDOM[ i ],  nextChar ) );
    
  }
  
  if ( word.length > lettersMax ) {
    
    let wordContainer = document.getElementById("word");

    for ( i = lettersMax; i < word.length; i++ ) {
      let letterSpan = document.createElement('span');
      letterSpan.innerHTML = "";
      letterSpan.classList.add('letter');
      wordContainer.appendChild( letterSpan );
      this.letters.push( new Letter( letterSpan,  word.charAt( i ) ) );
    }
  }
  
  this.animate();
  
  return this;
  
};
//On parcourt le tableau alphabat créer plus haut
Letters.prototype.animate = function() {
  let i;
  let random;
  let char;
  
  if ( this.active ) {
 
    window.requestAnimationFrame( this.animate.bind(this) );
    
    let indexes = [];

    for ( i = 0; i < this.letters.length; i++ ) {
    
      let current = this.letters[ i ];  
      
      if ( !current.isDead ) {     
        random = Math.floor(Math.random() * (this.alphabet.length - 0));
        char = this.alphabet[ random ]; 
        current.render( char );
      } else {
        indexes.push( i );
      }
    } 
    
    for ( i = 0; i < indexes.length; i++ ) {
      this.letters.splice( indexes[ i ], 1 );
    }
    
    if ( this.letters.length == 0 ) {
      this.stop();
    }
  }
};

Letters.prototype.start = function( word ) {
  this.init( word );
};

Letters.prototype.stop = function() {
  this.active = false;
};

//Effet random des lettres (verifier que cela focntionne sur les double lettre)
Letter = function( DOMElement, nextChar ) {
  
  let scope = this;
  
  this.DOMEl = DOMElement;
  this.char = DOMElement.innerHTML;
  this.next = nextChar;
  this.speed = Math.floor(Math.random() * (300 - 50) );
  this.total = 0;
  this.duration = 2000;
  this.animating = true;
  this.isDead = false;
  
  this.timer = setInterval(function() { 
    if ( scope.animating === true ) {
      scope.total += scope.speed;
    } 
    scope.animating = !scope.animating;
  }, this.speed);

  this.animate();
  
  return this;
 
};

//Mot a remplacer a la fin de chaque tour Random
Letter.prototype.animate = function() {
  let i;
  let random;
  
  if ( !this.isDead ) {
    window.requestAnimationFrame( this.animate.bind(this) );
  }
  
  
  if ( this.total < this.duration ) {
    
    if ( this.animating ) {
      this.DOMEl.innerHTML = this.char;
    }
      
  } else {
    this.isDead = true;
    
    if ( !this.next ) {
      let parent = document.getElementById('word');
      parent.removeChild( this.DOMEl );
      return;
    }
    
    this.DOMEl.innerHTML = this.next;
  }
};

Letter.prototype.render = function( char ) {
  
  if ( !this.animating ) {
    this.char = char;
  }
  
};

let word = [ "SWISS-TYPEFACE", "KISS ME", "INSPIRATION" ];
let nextWord = 1;

let letters = new Letters();

setTimeout( function() {
  
  letters.start( word[ nextWord ] );
  
  setInterval(function() {
    nextWord++;
    if ( nextWord >= word.length )
      nextWord = 0;
    
    letters.start( word[ nextWord ] );
  }, 10000);
  
}, 2000);





// MUSIC PLAY

/*
 * Icons by:
 * Font Awesome – http://fontawesome.io/
 * Those Icons – https://www.flaticon.com/authors/those-icons
 * EpicCoders – https://www.flaticon.com/authors/epiccoders
 * Smashicons – https://www.flaticon.com/authors/smashicons
 */

$(document).ready(function () {
	var songs = [
		{
			title: "rockstar",
			artist: "Post Malone, 21 Savage",
			cover: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/rockstar-album-cover.jpg",
			audioFile: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/Post%20Malone%20-%20rockstar%20ft.%2021%20Savage%20(1).mp3",
			color: "#c3af50"
		},
		{
			title: "Let You Down",
			artist: "NF",
			cover: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/perception-album-cover.png",
			audioFile: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/NF%20-%20Let%20You%20Down.mp3",
			color: "#25323b"
		},
		{
			title: "Silence",
			artist: "Marshmello, Khalid",
			cover: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/silence-album-cover.jpg",
			audioFile: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/Marshmello%20-%20Silence%20ft.%20Khalid.mp3",
			color: "#c1c1c1"
		},
		{
			title: "I Fall Apart",
			artist: "Post Malone",
			cover: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/stoney-cover-album.jpg",
			audioFile: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/Post%20Malone%20-%20I%20Fall%20Apart.mp3",
			color: "#cd4829"
		},
		{
			title: "Fireproof",
			artist: "VAX, Teddy Sky",
			cover: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/fireproof-album-cover.jpeg",
			audioFile: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/VAX%20-%20Fireproof%20Feat%20Teddy%20Sky.mp3",
			color: "#5d0126"
		}
	];
	
	for (let song of songs) {
		$("#songs").append('<li class="song" data-audio="' + song.audioFile + '" data-color="'+ song.color +'">' + 
			'<img src="' + song.cover + '">' +
			'<p class="song-title">' + song.title + '</p>' +
			'<p class="song-artist">' + song.artist + '</p>' + 
			'</li>');
	}
	
	$('.jcarousel').jcarousel({
			wrap: 'circular'
	});
});

/*
 * Replace all SVG images with inline SVG
 */
jQuery('img[src$=".svg"]').each(function(){
	var $img = jQuery(this);
	var imgID = $img.attr('id');
	var imgClass = $img.attr('class');
	var imgURL = $img.attr('src');

	jQuery.get(imgURL, function(data) {
		// Get the SVG tag, ignore the rest
		var $svg = jQuery(data).find('svg');

		// Add replaced image's ID to the new SVG
		if(typeof imgID !== 'undefined') {
			$svg = $svg.attr('id', imgID);
		}
		// Add replaced image's classes to the new SVG
		if(typeof imgClass !== 'undefined') {
			$svg = $svg.attr('class', imgClass+' replaced-svg');
		}

		// Remove any invalid XML tags as per http://validator.w3.org
		$svg = $svg.removeAttr('xmlns:a');

		// Replace image with new SVG
		$img.replaceWith($svg);

	}, 'xml');

});

// Current slide
$('.jcarousel').on('jcarousel:visiblein', 'li', function(event, carousel) {
	let cover = $(this).find("img").attr("src");
	let songTitle = $(this).find("p.song-title").html();
	let songArtist = $(this).find("p.song-artist").html();
	let audioSrc = $(this).attr("data-audio");
	let backgroundColor = $(this).attr("data-color");
	$("body").css('background', backgroundColor)
	$("#background").css('background-image', 'url('+cover+')');
	$("audio").find("source").attr("src", ""+audioSrc+"");
	player.load();
	player.currentTime = 0;
	$("#song-info").find("img").attr("src", cover);
	$("#song-info .artist-wrap p").find("span.title").html(songTitle);
	$("#song-info .artist-wrap p").find("span.artist").html(songArtist);
});

// Previous slide
$('#previous-btn').click(function() {
	$('.jcarousel').jcarousel('scroll', '-=1');
	$('#play-btn i').removeClass('fa-pause');
	player.pause();
});

// Next slide
$('#next-btn').click(function() {
	if ($(".fa-random").hasClass('active')) {
		let songs = $("#songs li").length - 1;
		let randomSong = Math.floor(Math.random() * songs) + 1;
		$('.jcarousel').jcarousel('scroll', '+=' + randomSong);
	} else {
		$('.jcarousel').jcarousel('scroll', '+=1');
	}
	$('#play-btn i').removeClass('fa-pause');
	player.pause();
});

// Play Icon Switcher
$('#play-btn').click(function() {
	$(this).find('i').toggleClass('fa-pause');
});

// Menu
$("#menu-btn").click(function() {
	$("#content-wrap").addClass('inactive');
	$("#sidemenu").addClass('active');
});

// Home Button
$("#home-btn").click(function() {
	$("#home-screen").addClass('active');
	$(".menu").removeClass('active');
	$("#content-wrap").addClass('minimized');
});

// App
$(".app-icon").click(function() {
	$("#content-wrap").removeClass('minimized');
	setTimeout(function(){ $("#home-screen").removeClass('active'); }, 300);
});

// Overlay
$("#overlay").click(function () {
	$("#content-wrap").removeClass('inactive');
	$("#sidemenu").removeClass('active');
});

// Options
$("#options-btn").click(function() {
	$("#song-options").addClass('active');
});

// Bluetooth
$("#bluetooth-btn").click(function() {
	$("#bluetooth-devices").addClass('active');
});

// Bluetooth Menu
$("#bluetooth-devices ul li").click(function() {
	$(this).toggleClass('connected');
	$(this).siblings().removeClass('connected');
	
	if ($("#bluetooth-devices ul li").hasClass('connected')) {
		$("#sub-controls i.fa-bluetooth-b").addClass('active');
	} else {
		$("#sub-controls i.fa-bluetooth-b").removeClass('active');
	}
});

// Close Menu
$(".close-btn").click(function() {
	$(".menu").removeClass('active');
});

$('#sub-controls i').click(function () {
	if(!$(this).hasClass('fa-bluetooth-b')) {
		$(this).toggleClass('active');
	}
	
	if ($("#heart-icon").hasClass('active')) {
		$("#heart-icon").removeClass('fa-heart-o');
		$("#heart-icon").addClass('fa-heart');
	} else {
		$("#heart-icon").removeClass('fa-heart');
		$("#heart-icon").addClass('fa-heart-o');
	}
});

/*
 * Music Player
 * By Greg Hovanesyan
 * https://codepen.io/gregh/pen/NdVvbm
 */

var audioPlayer = document.querySelector('#content');
var playpauseBtn = audioPlayer.querySelector('#play-btn');
var progress = audioPlayer.querySelector('.progress');
var sliders = audioPlayer.querySelectorAll('.slider');
var player = audioPlayer.querySelector('audio');
var currentTime = audioPlayer.querySelector('#current-time');
var totalTime = audioPlayer.querySelector('#total-time');

var draggableClasses = ['pin'];
var currentlyDragged = null;

window.addEventListener('mousedown', function(event) {
  
  if(!isDraggable(event.target)) return false;
  
  currentlyDragged = event.target;
  let handleMethod = currentlyDragged.dataset.method;
  
  this.addEventListener('mousemove', window[handleMethod], false);

  window.addEventListener('mouseup', () => {
    currentlyDragged = false;
    window.removeEventListener('mousemove', window[handleMethod], false);
  }, false);  
});

playpauseBtn.addEventListener('click', togglePlay);
player.addEventListener('timeupdate', updateProgress);
player.addEventListener('loadedmetadata', () => {
  totalTime.textContent = formatTime(player.duration);
});
player.addEventListener('ended', function(){
  player.currentTime = 0;
	
	if ($(".fa-refresh").hasClass('active')) {
		togglePlay();
	} else {
		if ($(".fa-random").hasClass('active')) {
			let songs = $("#songs li").length - 1;
			let randomSong = Math.floor(Math.random() * songs) + 1;
			$('.jcarousel').jcarousel('scroll', '+=' + randomSong);
		} else {
			$('.jcarousel').jcarousel('scroll', '+=1');
		}
		togglePlay();
	}
});

sliders.forEach(slider => {
  let pin = slider.querySelector('.pin');
  slider.addEventListener('click', window[pin.dataset.method]);
});

function isDraggable(el) {
  let canDrag = false;
  let classes = Array.from(el.classList);
  draggableClasses.forEach(draggable => {
    if(classes.indexOf(draggable) !== -1)
      canDrag = true;
  })
  return canDrag;
}

function inRange(event) {
  let rangeBox = getRangeBox(event);
  let direction = rangeBox.dataset.direction;
	let screenOffset = document.querySelector("#screen").offsetLeft + 26;
	var min = screenOffset - rangeBox.offsetLeft;
	var max = min + rangeBox.offsetWidth;   
	if(event.clientX < min || event.clientX > max) { return false };
  return true;
}

function updateProgress() {
  var current = player.currentTime;
  var percent = (current / player.duration) * 100;
  progress.style.width = percent + '%';
  
  currentTime.textContent = formatTime(current);
}

function getRangeBox(event) {
  let rangeBox = event.target;
  let el = currentlyDragged;
  if(event.type == 'click' && isDraggable(event.target)) {
    rangeBox = event.target.parentElement.parentElement;
  }
  if(event.type == 'mousemove') {
    rangeBox = el.parentElement.parentElement;
  }
  return rangeBox;
}

function getCoefficient(event) {
  let slider = getRangeBox(event);
	let screenOffset = document.querySelector("#screen").offsetLeft + 26;
  let K = 0;
	let offsetX = event.clientX - screenOffset;
	let width = slider.clientWidth;
	K = offsetX / width;
  return K;
}

function rewind(event) {
  if(inRange(event)) {
    player.currentTime = player.duration * getCoefficient(event);
  }
}

function formatTime(time) {
  var min = Math.floor(time / 60);
  var sec = Math.floor(time % 60);
  return min + ':' + ((sec<10) ? ('0' + sec) : sec);
}

function togglePlay() {
	player.volume = 0.5;
	
  if(player.paused) {
    player.play();
  } else {
    player.pause();
  }  
}