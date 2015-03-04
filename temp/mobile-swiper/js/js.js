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
    if (mySwiper.activeIndex == 2) {
      mySwiper.params.onlyExternal = true;
    } else {
      mySwiper.params.onlyExternal = false;
    }

  }
});


$(".swiper-move-page")
  .on('swipeUp', function (e) {
    if ($('#flipper').hasClass("flip")) {
      mySwiper.slideNext();
    } else {
      $('#flipper').addClass('flip');
    }

  })
  .on('swipeDown', function (e) {
    if ($('#flipper').hasClass("flip")) {
      $('#flipper').removeClass('flip');
    }else{
      mySwiper.slidePrev();
    }

  })