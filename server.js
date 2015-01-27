   var redis = require("redis"),
       sample = require('sample'),
       client = redis.createClient();

    client.on("error", function (err) {
        console.log("Error " + err);
    });


    sample.init(client);


    setInterval(function(){
        sample.simulateTracking();
    }, 1500);


    