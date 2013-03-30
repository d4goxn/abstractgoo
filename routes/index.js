
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
				},

				{
					title: 'Fullscreen Background Pages',
					image: {
						src: 'images/posts/hotlinked-bg-sketch/hotlinked-bg-sketch-small.png',
						title: 'Hotlinked Fullscreen Background'
					},
					excerpt: md('I\'ve always liked fullscreen background pages, but there is one problem: Load speed.'),
					content: md('I\'ve always liked fullscreen background pages, but there is one problem: Load speed. A nice high res photo could weigh in at a couple MB, which will really slow down a page load. The problem isn\'t usually on the users end however, most of us have 10Mb internet connections at home. Those of us with smartphones only browse on mobile while connected to WiFi, because 4G packets crawl like babies and cost more that their weight in gold.\n The bottleneck is really at the server\'s end of the pipe. Cheap web hosts don\'t usually have good upload bandwidth, and CDNs are expensive, unless your site is actually making good coin. The solution? Hotlinking. [Imgur](http://imgur.com) lets us do it free and simple, and from now on, I will be taking full advantage for my own projects. For a client that wants long term guarantees about uptime and simplicity, they should probably just pay for S3 or something like it.')
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
