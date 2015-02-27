/** 
* extend 图片循环
* 
* @package jquery
* @author cuki13
   $("#scrollpic").scollpic({
    itemTag : "li",
    itemWidth : 157,
    itemHeight : 250,
    bigImg : 'off',
    scollBack : function  (img , obj) {
      //执行完回调事件处理
    }
   });

  //css
  .scrolllist li{
    float:left;
    width:157px;
    list-style-type:none;
  }
  .scrolllist img {
    width:100%;
    height:100%;
  }
  .scroll-warp {
    width:300px;
  }
*/

+(function($){
/**
 * Checks for CSS support.
 * @private
 * @param {Array} array - The CSS properties to check for.
 * @returns {Array} - Contains the supported CSS property name and its index or `false`.
 */
function isStyleSupported(array) {
  var p, s, fake = document.createElement('div'), list = array;
  for (p in list) {
    s = list[p];
    if (typeof fake.style[s] !== 'undefined') {
      fake = null;
      return [ s, p ];
    }
  }
  return [ false ];
}

/**
 * Checks for CSS transition support.
 * @private
 * @todo Realy bad design
 * @returns {Number}
 */
function isTransition() {
  return isStyleSupported([ 'transition', 'WebkitTransition', 'MozTransition', 'OTransition' ])[0];
}

/**
 * Checks for CSS transform support.
 * @private
 * @returns {String} The supported property name or false.
 */
function isTransform() {
  return isStyleSupported([ 'transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform' ])[0];
}

$.fn.scollpic= function (options) {
  //计算长度
  $(this).each(function  () {
    var $this = $(this);
    var defualts = {
      itemTag : "li",
      itemWidth : 157,
      itemHeight : 150,
      itemCount: 4,
      bigImg : 'off',
      loop : true,
      wrapClass :'scrollpic-wrap',
      parenWidth : 'auto',
      playSpeed : 3000,
      autoPlay : false
    };

    var opts = $.extend({},defualts,options);

   

    var ifLoad = false; //是否加载
    var currentItemIndex = 0 ; //当前item索引
    if (opts.parenWidth == 'auto') {
      opts.parenWidth = parseInt(opts.itemCount * opts.itemWidth);
    }

    var $wrapObj=$('<div class="' + opts.wrapClass + '"></div>');

    $wrapObj.css({'position':'relative','height':opts.itemHeight});

    //加载箭头
    if (opts.itemWidth == 'auto') {
      opts.itemWidth = $(this).find(opts.sdiv).width();
    }
    
    $this.wrap($wrapObj);

    var $arrowPrev=$('<a href="javascript:void(0);" class="scroll-item-list-prev endprev st"><span class="v-h">prev</span></a>');
    var $arrowNext=$('<a href="javascript:void(0);" class="scroll-item-list-next st"><span class="v-h">next</span></a>');

    $this.parent().append($arrowPrev).append($arrowNext);

    $this.wrap('<div class="scroll-warp" style="overflow:hidden; position:relative; height:' + opts.itemHeight + 'px; width:' + opts.parenWidth + 'px;"></div>');

    $arrowPrev.click(function  () {
      scoll('left',$this);
    });

    $arrowNext.click(function  () {
      scoll('right',$this);
    });

    //页码
    var navItemCount = $this.find(opts.itemTag).length / opts.itemCount;
    function  nav() {
      var html = '<div class="banner-nav">';
      for (var i = 0; i < navItemCount; i++) {
        html += '<a class="' + (i == 0 ? 'current' : '' ) + ' sort-' + i + ' " data="'+ i +'" href="javascript:void(0);"><span>'+(i+1)+'</span></a>';
      }
      html += '</div>';
      return $(html);
    }
    var $nav = nav();

    $nav.appendTo($this.parent().parent());
    $nav.find("a").click(function  () {
      if ($(this).hasClass("current")) {
        return false;
      }else {
        $(this).addClass("current").siblings().removeClass("current");
        var ind = $(this).index();
        var scrollWidth = $(this).index() * opts.itemCount * opts.itemWidth;
        scrollWidth = scrollWidth + (opts.itemCount * opts.itemWidth);
        console.log(scrollWidth,ind);
        scoll('nav', $this, scrollWidth);
      }
    })

    //如果循环
    if (opts.loop == true) {
      var totleCount = $this.find(opts.itemTag).length;
      var $prevClone = $this.find(opts.itemTag + ':gt(' + (totleCount - opts.itemCount - 1) + ')').clone().addClass("clone");
      var $nextClone = $this.find(opts.itemTag + ':lt(' + opts.itemCount + ')').clone().addClass("clone");
      $nextClone.appendTo($this);
      $prevClone.prependTo($this);
    }

    //总长度
    var itemTotal=0; 

    $this.find(opts.itemTag).last().css("padding-right","0");
    $this.find(opts.itemTag).each(function  () {     
      itemTotal+=$(this).outerWidth();
    });
    $this.css({'position':'relative','width':itemTotal});    

    //moblie tounch手机事件
    var currntp = 0;
    var pageX = 0;
    var ifchlick = false;
      
    $this.parents("."+opts.wrapClass).bind("touchstart",function  (e) {
       currntp = window.event.touches[0].pageX;
       ifchlick = true;
       e.preventDefault();
     });

    $this.parents("."+opts.wrapClass).bind('touchend', function(e) {
      if (pageX == 0) {
        return false;
      }
      e.preventDefault();
      ifchlick = false;
      var widthStep = 10;
      
      if ((Math.abs(currntp - pageX) >= widthStep)) {
        if (currntp - pageX >= widthStep) {
          $arrowNext.trigger('click');          
        } else {          
          $arrowPrev.trigger('click');
        }
      }
      currntp = 0;
      pageX = 0;
    });

    $this.parents("."+opts.wrapClass).bind('touchmove', function(e) {
      e.preventDefault();
      if (ifchlick) {
        ifchlick = false;
        pageX = window.event.targetTouches[0].pageX;
      }else {
        return false;
      }
    });
    
    //点击显示大图
    $this.find(opts.itemTag).find("a").click(function  (e) {
      var $item = $(this);
      if (opts.bigImg && (opts.bigImg == 'off')) {
        return false;
      }else{

      if(ifLoad == true || $item.parent().hasClass('current')){ return false;}

      currentItemIndex = $this.find(opts.itemTag + '.current').index();
      
      if ((currentItemIndex!= -1) && (currentItemIndex!= 0) && (currentItemIndex!= ($this.find(opts.itemTag).length-1))) {
        var itemIndex = $item.parent().index();
        if (currentItemIndex > itemIndex) {
          $arrowPrev.trigger('click');
        }else {
          $arrowNext.trigger('click');
        }
      }

      $item.parent().siblings('li').removeClass('current');
      $item.parent().addClass('current');

      if (opts.bigImg) {
        showImg(opts.bigImg,$item.attr("href"),$item);
      }      
      e.preventDefault();
      }
    })

    //循环
    var onHover = false;
    $this.hover(function  () {
      onHover = true;
    },function  () {
      onHover = false;
    })

    function loopMain() {
      if (opts.autoPlay == true) {
        if (onHover == false) {
          $arrowNext.trigger('click');
        }
      }
    }
    
    var timecount = setInterval(function  () {
      loopMain();
    }, opts.playSpeed);
    
    var ajaxLoad = $('<div id="loading" class="loading yh"><i></i><span>加载中。。。</span></div>');
    var showImg = function (obj,data,objlink) {
      var img = $('<img src="' + data + '" />');
      ajaxLoad.insertBefore(obj);
      ifload = true;
      
      if (img[0].complete) {
        if (opts.ppscollcallback) {
          opts.ppscollcallback(obj,objlink);
        }
        obj.hide().attr('src', data).fadeIn();
        ajax_load.detach();
        ifload = false;

      }else {
        img.load(function  () {
        if (opts.scollBack) {
          opts.scollBack(obj,objlink);
        }
        obj.hide().attr('src', data).fadeIn();
        ajaxLoad.detach();
        ifload = false;
        }).error(function(){
          ajaxLoad.detach();
          alert('很抱歉,加载失败');
          ifload = false;
        });
      }
    }

    var ifScroll = false;

    var scrollEg = isTransform() ? isTransform()  : 'left';
    
    var leftVal = 0;

    //预设循环模式
    function  loopRest() {
      if (opts.loop == true) {
        $this.css("transition","0"); 
        scrollObj($this, -(opts.itemCount*opts.itemWidth),'nav', function  () {
          $this.css("transition","0.5s");
        });
      }
    }

    function  loopRestEnd() {
      if (opts.loop == true) {
        $this.css("transition","0"); 
        scrollObj($this, -(itemTotal - (opts.itemCount*opts.itemWidth)*2),'nav', function  () {
          $this.css("transition","0.5s");
        });
      }
    }


    loopRest();

    //滚动模式
    function  scrollObj(obj, value, navlong, callback) {
      if (navlong) {
         leftVal = 0;
      }
      cssSet = {};
      if (scrollEg != 'left') {
        var noPos = obj.css("");

        switch (scrollEg) {
        case 'transform':
            cssSet = {'transform' : 'translateX(' + (leftVal + value) + 'px)'};
        break
        case 'WebkitTransform':
            cssSet = {'WebkitTransform' : 'translateX(' + (leftVal + value) + 'px)'};
        break
        case 'MozTransform':
            cssSet = {'MozTransform' : 'translateX(' + (leftVal + value) + 'px)'};
        break
        case 'OTransform':
            cssSet = {'OTransform' : 'translateX(' + (leftVal + value) + 'px)'};
        break
        case 'msTransform':
            cssSet = {'msTransform' : 'translateX(' + (leftVal + value) + 'px)'};
        break 
        default:
        }
        obj.css(cssSet).one('bsTransitionEnd', function(){
          ifScroll = false;
          leftVal += value;
          if (callback) {
            callback();
          }
          checkEnd();
        })
        if (navlong) {
          obj.emulateTransitionEnd(10);
        } 
        
      }else {
        obj.animate({
          "left": (leftVal + value)
        },function  () {
          ifScroll = false;
          leftVal += value;
          checkEnd();
        })
      }
    }

    //滚动函数
    function scoll(dir,obj,moveWidth) {
      if (ifScroll == true) {
        return false;
      }
      ifScroll = true;
      if (dir=='left') {
        if (leftVal >= 0) {
          ifScroll = false;
          return false;
        }
        scrollObj(obj,opts.itemWidth);
      }

      if (dir=='right') {
        if (leftVal <= - (itemTotal-opts.parenWidth)) {
          ifScroll = false;
          return false;
        }
        scrollObj(obj,-opts.itemWidth);
      }

      if (dir == 'nav') {
        scrollObj(obj, -moveWidth,'nav');
      }
    }

    function checkEnd () {
      $this.parents("."+opts.wrapClass).find(".scroll-item-list-next").removeClass("endnext");
      $this.parents("."+opts.wrapClass).find(".scroll-item-list-prev").removeClass("endprev");

      if ($this.position().left >= 0 ) {
        $this.parents("."+opts.wrapClass).find(".scroll-item-list-prev").addClass("endprev");
        if (opts.loop = true) {
          loopRestEnd();
        }
      }
      if ($this.position().left <= - (itemTotal-opts.parenWidth) ) {
        $this.parents("."+opts.wrapClass).find(".scroll-item-list-next").addClass("endnext");

        if (opts.loop == true) {
          loopRest();
        }

      }
    }
  });
};

})(jQuery);


