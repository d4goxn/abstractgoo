
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', {
		site: {
			title: 'abstractGOO'
		},
		page: {
			path: '/',
			posts: [
				{
					title: 'sample post',
					image: null,
					content: 'This is a sample post. Posts can have a title, an image and a description. If any of these parameters are untruthy, they will be omitted. Posts should be sorted before being passed to the template.'
				},
				{
					title: 'sample post',
					image: null,
					content: 'This is a sample post. Posts can have a title, an image and a description. If any of these parameters are untruthy, they will be omitted. Posts should be sorted before being passed to the template.'
				},
				{
					title: 'sample post',
					image: null,
					content: 'This is a sample post. Posts can have a title, an image and a description. If any of these parameters are untruthy, they will be omitted. Posts should be sorted before being passed to the template.'
				},
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
