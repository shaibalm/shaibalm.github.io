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
         document.getElementById('content').style.visibility="visible";
      },1000);
  }
}

/*
  Typewriter animation
*/
var typeWriter = function typeWriter(selector) {
  var el = document.querySelector(selector);
  var text = el.innerHTML;(function _type() {
    var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    if (i === text.length) return;

    el.innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
    setTimeout(function () {
      return _type(i + 1);
    }, 100);
  })();
};

typeWriter(".js-type-writer");
