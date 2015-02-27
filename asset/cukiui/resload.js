/**
 * extend 无刷新加载
 *
 * @package jquery
 * @author cuki13
 */
+(function ($) {
  'use strict';
  var ajax = null;
  var urlLink = function (el) {
    this.$el = $(el) || null;
    this.url = $(el).attr("href") || null;
  }
  urlLink.prototype.jump = function () {
    var $this = this;
    $.ajax({
      type: "POST",
      url: $this.url,
      dataType: 'html',
      success: function (data) {
        $.blockHide($("#loading-wrap"));
        var data = '<div>' + data + '</div>';
        var data = $(data);
        var gData = data.find('[data-ajax="content"]');
        var gTitle = data.find('[data-ajax="title"]');

        var cuurentConent = $('[data-ajax="content"]');
        $("[data-ajax='wrap']").append(gData);
        if ($.support.transition) {
          gData.hide();
          cuurentConent.addClass("out").one('bsTransitionEnd', function () {
            $(this).removeClass("out").remove();

          }).emulateTransitionEnd(320);

          gData.show();
          //gData[0].offsetWidth;
          gData.addClass('in').one('bsTransitionEnd', function () {
            $(this).removeClass("in");
          }).emulateTransitionEnd(320);

        }


        /*if ($.support.transition) {
         $(".container").addClass("out").one('bsTransitionEnd', function () {
         $(".container").removeClass("out");
         $(".container").replaceWith(container);

         container.addClass("in");
         setTimeout(
         function () {
         container.removeClass("in");
         }, 320);
         }).emulateTransitionEnd(320);
         } else {
         $(".container").replaceWith(container);
         }*/

        document.title = gTitle.html();
        var state = {
          url: $this.url,
          title: document.title,
          getHtml: gData
        };

        //history.pushState(state, gTitle, $this.url);
        ajax = true;
      },
      error: function () {
        alert('很抱歉加载失败，请重新刷新页面');
        $.blockHide($("#loading-wrap"));
      },
      beforeSend: function () {
        $.blockShow($("#loading-wrap"));
      }
    });
  }

  $(document).ready(function () {
    urlLink.currentState = {
      url: document.location.href,
      title: document.title,
      getHtml: $(".container")[0].outerHTML
    }

    $("body").on('click', '[data-url="true"]', function (e) {
      e.preventDefault();
      $(this).data("url", new urlLink(this));
      $(this).data("url").jump();
    })
  })


  window.addEventListener("popstate", function (event) {
    if (event && event.state) {
      var gcontent = $(event.state.getHtml);
      /*$(".container").replaceWith(gcontent);
       $(".container").removeClass("out");*/
      document.title = event.state.title;
    } else {
      if (ajax == null) {
        return false;
      }
      document.title = urlLink.currentState.title;
      /*$(".container").replaceWith(urlLink.currentState.getHtml);
       $(".container").removeClass("out");*/
    }
  });

  $.pUrl = function (url) {
    var blink = new urlLink();
    blink.url = url;
    blink.jump();
  }

})(jQuery);