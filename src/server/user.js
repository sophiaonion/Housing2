/**
 * Created by sophiawang on 2/4/16.
 */
var connection = require("./../util/sql_connect.js");
var constants = require("./../util/constants.js");

module.exports.searchUser = function (req, res) {
    //currently it's search by username
    //TODO restrict to return only user's l number and name
    connection.query('SELECT * FROM users Where username = ?', [req.params.username], function (err, result, fields) {
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    });
}


module.exports.sendRoommateRequest = function (req, res) {
    console.log("The person who send out roommate request is: "+ req.params.requester);
    console.log("The person who should receive the request is: "+ req.params.receiver);
    console.log("The request type is: "+ constants.request.ROOMMATE);

    var post = {requester: req.params.requester, receiver: req.params.receiver, type:constants.request.ROOMMATE};
    connection.query('INSERT INTO requests SET ?', post, function (err, result) {
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            console.log(err);
        }else{
            console.log("Submit request successful? (if showing this message then probably yes): "+result);
            res.send(result);
        }
    });
}