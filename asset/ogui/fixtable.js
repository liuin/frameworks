/*固定表格
fixhead($(".fixhead"));
<style type="text/css">
  .fixhead-box {width:800px; position:relative; border:1px solid #000;
  }
  .fixhead {width:800px;}
  .fixhead td,.fixhead th{border-bottom:1px solid #000;border-left:1px solid #000;}

  .fixhead-ct {height:170px; overflow:auto; overflow-x:hidden;}
  .fixhead-ct .trhd {visibility:hidden; display:none;}
  .fixhead-hd {height:22px; overflow:hidden; background:#fff; position:relative;}
</style>
*/
function fixhead(obj) {
  var clonetb = '';
  obj.find("th").each(function (n) {
      $(this).outerWidth($(this).outerWidth());
    obj.find("tr:eq(1) td:eq("+n+")").outerWidth($(this).outerWidth());
    if (n == obj.find("th").length-1) {
      clonetb = obj.clone();      
      obj.wrap('<div class="fixhead-box"></div>');
      obj.wrap('<div class="fixhead-ct"></div>');
            
      clonetb.insertBefore(obj.parent());
      clonetb.wrap('<div class="fixhead-hd"></div>');
      obj.find("tr").last().find("td").css("border-bottom","0");
    }
  })      
}