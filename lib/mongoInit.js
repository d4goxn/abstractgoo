var mongoose = require('mongoose');

module.exports = function() {
	// Create a URL to the mongo db, using the env vars provided by AppFog if they are available.

	if(process.env.VCAP_SERVICES) {
		var env = process.env.VCAP_SERVICES;
		var config = env['mongodb-1.8'][0]['credentials'];
	} else {
		var config = {
			hostname: "localhost",
			port: 27017,
			username: "",
			password: "",
			name: "",
			db: "abstractgoo"
		}
	}

	config.hostname = (config.hostname || 'localhost');
	config.port = (config.port || 27017);
	config.db = (config.db || 'abstractgoo');

	if(config.username && config.password)
		var mongoUrl = 'mongodb://'
			+ config.username + ':'
			+ config.password + '@'
			+ config.host + ':'
			+ config.port + '/'
			+ config.db;
	else
		var mongoUrl = 'mongodb://'
			+ config.hostname + ':'
			+ config.port + '/'
			+ config.db;

	// Create a single, permanent connection to the database.

	mongoose.connect(mongoUrl);
};
