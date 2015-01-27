
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
    
} else {
  
  /*var redis = require("redis");
  var client = redis.createClient();*/
    
  var MAX_PERIOD = 2000;
  var MIN_PERIOD = 1000;
  var HASH_KEY = 'REALTIME';
  var SENTENCE = '';
    
  var DEVICE_ID = 'DEVICE' + cluster.worker.id;
  var DEVICE_PERIOD = Math.floor(Math.random() * (MAX_PERIOD - MIN_PERIOD)) + MIN_PERIOD;
  console.log('DEVICE: ' + DEVICE_ID + ', PERIOD: ' + DEVICE_PERIOD + 'ms');

  var i = 0;
  setInterval(function(){
      
      SENTENCE = '$KIPYO,' + DEVICE_ID + ',PROTOCOL:SENTENCE' + (++i);
      console.log(SENTENCE);
      sendToRedis(HASH_KEY, DEVICE_ID, SENTENCE);
      
  }, DEVICE_PERIOD);
}


function sendToRedis(hashKey, deviceId, sen){
    
    client.hget(hashKey, deviceId, function(err, result){
            if(err) throw err;
            
            var device;
            
            if(!result){
                device = { sentence: sentence, logs: [sen]};
            } else {
                device = JSON.parse(result);
                device.sentence = sentence;
                device.logs.push(sentence);
            }
            
            client.hset(hashKey, deviceId, JSON.stringify(device), client.print);
        });
}
