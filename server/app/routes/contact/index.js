var router = require('express').Router();
var mandrill = require('mandrill-api/mandrill');
var mandrillClient = new mandrill.Mandrill('TczSuCWNxN6aaG4g-rv0Rw');

module.exports = router;

var sendEmail = function sendEmail(data) {
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

  var async = false;
  var ip_pool = "Main Pool";
  mandrillClient.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function() {
	  success = true;
  }, function(e) {
      console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
  });
};

router.post('/', function(req,res,next){
	var success = false;
	sendEmail(req.body);
	res.status(200).json(success);
});
