/** 
* extend 刮刮看代码
*/
  function guagua() {
  //$("#canvas1").remove();
  //$(".content-box").append('<canvas id="canvas1" style=" background-repeat:no-repeat; background-position:center center;" />');
(function(bodyStyle) {
bodyStyle.mozUserSelect = 'none';
bodyStyle.webkitUserSelect = 'none';

var gImgbg = 'img/finance-big1.jpg'; //覆盖图片
var gImg = 'img/banner1.jpg'; //背景图片

var img = new Image();

var posleft = $('#canvas1').offset().left;
var posRight = $('#canvas1').offset().top;

var canvas = document.getElementById('canvas1');
var canvasbg = document.getElementById('canvasbg');

img.addEventListener('load', function(e) {

var ctx;
var ctxbg;
var w = 640,
h = 320;
var offsetX = posleft,
offsetY = posRight;


var mousedown = false;

function getTransparentPercent(ctx, width, height) {
  var imgData = ctx.getImageData(0, 0, width, height),
    pixles = imgData.data,
    transPixs = [];
  for (var i = 0, j = pixles.length; i < j; i += 4) {
    var a = pixles[i + 3];
    if (a < 128) {
      transPixs.push(i);
    }
  }
  rate=(transPixs.length / (pixles.length / 4) * 100).toFixed(2);
   return rate
}


function layer(ctx) {
  var img1 = new Image();
  img1.onload = function() {    
    ctx.drawImage(img1, 0, 0, w, h);
    ctxbg.drawImage(img, (w-img.width)/2, (h-img.height)/2, img.width, img.height);    
    //canvas.style.backgroundImage='url('+img.src+')';
    ctx.globalCompositeOperation = 'destination-out';
  };
  img1.src = gImgbg;
  ctx.fillRect(0, 0, w, h);
}

function eventDown(e){
  e.preventDefault();
  mousedown=true;
}

function eventUp(e){
  e.preventDefault();
  mousedown=false;
}

function eventMove(e){
  e.preventDefault();
  if(mousedown) {
  if(e.changedTouches){
    e=e.changedTouches[e.changedTouches.length-1];
  }
  var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0,
  y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY || 0;

  with(ctx) {
    beginPath();
    var radgrad = ctx.createRadialGradient(x, y, 0, x, y, 30);
    radgrad.addColorStop(0, 'rgba(0,0,0,1)');
    radgrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = radgrad;

    arc(x, y, 30, 0, Math.PI * 2);
    fill();

    //挂卡到百分比
   
    if (getTransparentPercent(ctx,w,h)>90) {
      
    }

    }
  }
}


canvas.width=w;
canvasbg.width=w;
canvas.height=h;
canvasbg.height=h;

ctx=canvas.getContext('2d');
ctxbg=canvasbg.getContext('2d');
ctx.fillStyle='transparent';
ctx.fillRect(0, 0, w, h);
layer(ctx);

canvas.addEventListener('touchstart', eventDown);
canvas.addEventListener('touchend', eventUp);
canvas.addEventListener('touchmove', eventMove);
canvas.addEventListener('mousedown', eventDown);
canvas.addEventListener('mouseup', eventUp);
canvas.addEventListener('mousemove', eventMove);
});

img.src = gImg;

}) (document.body.style);
}


guagua();