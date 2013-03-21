
/*
 * GET home page.
 */

var md = require('node-markdown').Markdown;

exports.index = function(req, res){
	res.render('index', {
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
						title: 'picpost gallery page'
					},
					content: md('An image gallery laid out using the [isotope](http://isotope.metafizzy.co/) plugin. This was an assignment for the [web dev program](http://discoverycommunitycollege.com/web-development/) at Discovery Community College.')
				},

				{
					title: 'TMePlz',
					image: {
						src: 'images/posts/tmeplz/login.png',
						title: 'TMePlz login page'
					},
					content: md('TMePlz is a fictional tshirt company. I got to do a really cool retro / psychadelic isometric design, as a Wordpress theme. The focus of the project, aside from graphic design, was the S2 Member plugin for handling user logins. I don\'t think we used any functionality that wasn\'t already available in the WP API. Of all the sites I have designed, this one is definitely my favorite graphic design. I hope I get to use it for a real project.')
				}
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
