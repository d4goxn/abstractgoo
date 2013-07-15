// GET '/whats-up'

'use strict';

var async = require('async');
var request = require('request');
var FeedParser = require('feedparser');

var locals = {
	githubEvents: []
};

function processGithubEvents(finish) {
	request({
		url: 'http://github.com/d4goxn.atom',
		headers: {
			'Accept': 'application/atom+xml'
		}
	})
	.pipe(new FeedParser())
	.on('readable', function() {
		var stream = this, readable;
		
		while(readable = stream.read()) {
			console.log(readable);
			locals.githubEvents.push({
				title: readable.title,
				message: readable.description
			});
		}
	})
	.on('end', function() {
		finish();
	});
}

function show(request, response) {
	async.parallel(
		[
			processGithubEvents
		], function() {
			response.render('whats-up', {
				site: {
					title: 'abstractGOO'
				},
				page: {
					githubEvents: locals.githubEvents
				}
			});
		}
	);
}

exports.show = show;
