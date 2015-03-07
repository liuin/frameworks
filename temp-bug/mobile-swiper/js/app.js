requirejs.config({
  //By default load any module IDs from js/lib
  baseUrl: '../../asset',
  //except, if the module ID starts with "app",
  //load it from the js/app directory. paths
  //config is relative to the baseUrl, and
  //never includes a ".js" extension since
  //the paths config could be for a directory.
  paths: {
    jquery: 'jquery/jquery-1.11.2',
    swiper: 'swiper/swiper.jquery',
    tansitionSupport: 'cukiui/tansitionSupport',
    moblieTouch: 'cukiui/moblieTouch'
  },
  shim: {
    "tansitionSupport": {
      deps: ["jquery"]
    },
    "swiper": {
      deps: ["jquery"]
    },
    "moblieTouch": {
      deps: ["jquery"]
    }
  }
});

// Start the main app logic.
requirejs(['jquery', 'swiper', 'tansitionSupport', 'moblieTouch'],
    function ($, Swiper, tansitionSupport, moblieTouch) {

      var mySwiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        direction: 'vertical',
        effect: 'scale',
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
          if (mySwiper.activeIndex == 1) {
            mySwiper.params.onlyExternal = true;
          } else {
            mySwiper.params.onlyExternal = false;
          }

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

    });