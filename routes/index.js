// GET '/'

var md = require('node-markdown').Markdown;
var prioritizedKeysSorter = require('../prioritizedKeysSorter').sorter;

var messageModel = require('../models/message');
var posts = require('../posts').allSync();

// Sort posts based on prioritized, optional keys.
posts.sort(prioritizedKeysSorter(['order', 'date']));

// Parse markdown content.
posts.forEach(function(post) {
	if(post.excerpt) post.excerpt = md(post.excerpt);
	if(post.content) post.content = md(post.content);
});

function show(req, res) {
	messageModel.list(function(error, messages) {
		if(error) console.error(error);

		messages = messages || [];

		res.render('index', {
			path: '/',
			posts: posts,
			/*messages: [
				{
					title: 'Another job comes to an end',
					content: md('This was an odd one: Installing a Target store. It was interesting, but I won\'t be following the company around Canada; it\'s time to put the shiny new diploma to work.')
				},
				{
					title: 'School\'s out!',
					content: md('I just graduated from the [DCC webdev](http://discoverycommunitycollege.com/web-development/) program, and now I am looking for work.')
				},
				{
					title: 'wip',
					content: md('Work in progress, probably forever. [Embrace Perfection](https://soundcloud.com/mantisdubstep/mantis-insomnia)')
				}
			]*/
			messages: messages
		});
	});
};

exports.show = show;
