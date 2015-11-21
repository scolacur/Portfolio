var router = require('express').Router();

// var keys = require('../../../env/development');
var keys = require('../../../env');
var mandrill = require('mandrill-api/mandrill');
var mandrillClient = new mandrill.Mandrill(keys.MANDRILL);

module.exports = router;

var createMessage = function createMessage(data) {
	var message = {
		"html": data.message,
		"subject": data.name + " saw your portfolio and sent you a message!",
		"from_email": data.email,
		"from_name": data.name,
		"to": [{
			"email": "stephencolacurcio@gmail.com",
			"name": "Stephen Colacurcio"
		}],
		"important": false,
		"track_opens": true,
		"auto_html": false,
		"preserve_recipients": true,
		"merge": false
	};
	return message;
};

router.post('/', function(req,res,next){
	var message = createMessage(req.body);
	var async = false;
	var ip_pool = "Main Pool";

	// mandrillClient.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function() {
		// res.status(200).json(true);
	// }, function(e) {
	// 	console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
		res.json(false);
	// });
});
