// GET '/'

function page(req, res) {
	var page = req.params.page;
	res.render(page, {
		path: page
	});
};

exports.page = page;
