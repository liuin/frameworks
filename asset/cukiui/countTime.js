//倒计时
jQuery(document).ready(function($) {
  
  var servertime = new Date("2015/01/22 23:08:28").getTime();
  var endtime = new Date("2015/01/21 17:42:00").getTime();

  var sbtime = (endtime - servertime) / 1e3;		
  var temp = "";
  var timese = "";

  if (sbtime <= 0) {
    temp = '<li class="cl1"><span style="color:#999;">00</span><span class="xq-zz none">天</span></li><li class="cl2" ><span style="color:#999;">00</span><span class="xq-zz none">时</span></li><li class="cl3"><span style="color:#999;">00</span><span class="xq-zz none">分</span></li><li class="cl4"><span style="color:#999;">00</span><span class="xq-zz none">秒</span></li>';
    $("#timener ul").html(temp);
  } else {
    timese = setInterval(function() {
      timmer(sbtime);
    }, 1e3);
  }

  function timmer(getsc) {
    if (getsc > 0) {
      var second = Math.floor(getsc % 60);
      var minite = Math.floor(getsc / 60 % 60);
      var hour = Math.floor(getsc / 3600 % 24);
      var day = Math.floor(getsc / 3600 / 24);
      temp = '<li class="cl1"><span>' + day + '</span><span class="xq-zz none">天</span></li><li class="cl2"><span>' + hour + '</span><span class="xq-zz none">时</span></li><li class="cl3"><span>' + minite + '</span><span class="xq-zz none">分</span></li><li class="cl4"><span>' + second + '</span><span class="xq-zz none">秒</span></li>';
      $("#timener ul").html(temp);
      sbtime--;
    } else {
      window.clearInterval(timese);
      location.reload();
    }
  }
})