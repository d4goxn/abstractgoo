
/**
 * Module dependencies.
 */

'use strict';

var express = require('express'),
	routes = require('./routes'),
	pageRoute = require('./routes/page').page,
	mongoTest = require('./routes/mongoTest'),
	http = require('http'),
	path = require('path');

function generateMongoUrl(config) {

	config.hostname = (config.hostname || 'localhost');
	config.port = (config.port || 27017);
	config.db = (config.db || 'abstractgoo');

	if(config.username && config.password)
		return 'mongodb://'
			+ config.username + ':'
			+ config.password + '@'
			+ config.host + ':'
			+ config.port + '/'
			+ config.db;
	else
		return 'mongodb://'
			+ config.hostname + ':'
			+ config.port + '/'
			+ config.db;
}

if(process.env.VCAP_SERVICES) {
	var env = process.env.VCAP_SERVICES;
	var mongo = env['mongodb-1.8'][0]['credentials'];
} else {
	var mongo = {
		hostname: "localhost",
		port: 27017,
		username: "",
		password: "",
		name: "",
		db: "abstractgoo"
	}
}

var mongoUrl = generateMongoUrl(mongo);

var app = express();

app.configure(function() {

	app.set('port', process.env.PORT || 3000);
	app.set('host', process.env.host || 'localhost');
	app.set('mongoUrl', mongoUrl);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');

	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(require('less-middleware')({ src: __dirname + '/public' }));
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/mongo-test', mongoTest.show);
app.get('/:page', pageRoute);
app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
