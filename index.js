var server = require('ws').Server;
var s = new server({port:5001});

s.on('connection',function(ws){
    ws.on('message',function(message){

        message = JSON.parse(message);
        if (message.type=="name"){
            ws.personName=message.data;
            return;
        }
        console.log("Received: "+message.data);
        // console.log(s.clients);
         s.clients.forEach(function (client){
            if (client!=ws)            //ie dont send the same message to the same client 
            //send it to all rest other clients
                client.send(JSON.stringify({
                    name : ws.personName,
                    data : message.data
                }));
        });
        //ws.send(message);
    });
    ws.on('close',function(){
        console.log('Lost a Client');
    });
    console.log("one more client Connected");
});