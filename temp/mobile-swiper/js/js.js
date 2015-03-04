var mySwiper = new Swiper('.swiper-container', {
  pagination: '.swiper-pagination',
  direction: 'vertical',
  //effect: 'scale',
  grabCursor: true,
  cube: {
    slideShadows: true,
    shadow: true,
    shadowOffset: 20,
    shadowScale: 0.94
  },
  coverflow: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true
  },
  onSlideChangeEnd: function (swp) {
  }
});

$("#vio").ckTransform("scale(1.2)");

$(".swiper-move-page").on('swipeUp', function (e) {
  if ($('.movel').is(":visible")) {
    mySwiper.slideNext();
  } else {
    $('.movel').show();
  }
})
.on('swipeDown', function () {
  if ($('.movel').is(":visible")) {
    $('.movel').hide();
  } else {
    mySwiper.slidePrev();
  }
})