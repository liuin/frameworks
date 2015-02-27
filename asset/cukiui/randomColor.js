/* 取随机颜色 */
+function ($) {
  'use strict';
  var srand = '[data-dismiss="srand"]';
  var Rand   = function () {}
  Rand.prototype.rcolor = function  () {
    //16进制方式表示颜色0-F
    var arrHex = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
    var strHex = "#";
    var index;
    for(var i = 0; i < 6; i++) {
      //取得0-15之间的随机整数
      index = Math.round(Math.random() * 15);
      strHex += arrHex[index];
    }

    var $this = $(this);
    $this.html(strHex);
  }
  $(document).on('click', srand, Rand.prototype.rcolor);
}(jQuery);