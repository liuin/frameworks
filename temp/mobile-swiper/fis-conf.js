
//Step 1. 取消下面的注释开启simple插件，注意需要先进行插件安装 npm install -g fis-postpackager-simple
  fis.config.set('modules.postpackager', 'simple');

//通过pack设置干预自动合并结果，将公用资源合并成一个文件，更加利于页面间的共用

//Step 2. 取消下面的注释开启pack人工干预
   fis.config.set('pack', {
       'js/js.js': [
           '/lib/mod.js',
           '/modules/underscore/**.js',
           '/modules/backbone/**.js',
           '/modules/jquery/**.js',
           '/modules/vendor/**.js',
           '/modules/common/**.js'
      ]
   });
/*
//Step 3. 取消下面的注释可以开启simple对零散资源的自动合并
   fis.config.set('settings.postpackager.simple.autoCombine', true);


//Step 4. 取消下面的注释开启图片合并功能
   fis.config.set('roadmap.path', [{
      reg: '**.css',
      useSprite: true,
      url:'css'
   }]);
  fis.config.set('settings.spriter.csssprites.margin', 20);
*/
/*
fis.config.merge({
    roadmap : {
        domain : {
            //所有css文件添加http://localhost:8080作为域名
            '**.css' : 'http://localhost:8080'
        },
        path : [
            {
                //所有的js文件
                reg : '**.js',
                //发布到/static/js/xxx目录下
                release : 'js/js$&'
            },
            {
                //所有的css文件
                reg : '**.css',
                //发布到/static/css/xxx目录下
                release : 'css/css$&'
            },
            {
                //所有image目录下的.png，.gif文件
                reg : /^\/images\/(.*\.(?:png|gif))/i,
                //发布到/static/pic/xxx目录下
                release : 'images/$1'
            }
        ]
    }
});
*/