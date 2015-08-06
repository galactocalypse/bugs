#bugs

A simple issue tracking application for single-dev projects. Made mainly just for personal use to score a point on Joel Spolsky's 12-point list. Built with minimal code atop Sails.

There is no set configuration for any application, and there's zero setup besides database credentials.

Just visit /appname and get going.

An issue is described by with the following params:
	- context: the component of your application the issue relates to
	- type: FEATURE/ENHANCEMENT/BUG
	- status: unresolved/resolved/removed
	- title
	- description
The creation and updation dates are managed internally since Waterline has options to automate that.

