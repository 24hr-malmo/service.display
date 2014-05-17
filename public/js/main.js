requirejs.config({
    baseUrl : "/js/",
    waitSeconds: 200,
    paths: {
        // libs
        doT: 'lib/doT'
    },
    map: {
        '*': {
            'css': 'lib/require-css/css'
        }
    }
});

require(['domReady!', "doTTemplates"], function(_, doTTemplates){
    var socket = io.connect(window.location.origin);
    socket.on('updatedList', function (data) {
        console.log(data);

        var output = "<h1>Available clients</h1>";

        for(var uuid in data){
            var obj = data[uuid];
            var d = obj.timestamp ? new Date(obj.timestamp) : new Date();
            output += doTTemplates.row({
                name : obj.net + "." + obj.name,
                nodeAddress : obj.address,
                updated : formatDate(d),
                doc : obj.doc,
                payload : obj.payload
            });
        }

        document.getElementsByTagName("body")[0].innerHTML = output;

    });

    function formatDate(date){
        return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }

});
