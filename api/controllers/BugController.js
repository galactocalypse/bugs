module.exports = {
	create: function(req, res, next) {
		var bug = {
			application: req.param('application'),
			title: req.param('title'),
			description: req.param('description') || req.param('title'),
			status: 'unresolved'
		};
		Bug.create(bug, function(err, bug){
			if (err) return next(err);
			return res.redirect(req.header('Referer'));
		});
	},
	resolve: function(req, res, next) {
		var bugid = req.param('bugid');
		var app = req.param('application');
		Bug.update({ application: app, id: bugid }, { status: 'resolved'}, function(err, bug){
			if (err) return next(err);
			return res.redirect(req.header('Referer'));
		});
	},
	reopen: function(req, res, next) {
		var bugid = req.param('bugid');
		var app = req.param('application');
		Bug.update({ application: app, id: bugid }, { status: 'unresolved'}, function(err, bug){
			if (err) return next(err);
			return res.redirect(req.header('Referer'));
		});
	},
	find: function(req, res, next) {
		var page = req.param('page') || 1;
		var limit = req.param('limit') || 20;
		var app = req.param('application');

		Bug.find({ application: app }).sort({ status: -1, createdAt: -1 }).paginate({ page: page, limit : limit }).exec(function(err, bugs){
			if (err) return next(err);
			return res.view( { application: app, bugs: bugs, page: isNaN(page)?1:parseInt(page) });
		})
	}
};
