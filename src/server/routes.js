/**
 * Created by sophiawang on 1/31/16.
 */

var login = require("./login.js");
var room = require("./sources/room.js");
var user = require("./sources/user.js");
var request = require("./sources/request.js");
var roommates = require("./sources/roommates.js");

/*
//isomorphism
var React = require('react');
require('babel/register')({
    stage: 0
});
var roommates_client = require("./iso_client.js");
var roommates_client_factory = React.createFactory(roommates_client.Rommates_client);
///////////
*/


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
    app.get('/api/users/username/:user', user.searchUsername);
    app.post('/api/users/:requester/:receiver', user.sendRoommateRequest);

    app.get('/api/requests/:receiver', request.getReceivedRequest);
    app.put('/api/requests/:id/:response/:requester/:receiver', request.putReceivedRequest);

    app.get('/api/requests/sent/:sender', request.getSentRequest);
    app.put('/api/requests/sent/put/:id', request.putSentRequest);

    app.get('/api/num/requests/:receiver', request.numOfReceivedRequest);
    app.get('/api/num/requests/sent/:sender', request.numOfSentRequest);

    app.get('/api/roommates/:username', roommates.getRoommates);
    app.delete('/api/roommates/:username', roommates.deleteRoommates);
    app.put('/api/roommates/delegate/:delegate', roommates.delegateRoommate);
    //app.get('/api/roommates/delegate/:username', roommates.isDelegate);

/*   //isomorphism
    app.get('/roommate', function(req, res){
        var appHtml = React.renderToString(roommates_client_factory({}));
        console.log("server rendered html is: ");
        console.log(appHtml);
        /!*var html = injectIntoHtml({app: appHtml});*!/
        res.render("roommate.ejs", {reactOutput:apphtml});

    });*/
}

module.exports = Router; //exporting appRouter