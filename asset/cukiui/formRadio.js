/*-- 表单radio [data-form="radio"] --*/
+function ($) {
  'use strict';
  var formSting = '[data-form="radio"]';
  
  var Radio = function  (number) {
    this.id = number;
  }

  Radio.prototype.build = function  (el) {
    var setCss = {
      "opacity":"0",
      "position":"absolute"
    }
    var $this = $(el);
    $this.css(setCss);
    var idiv = $('<i></i>');
    idiv.insertBefore($this);
    $this.parent("label").css("position","relative");
    $this.on("change.resize",function  () {      
        $(this).parent("label").addClass("ck-select").siblings("label").removeClass("ck-select");     
    });
  }

  function Plugin(option) {
    return this.each(function (n) {
      var $this   = $(this)
      var number = $this.attr('id') || n 
      var data    = $this.data('ck.select')
      var options = typeof option == 'object' && option
      if (!data) $this.data('ck.select', (data = new Radio(number)))
      if (option == 'build') data.build($(this))
      else if (option) data.setState(option)
    })
  }

  $(document).on('ready.ck.radio', function (e) {
    var $this = $(formSting);
    Plugin.call($this,'build');
  })
  
}(jQuery); 