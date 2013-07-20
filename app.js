
/**
 * Module dependencies.
 */

'use strict';

var express = require('express'),
	routes = require('./routes'),
	pageRoute = require('./routes/page').page,
	http = require('http'),
	path = require('path');

require('./lib/mongoInit')();

var app = express();

app.configure(function() {

	app.set('port', process.env.PORT || 3000);
	app.set('host', process.env.host || 'localhost');
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

app.get('/:page', pageRoute);
app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
