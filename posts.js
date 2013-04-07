var fs = require('fs');
var path = require('path');

function parsePostFiles(filenames) {
	filenames = filenames.map(function(filename) {
		return path.join('posts', filename);
	});

	// Ignore subdirectories.
	filenames.filter(function(filename) {
		return !fs.statSync(filename).isDirectory();
	});

	var posts = filenames.map(function(filename) {
		try {
			return JSON.parse(fs.readFileSync(filename));
		} catch(error) {
			error.message += '\nwhile parsing "' + filename + '".';
			throw error;
		}
	});

	return posts;
}

// Return an array of all posts in an arbitrary order.
function allSync(after) {
	var filenames = fs.readdirSync('posts');
	return (parsePostFiles(filenames));
}

function all(after) {
	fs.readdir('posts', function(error, filenames) {
		if(error) throw new Error(error);
		after(parsePostFiles(filenames));
	});
}

exports.all = all;
exports.allSync = allSync;
