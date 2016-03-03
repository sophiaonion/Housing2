/**
 * Created by sophiawang on 1/31/16.
 */

var login = require("./login.js");
var room = require("./sources/room.js");
var user = require("./sources/user.js");
var request = require("./sources/request.js");
var roommates = require("./sources/roommates.js");

var Router = function(app) { //passing app from server.js
    //When users login, validate them
    app.get('/login', login);

    //user related
    app.get('/api/getUsername', function(req, res){
        res.send(res.decoded);
    });

    //Below are routes could only access by authenticated user
    //room related
    app.get('/api/rooms/:gender/:room_type', room.getAvailableRoom);

    //Below are routes could only access by authenticated user
    //room related
    app.post('/api/rooms/:username', room.makeSelection);


    app.get('/api/users/:username', user.searchUser);
    app.post('/api/users/:requester/:receiver', user.sendRoommateRequest);

    app.get('/api/requests/:receiver', request.getReceivedRequest);
    app.put('/api/requests/:id/:response', request.putReceivedRequest);

    app.get('/api/requests/sent/:sender', request.getSentRequest);
    app.put('/api/requests/sent/put/:id', request.putSentRequest);

    app.get('/api/num/requests/:receiver', request.numOfReceivedRequest);
    app.get('/api/num/requests/sent/:sender', request.numOfSentRequest);

    app.get('/api/roommates/:username', roommates.getRoommates);
}

module.exports = Router; //exporting appRouter