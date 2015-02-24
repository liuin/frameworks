/*-- 层显示 --*/
+function ($) {
  'use strict';
   $.blockShow = function blockShow(objIn, objOut, callBack) {
    if (!objOut) {
      objIn.show();
      objIn[0].offsetWidth;
      objIn.addClass("in").one('bsTransitionEnd',function  () {
        $(this).removeClass("in");
      }).emulateTransitionEnd(220);
    }else {
      objOut.addClass("out").one('bsTransitionEnd', function  () {

      $(this).hide();
      $(this)[0].offsetWidth;
      $(this).removeClass("out");

      objIn.show();
      $(this)[0].offsetWidth;
      objIn.addClass("in").one('bsTransitionEnd',function  () {
        $(this).removeClass("in");
      }).emulateTransitionEnd(220);
      if (callBack) {
        callBack();
      }
      }).emulateTransitionEnd(220);
    }
  }

  $.blockHide = function blockHide(objOut, callBack) {
    objOut.addClass('out').one('bsTransitionEnd', function  () {
    $(this).hide().removeClass("out");

    if (callBack) {
      callBack();
    }
    }).emulateTransitionEnd(350);
  }
}(jQuery);