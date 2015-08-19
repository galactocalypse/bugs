#bugs

A simple issue tracking application for single-dev projects. Made mainly just for personal use to score a point on Joel Spolsky's 12-point list. Built with minimal code atop Sails.

##Getting started

There is no set configuration for any application, and there's zero setup besides database credentials.
Add the database credentials in `config/connections.js` or `config/local.js` and ensure that the database server is running.

The app uses port 9998 by default. You may specify a different port in `config/local.js` or `config/env/production.js`.

Visit `/appname` and get going.

An issue is described by with the following params:

- context: the component of your application the issue relates to
- type: FEATURE/ENHANCEMENT/BUG
- status: unresolved/resolved/removed
- title
- description

The creation and updation dates are managed internally since Waterline has options to automate that.

