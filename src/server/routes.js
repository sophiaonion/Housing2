/**
 * Created by sophiawang on 1/31/16.
 */

var login = require("./login.js");
var room = require("./sources/room.js");
var user = require("./sources/user.js");
var request = require("./sources/request.js");
var roommates = require("./sources/roommates.js");

var Router = function(app) { //passing app from server.js
    app.get('/test', function(req, res){
        res.send('success')
    });

    app.get('/test', function(req, res){
        res.send('success')
    });

    //When users login, validate them
    app.get('/login', login);

    //Below are routes could only access by authenticated user
    //room related
    app.get('/api/rooms/:gender/:room_type', room.getAvailableRoom);

    //user related
    app.get('/api/getUsername', function(req, res){
        res.send(res.decoded);
    });

    app.get('/api/users/:username', user.searchUser);
    app.post('/api/users/:requester/:receiver', user.sendRoommateRequest);

    app.get('/api/requests/:receiver', request.getReceivedRequest);
    app.get('/api/requests/sent/:sender', request.getSentRequest);
    app.get('/api/num/requests/:receiver', request.numOfReceivedRequest);
    app.get('/api/num/requests/sent/:sender', request.numOfSentRequest);

    app.get('/api/roommates/:username', roommates.getRoommates);
}

module.exports = Router; //exporting appRouter