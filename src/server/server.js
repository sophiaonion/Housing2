var express = require('express'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    jwt = require('jwt-simple'),
    app = express();

app.use(bodyParser.json());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
//app.set('jwtTokenSecret', 'ababababa'); //TODO probably could make my secret string more complicated in the future

app.use('/', express.static(__dirname + './../client'));

//TODO need to finish the security later, details see the todo in login.js file
//TODO read more to add the client side, look at this http://www.sitepoint.com/using-json-web-tokens-node-js/
//check whether user token is valid, only request start with /api/* will be checked
app.all('/api/*',[require('./validateRequest')]);


var routes = require("./routes.js")(app);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err);
});

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

