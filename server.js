//Setting up dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var htmlRoutes = require('./app/routing/html-routes');
var apiRoutes = require('./app/routing/api-routes');

//Setting up express
var app = express();
var PORT = process.env.PORT || 3000;

//Setting up bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//Setting up static components
app.use('/', express.static(__dirname + '/app/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

//Setting up routes
app.use('/', htmlRoutes);
app.use('/', apiRoutes);

//Port listening + console logging which port
app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
})
