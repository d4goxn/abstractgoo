
/**
 * Module dependencies.
 */

'use strict';

var express = require('express'),
	index = require('./routes/index'),
	pageRoute = require('./routes/page').page,
	message = require('./routes/message'),
	resume = require('./routes/resume'),
	expressValidator = require('express-validator'),
	http = require('http'),
	path = require('path'),
	md = require('node-markdown').Markdown;

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
	app.use(expressValidator());
	app.use(app.router);
	app.use(require('less-middleware')({ src: __dirname + '/public' }));
	app.use(express.static(path.join(__dirname, 'public')));

	app.locals({
		md: md,
		title: 'abstractGOO',
		path: ''
	});
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

if(app.get('env') == 'development') {
	app.get('/message/:name/edit', message.edit);
	app.post('/message', message.create);
	app.put('/message/:name', message.update);
}

app.get('/resume', resume.show);
app.get('/:page', pageRoute);
app.get('/', index.show);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
