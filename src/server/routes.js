/**
 * Created by sophiawang on 1/31/16.
 */

var validate = require("./validation.js");
var room = require("./room.js");
var user = require("./user.js");

var Router = function(app) { //passing app from server.js
    app.get('/test', function(req, res){
        res.send('success')
    });

    //When users login, validate them
    app.post('/validation', validate);

    //Below are routes could only access by authenticated user
    //room related
    app.get('/api/rooms', room.getAvailableRoom);

    //user related
    app.get('/api/rooms/:username', user.searchUser);
    app.post('/api/rooms/:requester/:receiver', user.sendRoommateRequest);
}

module.exports = Router; //exporting appRouter