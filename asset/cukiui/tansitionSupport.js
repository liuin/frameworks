+(function($){
  'use strict';
  $.fn.ckTransform = function (transform) {
    for (var i = 0; i < this.length; i++) {
      var elStyle = this[i].style;
      elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
    }
    return this;
  };

  $.fn.ckTransition = function (duration) {
    if (typeof duration !== 'string') {
      duration = duration + 'ms';
    }
    for (var i = 0; i < this.length; i++) {
      var elStyle = this[i].style;
      elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
    }
    return this;
  };
})(jQuery);
