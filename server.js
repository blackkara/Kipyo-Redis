   var redis = require("redis"),
        client = redis.createClient();

    client.on("error", function (err) {
        console.log("Error " + err);
    });
    

    var Device001 = {
       lastSentence: '$KIPYO,Device001,XXXX1',
       logs: [
            '$KIPYO,Device001,XXXX1',
            '$KIPYO,Device001,XXXX2',
            '$KIPYO,Device001,XXXX3',
            '$KIPYO,Device001,XXXX4',
            '$KIPYO,Device001,XXXX5'
        ]
    };

    var Device002 = {
       lastSentence: '$KIPYO,Device002,YYYY1',
       logs: [
            '$KIPYO,Device002,YYYY1',
            '$KIPYO,Device002,YYYY2',
            '$KIPYO,Device002,YYYY3',
            '$KIPYO,Device002,YYYY4',
            '$KIPYO,Device002,YYYY5'
        ]
    };
    
    
    client.hget('Device003', function(err, result){
        if(err) throw err;
        console.log(result);
    });

    function tracking(id, sentence, cb){
        client.hget(id, function(err, result){
            if(err) throw err;
            
            var device = JSON.parse(result);
            device.logs.push(sentence);
            
            client.hset('realtime', id,  JSON.stringify(device), redis.print);
        });
    }

 /*setTimeout(function(){
        tracking('Device001', '$KIPYO,Device001,XXXX1');
    
    }, 5000);*/

