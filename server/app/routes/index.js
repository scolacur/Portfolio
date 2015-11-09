var router = require('express').Router();
module.exports = router;

router.get('/projects', function(req,res,next){

});

router.get('/about', function(req,res,next){

});

router.get('/contact', function(req,res,next){

});

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
