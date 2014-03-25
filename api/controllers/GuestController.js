/**
 * GuestController
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
  _config: {},
    create: function(req, res) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
	var formEmail = new Buffer(req.body.email).toString('ascii');	
	if (formEmail.length > 6 & re.test(formEmail)) { 
		console.log("User is authenticated");
	// here we get the session or something and pop it in mongo so we know who is in at the moment.
		res.redirect('vote');
	}
	else { 
		console.log("Bullshit logon detected"); // any maybe send the user someplace - or not
		 res.send('<p>You need an actual email account to proceed.</p>');
		// but we should really take people to a page explaining that this is not recorded and given to sigint or anything like that ... or something
	}
    },

    destroy: function(req, res) {
	console.log("User is logging out");
    }
  
};
