var config = require("./config");
var connect = require('connect');
var app = require('http').createServer(connect().use(connect.static(__dirname + '/public')));
var io = require('socket.io').listen(app);
var fs = require('fs');
var zonar = require("zonar");
var zmq = require('zmq');
var zonarHelper = require("service.helper");

//zonarHelper.setLog(true);
var socketioClients = [];

// zonar
var node = zonar.create({
    name : config.serviceName,
    net : config.serviceNet
});

var nodes = null;

function updateNodesList(){
    nodes = node.getList();
    console.log("nodelist update");

    for(var n in nodes){
        populateDoc(nodes[n]);
    }

    io.sockets.emit("updatedList", nodes);
}

function populateDoc(remoteNode){
    zonarHelper.getService(node, remoteNode.name + ".doc", function(err, request){
        if (err){
            console.log(err);
            return;
        }

        request.send("");

        request.on("message", function(msg){
            try {
                var data = JSON.parse(msg.toString("utf8"));
                remoteNode.doc = data.doc;
            } catch (e) {
                // invalid data
                console.log("invalid data " + msg.toString());
            }
            console.log(msg.toString("utf8"));
            request.close();
        });

    });
}

node.on('dropped', updateNodesList);
node.on('found', updateNodesList);
node.on('heartbeat', updateNodesList);

// handle C-c
zonarHelper.handleInterrupt(node);

// start broadcasting
node.start();

// webserver
app.listen(config.servicePort);
console.log(config.servicePort);

io.sockets.on('connection', function (socket) {
    io.sockets.emit('updatedList', node.getList());
});

