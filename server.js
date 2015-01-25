   var redis = require("redis"),
       sample = require('sample'),
       client = redis.createClient();

    client.on("error", function (err) {
        console.log("Error " + err);
    });

    var i = 0;
    function dummySentence(id){
        return '$KIPYO,' + id + ',SENTENCE' + (++i);
    }

    sample.init(client);
    
    var id = 'DEVICE1';
    setInterval(function(){
        sample.update(id, dummySentence(id));
        console.log(id + ' UPDATED');
    }, 1000);