
/*
 * GET home page.
 */

var md = require('node-markdown').Markdown;

exports.index = function(req, res){
	res.render('index', {
		md: md,
		site: {
			title: 'abstractGOO'
		},
		page: {
			path: '/',
			posts: [
				// Posts can have a title, an image and a description. If any of these parameters are untruthy, they will be omitted in the template. Posts should be sorted before being passed to the template.
				{
					title: 'picpost',
					image: {
						src: 'images/posts/picpost/gallery-small.png',
						alt: 'picpost gallery page'
					},
					content: 'An image gallery laid out using the [isotope](http://isotope.metafizzy.co/) plugin. This was an assignment for the [web dev program](http://discoverycommunitycollege.com/web-development/) at Discovery Community College.'
				},
			],
			messages: [
				{
					title: 'wip',
					content: 'Work in progress.'
				}
			]
		},
	});
};
