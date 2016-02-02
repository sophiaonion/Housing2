var express = require('express'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    //students = require('./server/students'),
    app = express();

app.set('port', process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(__dirname + '/www'));

var routes = require("./server/routes.js")(app);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err);
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

