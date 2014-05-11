define(function(){
    requirejs.config({
        //urlArgs: "bust=" + 1, //(new Date()).getTime(),
        baseUrl : "/js/",
        waitSeconds: 200,
        paths: {
            // plugins
            //text: 'lib/text',

            // libs
            dot: 'lib/doT'
        },
        map: {
            '*': {
                'css': 'lib/require-css/css',
            }
        }
    });
});
