// GET '/whats-up'

'use strict';

var http = require('http');
var async = require('async');

var locals = {
	githubEvents: []
};

function processGithubEvents(finish) {
	var options = {
		hostname: 'api.github.com',
		path: '/users/d4goxn/events/public',
		headers: {
			'accept': 'application/json'
		}
	};

	var body = '';

	http.get(options, function(response) {
		response.on('data', function(chunk) {
			body += chunk;
		});

		response.on('end', function() {
			console.log(response.headers['x-ratelimit-remaining']);
			JSON.parse(body).forEach(function(event) {
				var messages = [];

				if(event.payload.commits) {
					event.payload.commits.forEach(function(commit) {
						messages.push(commit.message);
					});
				}

				locals.githubEvents.push({
					type: event.type,
					subject: event.repo.name.split('/').pop(),
					messages: messages
				});
			});

			finish(locals);
		});
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
