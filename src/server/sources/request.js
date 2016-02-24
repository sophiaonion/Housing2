/**
 * Created by sophiawang on 2/19/16.
 */

var connection = require("./../sql_connect.js");
var constants = require("./../../util/constants.js");

module.exports.getReceivedRequest = function (req, res) {
    connection.query('SELECT * FROM requests Where receiver = ?', [req.params.receiver], function (err, result, fields) {
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    });
}

module.exports.numOfReceivedRequest = function (req, res) {
    connection.query('SELECT COUNT(*) FROM requests Where receiver = ?', [req.params.receiver], function (err, result, fields) {
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    });
}

module.exports.getSentRequest = function (req, res) {
    connection.query('SELECT * FROM requests Where requester = ?', [req.params.sender], function (err, result, fields) {
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    });
}

module.exports.numOfSentRequest = function (req, res) {
    connection.query('SELECT COUNT(*) FROM requests Where requester = ?', [req.params.sender], function (err, result, fields) {
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    });
}