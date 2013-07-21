var model = require('../models/message');

exports.create = function(request, response) {
	request.sanitize('title').xss();
	request.sanitize('content').xss();

	var message = {
		name: encodeURIComponent(request.body.title),
		title: request.body.title,
		content: request.body.content,
		created: Date.now()
	};

	model.create(message, function(error, message) {
		if(error) {
			console.error(error);
			response.send(500, error);
			// TODO: send "409 Conflict" if a message exists by the same name already, instead of "500 Internal Server Error"
		} else {
			response.set('Location', 'message/' + message.name);
			response.send(201, message); // 201 Created: The client may request the newly created message.
		}
	});
}

exports.list = function(request, response) {
	model.list(function(error, messages) {
		if(error) {
			console.error(error);
			response.send(500, error);
		} else {
			response.format({
				'application/json': function() {
					var messageURIs = [];

					messages.forEach(function(message) {
						messageURIs.push('message/' + message.name);
					});

					response.send(messageURIs);
				}
			});
		}
	});
};

exports.read = function(request, response) {
	model.read(request.params.name, function(error, message) {
		if(error) {
			console.error(error);
			response.send(500, error);
		} else {
			if(!message) response.send(404);
			else {
				response.format({
					'application/json': function() {
						var messageURIs = [];

						messages.forEach(function(message) {
							messageURIs.push('message/' + message.name);
						});

						response.send(messageURIs);
					}
				});
			}
		}
	});
};

exports.edit = function(request, response) {
	model.read(request.params.name, function(error, message) {
		if(error) {
			console.error(error);
			response.send(500, error);
			// TODO: send "404 Not Found" if the message does not exist.
		} else response.render('editMessage', {message: message});
	});
};

exports.update = function(request, response) {
	request.sanitize('name').xss();
	request.sanitize('title').xss();
	request.sanitize('content').xss();

	var message = {
		name: request.params.name,
		title: request.body.title,
		content: request.body.content
	};

	model.update(message, function(error) {
		if(error) {
			console.error(error);
			response.send(500, error);
			// TODO: send "404 Not Found" if the message does not exist.
		} else response.send(205); // 205 Reset Content: The client should hide the form.
	});
};

exports.delete = function(request, response) {
	model.delete(request.params.name, function(error) {
		if(error) {
			console.error(error);
			response.send(500, error);
		} else response.send(204); // 204 No Content: The message was successfully deleted.
	});
};
