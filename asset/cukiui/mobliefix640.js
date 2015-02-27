+(function(){
  'use strict';
  var Fixmobile = function  () {
    this.viwep();
  }

  Fixmobile.width = 640;

  Fixmobile.prototype.viwep = function  (e) {
    var phoneWidth = parseInt(window.screen.width),
    phoneScale = phoneWidth/Fixmobile.width,
    ua = navigator.userAgent,
    headmate;
    if (/Android (\d+\.\d+)/.test(ua)){
      var version = parseFloat(RegExp.$1);
      // andriod 2.3
      if(version > 2.3){
        document.write('<meta name="viewport" content="width=' + Fixmobile.width + ', minimum-scale = ' + phoneScale + ', maximum-scale = '+phoneScale+', target-densitydpi=device-dpi">');
      // andriod 2.3以上
      }else{
        document.write('<meta name="viewport" content="width=' + Fixmobile.width + ', target-densitydpi=device-dpi">');
      }
      // 其他系统
    } else {
      document.write('<meta name="viewport" content="width=' + Fixmobile.width + ', user-scalable=no, target-densitydpi=device-dpi">');
    }
  }
  var newviewport = new Fixmobile();
})();