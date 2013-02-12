
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(require('less-middleware')({ src: __dirname + '/public' }));
	app.use(express.static(path.join(__dirname, 'public')));

	// These parameters are available to templates as the `site` object.
	app.set('siteParams', {
		title: 'abstractGOO'
	});

	// Parameters for rendering the index page. Routers use a resource object to build the `page` object for the template that renders the page.
	app.set('defaultResource', {
		title: 'codes and internets and the goo between them',
		resourceName: 'index',
		template: 'index',
		filename: 'index.md'
	});
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', routes.resource);
app.get('/:resource', routes.resource);
// app.post('/:resource', routes.postResource);
// app.delete('/:resource', routes.deleteResource);

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});