// 鼠标延迟执行方法
/*
$(this).hoverDelay({
  hoverEvent: function(){},
  outEvent:function  () {}
})
*/
+(function($){
  $.fn.hoverDelay = function(options){
    var defaults = {
      hoverDuring: 200,
      outDuring: 200,
      hoverEvent: function(){
        $.noop();
      },
      outEvent: function(){
        $.noop();    
      }
    };
    var sets = $.extend(defaults,options || {});
    var hoverTimer, outTimer, that = this;
    return $(this).each(function(){
      $(this).hover(function(){
        clearTimeout(outTimer);
        hoverTimer = setTimeout(function(){sets.hoverEvent.apply(that)}, sets.hoverDuring);
      },function(){
        clearTimeout(hoverTimer);
        outTimer = setTimeout(function(){sets.outEvent.apply(that)}, sets.outDuring);
      });
    });
  }      
})(jQuery);


/* jQuery EasIng v1.1.2 - http://gsgd.co.uk/sandbox/jquery.easIng.php
*
* Uses the built In easIng capabilities added In jQuery 1.1
* to offer multiple easIng options
*
* Copyright (c) 2007 George Smith
* Licensed under the MIT License:
*   http://www.opensource.org/licenses/mit-license.php
*/
// t: current time, b: begInnIng value, c: change In value, d: duration 动画特效

