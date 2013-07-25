var fs = require('fs');

exports.show = function(request, response) {
	fs.readFile('./content/resume.md', 'utf-8', function(error, data) {
		if(error) {
			// TODO: link to public profiles.
			console.error('Failed to load resume.md:\n' + error);
		} else {
			console.log(data);
			response.render('resume', {
				path: '/resume',
				content: data
			});
		}
	});
};
