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