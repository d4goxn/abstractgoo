// GET '/'

var md = require('node-markdown').Markdown;
var fs = require('fs');
var path = require('path');

function page(req, res) {
	var page = req.params.page;
	res.render(page, {
		site: {
			title: 'abstractGOO'
		},
		page: {
			path: page
		}
	});
};

exports.page = page;
