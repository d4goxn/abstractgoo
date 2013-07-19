// GET '/'

function page(req, res) {
	var page = req.params.page;
	res.render(page, {
		site: {
			title: 'abstractGOO'
		},
		page: {
			path: page
		}
	});
};

exports.page = page;
