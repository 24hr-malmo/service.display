requirejs.config({
    //urlArgs: "bust=" + 1, //(new Date()).getTime(),
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
    //var socket = io.connect('http://172.16.135.109');
    var socket = io.connect('http://localhost');
    socket.on('updatedList', function (data) {
        console.log(data);
        var output = "<h1>Available clients</h1>";
        for(var uuid in data){
            var obj = data[uuid];
            var d = obj.timestamp ? new Date(obj.timestamp) : new Date();
            //output += obj.net + "." + obj.name + " (" + obj.address + ":" + obj.port + ") last updated " + formatDate(d) + " doc : " + obj.doc + "<br/>";
            var s = {
                name : obj.net + "." + obj.name,
                nodeAddress : obj.address,
                updated : formatDate(d),
                doc : obj.doc,
                payload : obj.payload
            };
            output += doTTemplates.row(s);
        }
        document.getElementsByTagName("body")[0].innerHTML = output + "</div>";
    });

    function formatDate(date){
        return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }

});
