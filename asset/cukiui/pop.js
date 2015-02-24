/** 
* extend 弹出框
* @author cuki13
  $(obj).popbk();
  .popbk-wrap {position: fixed; top: 0; left: 0; bottom: 0; right: 0; overflow: auto; z-index:100;}
  .popbk {position: absolute; top:0; left:50%;}
  .popbk .close {position:absolute;right:0;top:0;}
  .fade.in { opacity: 1; }
  .fade{opacity: 0;-webkit-transition: opacity .15s linear;-o-transition: opacity .15s linear;transition: opacity .15s linear;}
  $("#popbk2").data('ck.pokbk').open();
  $("#popbk2").data('ck.pokbk').close();
*/

+(function($){
  var dataString = '[data-box="popbk"]';
  
  var Popbk = function  (el, number ,options) {
    this.el = $(el)
    this.id = number
    this.options = $.extend({}, this.defualts, options); 
  }
  
  Popbk.defualts = {};

  Popbk.prototype.build = function  (el) {
    
    var $this = $(el);
    $this.wrap('<div class="popbk-wrap-'+ this.id +' popbk-wrap fade" ></div>');
    $this.wrap('<div class="popbk-'+ this.id +' popbk" ></div>');

    var sClose = "<a class='close'><span class='none'>close</span></a>";
    sClose = $(sClose);
    sClose.insertAfter($this);
    var ml = $this.width()/2;     
    $this.parent(".popbk").css("margin-left",-ml);
    
    var wh = $this.height();
    if ($(window).height < wh) {
      $this.parent(".popbk").css("top","30px");
    }else {
      $this.parent(".popbk").css({
        "margin-top":-wh/2,
        "top":'50%'
      });
    }
    $this.parent(".popbk").find(".close").on('click',function  () {
      $this.data('ck.pokbk').close();
    })    
    $this.parents(".popbk-wrap").hide();
  }

  Popbk.prototype.open = function  () {
    this.close;
    var $this = this.el;
    if ($this.length) {
      $this.parents(".popbk-wrap").show();
      $this.parents(".popbk-wrap")[0].offsetWidth;
      $this.parents(".popbk-wrap").addClass("in");
    }
  }

  Popbk.prototype.close = function  () {
    var $this = this.el;
    var $parent = $this.parents(".popbk-wrap");
    if ($.support.transition && $parent.hasClass('fade')) {
      $parent.removeClass("in");
      $parent.one('bsTransitionEnd', function  () {
          $parent.hide();
        }).emulateTransitionEnd(150);
    }else {
      $parent.hide();
    }
  }

  function Plugin(option) {
    return this.each(function (n) {
      var $this   = $(this)
      var data    = $this.data('ck.pokbk')
      var number = $this.attr('id') || n 
      var options = typeof option == 'object' && option
      if (!data) $this.data('ck.pokbk', (data = new Popbk(this,number)))
      if (option == 'build') data.build($(this))
      else if (option) data.setState(option)
    })
  }

  $(document).on('ready.popbk', function  () {
    var $this = $(dataString);
    Plugin.call($this,'build');
  })
})(jQuery);