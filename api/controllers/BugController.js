module.exports = {

	create: function(req, res, next) {
		var bug = {
			application: req.param('application'),
			title: req.param('title'),
			description: req.param('description') || req.param('title'),
			status: 'unresolved',
			type: req.param('type') || 'BUG',
			context: req.param('context') || req.param('application')
		};
		Bug.create(bug, function(err, bug){
			if (err) return next(err);
			return res.redirect(req.header('Referer'));
		});
	},
	update: function(req, res, next) {
		var bug = {
			id: req.param('id'),
			application: req.param('application'),
			title: req.param('title'),
			description: req.param('description') || req.param('title'),
			status: 'unresolved',
			type: req.param('type') || 'BUG',
			context: req.param('context') || req.param('application')
		};
		Bug.update({id: bug.id }, bug, function(err, bug){
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
	remove: function(req, res, next) {
		var bugid = req.param('bugid');
		var app = req.param('application');
		Bug.update({ application: app, id: bugid }, { status: 'removed'}, function(err, bug){
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
		var q = {};
		q.status = req.param('status') || ['resolved', 'unresolved'];
		var app = req.param('application');
		var type = req.param('type');
		var title = req.param('title');
		var description = req.param('description');
		var context = req.param('context');
		if (app) q.application = app;
		if (type) q.type = type;
		if (context) q.context = context;
		if (title) q.title = new RegExp('/' + title + '/' , 'gim');
		if (description) q.description =  new RegExp('/' + description + '/' , 'gim');
		Bug.find(q).sort({ status: -1, createdAt: -1 }).paginate({ page: page, limit : limit }).exec(function(err, bugs){
			if (err) return next(err);
			return res.view( { application: app, bugs: bugs, page: isNaN(page)?1:parseInt(page) });
		});
	}
};
