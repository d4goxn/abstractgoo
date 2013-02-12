
/*
 * GET a page for a resource or GET the index.
 */

var fs = require('fs');
var md = require('node-markdown').Markdown;

exports.resource = function(request, response){
	// Use the resource named in the GET request if specified, otherwise render the home page according to defaults.
	var defaults = request.app.get('defaultResource');
	var resourceName;
	resourceName = request.params.resource? request.params.resource: defaults.resourceName;

	// get the resource's meta info
	var meta;
	try {
		meta = JSON.parse(fs.readFileSync('resources/' + resourceName + '.json'));
	} catch(error) {
		// If the resource meta file doesn't exist, then the resource officially doesn't exist.
		console.log(error);
		response.send(404);
		return;
	}

	var filename = meta.filename? meta.filename: defaults.filename;
	
	// Read, and if necessary parse, the resource's content.
	// Throws ENOENT if the file doesn't exist.
	var content = fs.readFileSync('content/' + filename).toString();
	if(filename.match(/.md$/)) content = md(content);

	// Render the resource using it's template and the other metadata.
	var template = meta.template? meta.template: defaults.template;
	response.render(template, {
		page: {
			title: (meta.title? meta.title: defaults.title),
			content: content,
		},
		site: request.app.get('siteParams')
	});
};
