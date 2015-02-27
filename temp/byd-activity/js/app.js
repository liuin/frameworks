requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: '../../asset',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        js: '../temp/byd-activity/js'
    }
});

// Start the main app logic.
requirejs(['jquery/jquery-1.11.2','js/js'],
function   ($,subjs) {
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
    alert($());
});