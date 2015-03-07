/** 
* extend 向上每隔几秒滚动
* @author cuki13
  $(obj).scollUp({
    speed:3000,
    scolldiv:'.scolldiv'
  })
*/
+(function($){
  $.fn.scollUp = function (options) {
    var obj=$(this);
    var defualts = {
      scolldiv:'.scolldiv'
    };
    var opts = $.extend({}, defualts, options);  

    var MyMar = 0;
    var scolldiv = obj.find(opts.scolldiv);
    var objclone = obj.find(opts.scolldiv).clone();
    objclone.appendTo(obj);
    function Marquee() {
       if(objclone.offset().top - obj.offset().top <=0){
          obj.scrollTop(0);
         }else{
           if ((obj.scrollTop())%(objclone.height()/2) == 0) {
            clearInterval(MyMar);
            setTimeout(
              function(){
                clearInterval(MyMar);
                MyMar=setInterval(Marquee,speed);
              }, 3000)

           }
            var k = obj.scrollTop();
            obj.scrollTop(k+1);
         }
    }

     MyMar=setInterval(Marquee,speed);

     obj.hover(function  () {
      clearInterval(MyMar);
     },function  () {
      clearInterval(MyMar);
      MyMar=setInterval(Marquee,speed);
     })
    
  };  
})(jQuery);