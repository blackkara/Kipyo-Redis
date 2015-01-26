# Kipyo-Redis

To simulate real-time tracking operations like storing temporarily and monitoring. A tracking device has sending period the location data to server, means device sends latitude, longitude, speed every N seconds periodically <br />

Basic and simple scenario is, server listens incoming requests and saves to database. But with this scenario, every request means a database operation. Lets assume 1000 devices send data to server every 3 seconds, so means 1000 save operations will be performed in 3 seconds, really bad <br />

For this solution, using redis as temporarily storage might decrease the db operations. Firstly we have to change the scenario, server accepts requests from devices then stores to redis, not saves to database directly <br />

While devices are sending data to server every N seconds periodically, the server must be collecting all data from redis and saving to db (bulk operation)
