/* ========================================================================
滚动控制效果
 */
+function ($) {
  "use strict";
  var scrollEffe = function  (groudEl) {
    this.groudEl = groudEl;
    this.$el = [];
    this.$parentEl = [];
    this.startPro = [];
    for (var i = 0;  i<groudEl.length ; i++) {
      this.$el[i] = groudEl[i][0];
      this.$parentEl[i] = groudEl[i][1];
      this.startPro[i] = groudEl[i][5];
      this.initPosFun(this.$el[i],groudEl[i][2],groudEl[i][3],groudEl[i][4]);
    }

    this.initScroll();

  }

  scrollEffe.prototype.initPosFun =function  ($dom,tempX,tempY,type) {
    if (!type) {
      type = "moveblock";
    }
    tempX = tempX || 0;
    tempY = tempY || 0;
    $dom.data("endX",parseFloat($dom.css("left")));
    $dom.data("startX",parseFloat($dom.css("left"))+tempX);
    $dom.data("tempX",tempX);

    $dom.data("endY",parseFloat($dom.css("top")));
    $dom.data("startY",parseFloat($dom.css("top"))+tempY);
    $dom.data("tempY",tempY);

    $dom.css({"left":$dom.data("startX"),"top":$dom.data("startY")});
  }

  scrollEffe.prototype.posMoveFun = function($dom,$domParent,plong)
  {
      var permb = 0;
      if (plong) {
        permb = plong;
      }else {
        permb = 0;
      }
      //父级到窗口上边缘的距离
      var tempY = $(document).scrollTop()-$domParent.position().top + permb;
      var per = Math.max(-tempY/800,0);
      var targetX = $dom.data("endX")+$dom.data("tempX")*per;
      var targetY = $dom.data("endY")+$dom.data("tempY")*per;
      $dom.css({"left":targetX,"top":targetY});
  }


  scrollEffe.prototype.opacity = function($dom,$domParent,ease)
  {
    //父级到窗口上边缘的距离
    var tempY = $(document).scrollTop()-$domParent.position().top;
    var opacity = Math.min(tempY*0.008,1);
    $dom.css("opacity",opacity);
  };

  scrollEffe.prototype.scale = function($dom,$domParent,ease)
  {
    //父级到窗口上边缘的距离
    var tempY = $(document).scrollTop()-$domParent.position().top + $(window).height()/2;

    var scale = Math.min(tempY*0.003,1);
    if (scale < 0) {
      scale = 0
    }
    $dom.css("transform","scale(" + scale + ")");
  };


  scrollEffe.prototype.initScroll = function  () {
    var $this = this;
    $(window).bind("scroll",function(){
      for (var i = 0;  i<$this.groudEl.length ; i++) {
        switch ($this.groudEl[i][4]) {
        case 'moveblock':
          $this.posMoveFun($this.$el[i],$this.$parentEl[i],$this.startPro[i]);
        break
        case 'opacity':
         $this.opacity($this.$el[i],$this.$parentEl[i]);
        case 'scale':
         $this.scale($this.$el[i],$this.$parentEl[i]);
        break
        default:
        }
           
      }
    })
  }

  $(document).ready(function() {
      //控制模块
      if ($('body.home').length > 0) {
        var blockSilder = [
          [$(".server-block1"),$("#server-container"),-700,-600-300,'moveblock'],
          [$(".server-block2"),$("#server-container"),-1500,-600+300,'moveblock'],
          [$(".server-block3"),$("#server-container"),0,500,'moveblock'],
          [$(".server-block4"),$("#server-container"),300,-600-300,'moveblock'],
          [$(".server-box-top"),$("#server-container"),0, -1200,'moveblock'],
          [$(".advantage-ct-pk"),$("#advantage-container"),0.5, 1,'scale'],
          [$(".advantage-cir-active"),$("#advantage-container"),-500, 0,'moveblock'],
          [$(".advantage-cir-media"),$("#advantage-container"),0, -500,'moveblock'],
          [$(".advantage-cir-design"),$("#advantage-container"),-300, 500,'moveblock'],
          [$(".advantage-cir-power"),$("#advantage-container"),-300, -500,'moveblock'],
          [$(".advantage-cir-brand"),$("#advantage-container"),300, -500,'moveblock'],
          [$(".advantage-cir-res"),$("#advantage-container"),-300, 500,'moveblock'],
          [$(".team-box-txt"),$("#team-container"),-600, 0,'moveblock'],
          [$(".team-ld"),$("#team-container"),600, 0,'moveblock'],
          [$(".news-list"),$("#news-container"),0, 700,'moveblock'],
          [$(".contact-adress"),$("#contact-container"),-500, 0,'moveblock',500],
          [$(".share-box"),$("#contact-container"),500, 0,'moveblock',500]
        ]
        var $serverBlock1 = new scrollEffe(blockSilder);
      }
  })
}(jQuery);