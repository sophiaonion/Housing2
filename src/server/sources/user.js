/**
 * Created by sophiawang on 2/4/16.
 */
var connection = require("./../sql_connect.js");
var constants = require("./../../util/constants.js");

module.exports.searchUser = function (req, res) {
    //currently it's search by username
    //TODO restrict to return only user's l number and name
    connection.query('SELECT * FROM users Where username = ?', [req.params.username], function (err, result, fields) {
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            console.log(err);
            res.status("404").send();
        }else{
            res.send(result);
        }
    });
}

module.exports.searchUsername = function (req, res) {
    //currently it's search by username
    //TODO restrict to return only user's l number and name
    connection.query('SELECT * FROM users Where user = ?', [req.params.user], function (err, result, fields) {
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            console.log(err);
            res.status("404").send();
        }else{
            res.send(result);
        }
    });
}

module.exports.sendRoommateRequest = function (req, res) {
    var post = {requester: req.params.requester, receiver: req.params.receiver, type:constants.request.ROOMMATE, result:-1};
    connection.query('INSERT INTO requests SET ?', post, function (err, result) {
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            console.log(err);
            res.status("404").send();
        }else{
            res.send(result);
        }
    });
}


