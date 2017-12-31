/*****************************************
 **  Simple fullpage Parallax Scroll Effect
 **
 **  extracted method goDown() and goUp() so that they can be called not only through events but also through links (onclick="goDown();")
 **  https://codepen.io/canelodigital/pen/rLWrNX
 **
 **  with touch support
 **  https://codepen.io/franzk/pen/aNxQxP
 **
 **  based on work by Emily Hayman
 **  https://codepen.io/eehayman/pen/qdGZJr
 **
 *****************************************/

// ------------- VARIABLES ------------- //
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive)
var slideDurationSetting = 600; //Amount of time for which slide is "locked"
var currentSlideNumber = 0;
var totalSlideNumber = $(".background").length;

// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
function wheelScroll(evt) {
  if (isFirefox) {
    //Set delta for Firefox
    delta = evt.detail * (-120);
  } else if (isIe) {
    //Set delta for IE
    delta = -evt.deltaY;
  } else {
    //Set delta for all other browsers
    delta = evt.wheelDelta;
  }
  if (ticking != true) {
    if (delta <= -scrollSensitivitySetting) {
      goDown();
    }
    if (delta >= scrollSensitivitySetting) {
      goUp();
    }
  }
}

function touchScroll(ts, te) {
  delta = te - ts;
  console.log('para');
  if (ticking != true) {
    if (delta <= -scrollSensitivitySetting) {
      goDown();
    }
    if (delta >= scrollSensitivitySetting) {
      goUp();
    }
  }
}

function goDown() {
  //Down scroll
  ticking = true;
  if (currentSlideNumber !== totalSlideNumber - 1) {
    currentSlideNumber++;
    nextItem();
  }
  slideDurationTimeout(slideDurationSetting);
}

function goUp() {
  //Up scroll
  ticking = true;
  if (currentSlideNumber !== 0) {
    currentSlideNumber--;
  }
  previousItem();
  slideDurationTimeout(slideDurationSetting);

}

function goto(slide) {
//slide numbering is like array from 0 to total-1
  if (currentSlideNumber == 0) {
    if (slide == 1) {
      goDown();
    } else if (slide == 2) {
      goDown();
      goDown();
    } else if (slide == 3) {
      goDown();
      goDown();
      goDown();
    }
  } else if (currentSlideNumber == 1) {
    if (slide == 0) {
      goUp();
    } else if (slide == 2) {
      goDown();
    } else if (slide == 3) {
      goDown();
      goDown();
    }
  } else if (currentSlideNumber == 2) {
    if (slide == 0) {
      goUp();
      goUp();
    } else if (slide == 1) {
      goUp();
    } else if (slide == 3) {
      goDown();
    }
  } else if (currentSlideNumber == 3) {
    if (slide == 0) {
      goUp();
      goUp();
      goUp();
    } else if (slide == 1) {
      goUp();
      goUp();
    } else if (slide == 2) {
      goUp();
    }
  }

}
// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
function slideDurationTimeout(slideDuration) {
  setTimeout(function() {
    ticking = false;
  }, slideDuration);
}

// ------------- ADD EVENT LISTENER ------------- //
var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
var ts;

//window.addEventListener(mousewheelEvent, _.throttle(wheelScroll, 60), false);
window.addEventListener(mousewheelEvent, $.throttle(60, wheelScroll), false);
window.addEventListener("touchstart", function(e) {
  ts = e.touches[0].clientY;
}, false);
window.addEventListener("touchend", function(e) {
  var te = e.changedTouches[0].clientY;
  touchScroll(ts, te);
}, false);

// ------------- SLIDE MOTION ------------- //
function nextItem() {
  var $previousSlide = $(".background").eq(currentSlideNumber - 1);
  $previousSlide.removeClass("up-scroll").addClass("down-scroll");
}

function previousItem() {
  var $currentSlide = $(".background").eq(currentSlideNumber);
  $currentSlide.removeClass("down-scroll").addClass("up-scroll");
}
/*
  Preloader animation
*/
document.onreadystatechange = function () {
  var state = document.readyState
  if (state == 'interactive') {
       document.getElementById('contents').style.visibility="hidden";
  } else if (state == 'complete') {
      setTimeout(function(){
         document.getElementById('interactive');
         document.getElementById('preloader').style.visibility="hidden";
         document.getElementById('container').style.visibility="visible";
      },500);
  }
}
