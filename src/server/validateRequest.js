/**
 * Created by sophiawang on 2/15/16.
 */

var jwt = require('jwt-simple');
var tokenSecret = require('./../util/jwtTokenSecret.js');
//var validateUser = require('../routes/auth').validateUser;

module.exports = function(req, res, next) {

    // When performing a cross domain request, you will recieve
    // a preflighted request first. This is to check if our the app
    // is safe.

    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

    if (token) {
        try {
            var tokenObj=JSON.parse(token);
            var decoded = jwt.decode(tokenObj.token.toString(),tokenSecret.jwtTokenSecret);
            if (decoded.exp <= Date.now()) {
                res.end('Access token has expired', 400);
            }

            //TODO do i need to do anything with the decode????
            res.decoded = decoded.iss;
            next();

        } catch (err) {
            console.log(err);
            res.status(404).send('You are not logged in');
        }
    } else {
        console.log('Token not exist');
        res.status(404).send('You are not logged in');
    }

};