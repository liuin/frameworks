requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: '../../asset',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
      jquery:'jquery/jquery-1.11.2',
      blockShowHide:'cukiui/blockShowHide',
      transition:'cukiui/transition',
      resload:'cukiui/resload',
    },
    shim: {
      "blockShowHide" : {
        deps : ["jquery"]
      },
      "transition":{
        deps : ["jquery"]
      },
      "resload" : {
        deps : ["jquery"]
      }
    }
});

// Start the main app logic.
requirejs(['jquery','transition','blockShowHide','resload'],
function   ($) {
  $.blockHide($("#loading-wrap"));
});