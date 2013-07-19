var mongo = require('mongodb');

exports.show = function(request, response) {
	response.send('Testing Mongo integration\n');
}
