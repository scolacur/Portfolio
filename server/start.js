var chalk = require('chalk');

// Create a node server instance
var server = require('http').createServer();

var createApplication = function () {
    var app = require('./app');
    server.on('request', app); // Attach the Express application.
};

var startServer = function () {

    var PORT = process.env.PORT || 2000;

    server.listen(PORT, function () {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });

};

createApplication();

startServer();
// .catch(function (err) {
//     console.error(chalk.red(err.stack));
//     process.kill(1);
// });