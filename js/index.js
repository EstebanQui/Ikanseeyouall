// SMOOTH SCROLLING SECTIONS
$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
        || location.hostname == this.hostname) {

        let target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
           if (target.length) {
             $('html,body').animate({
                 scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
});

// Section 4 Size text modified

/* Input */
let inputSize = document.querySelector(".inputsize");
let outputSize = document.querySelector(".sizeoutput");

let inputHeight = document.querySelector(".lineheight");
let outputHeight = document.querySelector(".outputheight");

let inputSpacing = document.querySelector(".letterspacing");
let outputSpacing = document.querySelector(".letterspacingoutput");

let fontSizeArea = document.querySelector("textarea").style.fontSize;
let letterSpacing = document.querySelector("textarea").style.letterSpacing;
let lineheight = document.querySelector("textarea").style.lineHeight;


let newFontSize;
/* Fin input */

/* Selecteur */
inputHeight.addEventListener('input', function () {
	lineheight = parseInt(newFontSize) * this.value;
	textArea.style.lineHeight = outputHeight.value = this.value + "px";

})
inputSpacing.addEventListener('input', function () {
	letterSpacing = parseInt(newFontSize) * this.value;
	textArea.style.letterSpacing = outputSpacing.value = this.value + "px";
})
inputSize.addEventListener('input', function () {
	fontSizeArea = parseInt(newFontSize) * this.value;
	textArea.style.fontSize = outputSize.value = this.value + "px";

})

const cursor = document.getElementsByClassName("cursor")[0];

document.onmousemove = ev => {
  cursor.style.top = ev.clientY + 'px' ;
  cursor.style.left = ev.clientX + 'px' ;
};

let textArea = document.querySelector("textarea");



