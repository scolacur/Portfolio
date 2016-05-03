var router = require('express').Router();
var keys = require('../../../env');

var api_key = keys.MAILGUN;
var domain = "colacurc.io";
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
module.exports = router;

router.post('/', function(req,res,next){
	var message = {
		"html": req.body.message,
		"subject": req.body.name + " saw your portfolio and sent you a message!",
		"from": req.body.email,
		"to": "stephencolacurcio@gmail.com"
	};

	mailgun.messages().send(message, function(e, body){
		if (e){
			console.log('A mailgun error occurred: ' + e.name + ' - ' + e.message);
			res.json(false);
		} else {
			res.status(200).json(true);
		}
	})
});