jQuery.extend(jQuery.easing, {
  easeInQuad : function(x, t, b, c, d) {
    return c * (t /= d) * t + b;
  },
  easeOutQuad : function(x, t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  },
  easeInOutQuad : function(x, t, b, c, d) {
    if((t /= d / 2) < 1)
      return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
  },
  easeInCubic : function(x, t, b, c, d) {
    return c * (t /= d) * t * t + b;
  },
  easeOutCubic : function(x, t, b, c, d) {
    return c * (( t = t / d - 1) * t * t + 1) + b;
  },
  easeInOutCubic : function(x, t, b, c, d) {
    if((t /= d / 2) < 1)
      return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
  },
  easeInQuart : function(x, t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
  },
  easeOutQuart : function(x, t, b, c, d) {
    return -c * (( t = t / d - 1) * t * t * t - 1) + b;
  },
  easeInOutQuart : function(x, t, b, c, d) {
    if((t /= d / 2) < 1)
      return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
  },
  easeInQuint : function(x, t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  },
  easeOutQuint : function(x, t, b, c, d) {
    return c * (( t = t / d - 1) * t * t * t * t + 1) + b;
  },
  easeInOutQuint : function(x, t, b, c, d) {
    if((t /= d / 2) < 1)
      return c / 2 * t * t * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
  },
  easeInSine : function(x, t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
  },
  easeOutSine : function(x, t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  },
  easeInOutSine : function(x, t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
  },
  easeInExpo : function(x, t, b, c, d) {
    return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
  },
  easeOutExpo : function(x, t, b, c, d) {
    return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
  },
  easeInOutExpo : function(x, t, b, c, d) {
    if(t == 0)
      return b;
    if(t == d)
      return b + c;
    if((t /= d / 2) < 1)
      return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  easeInCirc : function(x, t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
  },
  easeOutCirc : function(x, t, b, c, d) {
    return c * Math.sqrt(1 - ( t = t / d - 1) * t) + b;
  },
  easeInOutCirc : function(x, t, b, c, d) {
    if((t /= d / 2) < 1)
      return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
  },
  easeInElastic : function(x, t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if(t == 0)
      return b;
    if((t /= d) == 1)
      return b + c;
    if(!p)
      p = d * .3;
    if(a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    } else
      var s = p / (2 * Math.PI) * Math.asin(c / a);
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  },
  easeOutElastic : function(x, t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if(t == 0)
      return b;
    if((t /= d) == 1)
      return b + c;
    if(!p)
      p = d * .3;
    if(a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    } else
      var s = p / (2 * Math.PI) * Math.asin(c / a);
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
  },
  easeInOutElastic : function(x, t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if(t == 0)
      return b;
    if((t /= d / 2) == 2)
      return b + c;
    if(!p)
      p = d * (.3 * 1.5);
    if(a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    } else
      var s = p / (2 * Math.PI) * Math.asin(c / a);
    if(t < 1)
      return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
  },
  easeInBack : function(x, t, b, c, d, s) {
    if(s == undefined)
      s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  },
  easeOutBack : function(x, t, b, c, d, s) {
    if(s == undefined)
      s = 1.70158;
    return c * (( t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  },
  easeInOutBack : function(x, t, b, c, d, s) {
    if(s == undefined)
      s = 1.70158;
    if((t /= d / 2) < 1)
      return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
    return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
  },
  easeInBounce : function(x, t, b, c, d) {
    return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
  },
  easeOutBounce : function(x, t, b, c, d) {
    if((t /= d) < (1 / 2.75)) {
      return c * (7.5625 * t * t) + b;
    } else if(t < (2 / 2.75)) {
      return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
    } else if(t < (2.5 / 2.75)) {
      return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
    } else {
      return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
    }
  },
  easeInOutBounce : function(x, t, b, c, d) {
    if(t < d / 2)
      return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
      return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
  }
});


/*-- loading --*/
+function ($) {
  'use strict';
  //全局加载按钮
  $(function () {
    $.loadingHide = function  () {
      blockHide($("#loading-wrap"));
    };
    $.loadingShow = function  () {
      blockShow($("#loading-wrap"),'none');
    };
    $.loadingHide();
  })
}(jQuery);


/** 
* extend tag切换
* 
* @package tagshow
* @author cuki13

  $('.mysp-tag').tagshow({
    objshow: $(this).find('.mysp-tagbox-section'),
    taglink: $(this).find('.mysp-taglink a'),
    current_class: 'active'
  });

*/
+(function($){  
  $.fn.tagshow = function (options) {
    var obj=$(this);

    var defualts = {
      objshow: obj.find('.c1'),     //展示的区域 
      taglink: obj.find('.c2 a'),     //点击链接
      current_class: 'current'      //当前的样式
    };

    var opts = $.extend({}, defualts, options);  

    var is_fade=false;   //判断效果是否在执行
    opts.taglink.click(function  (e) {
      
      
      if ($(this).hasClass(opts.current_class)) {
        return false;
      }else {
        if (is_fade) {
          return false;
        }
        var e=$(this).attr('rel');
        is_fade=true;
        
          opts.objshow.addClass('none').hide();
          $("#"+e).fadeIn(200).removeClass('none');
          is_fade=false;
        

        opts.taglink.removeClass(opts.current_class);
        $(this).addClass(opts.current_class);
      }
      return false;
    });

    
  };  
})(jQuery);