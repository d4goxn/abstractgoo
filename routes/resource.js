
/*
 * GET a page for a resource or GET the index.
 */

var fs = require('fs');
var md = require('node-markdown').Markdown;

var defaults = {
	title: 'codes and internets and the goo between them',
	resourceName: 'index',
	template: 'index',
	filename: 'index.md'
};

exports.resource = function(request, response){
	// Use the resource named in the GET request if specified, otherwise render the home page according to defaults.
	var resourceName = request.params.resource? request.params.resource: defaults.resourceName;

	// get the resource's meta info
	var meta;
	try {
		meta = JSON.parse(fs.readFileSync('resources/' + resourceName + '.json'));
	} catch(error) {
		console.log(error);
		response.send(404);
		return;
	}

	var filename = meta.filename? meta.filename: defaults.filename;
	
	// read, and if necessary parse, the resource's content
	// throws ENOENT if the file doesn't exist
	var content = fs.readFileSync('content/' + filename);
	if(filename.match(/.md$/i)) content = md(content);

	// render the resource using it's template and the other metadata
	var template = meta.template? meta.template: defaults.template;
	response.render(template, {
		title: (meta.title? meta.title: defaults.title) + ' - abstractGOO',
		content: content
	});
};
