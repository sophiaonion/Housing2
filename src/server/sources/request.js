/**
 * Created by sophiawang on 2/19/16.
 */

var connection = require("./../sql_connect.js");
var constants = require("./../../util/constants.js");

module.exports.getReceivedRequest = function (req, res) {
    connection.query('SELECT * FROM requests Where (receiver = ? and  result = -1)', [req.params.receiver], function (err, result, fields) {
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            console.log(err);
            res.status("404").send();
        }else{
            res.send(result);
        }
    });
}

module.exports.numOfReceivedRequest = function (req, res) {
    connection.query('SELECT COUNT(*) FROM requests Where (receiver = ? and  result = -1)', [req.params.receiver], function (err, result, fields) {
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            console.log(err);
            res.status("404").send();
        }else{
            res.send(result);
        }
    });
}

module.exports.putReceivedRequest = function (req, res) {
    var i = req.params.response ? 1 : 0;
    var id = req.params.id;
    connection.query('UPDATE requests SET result=? Where id=?', [i, id], function (err, result) {
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            console.log(err);
            res.status("404").send();
        }else{
            res.send(result);
        }
    });
}

module.exports.getSentRequest = function (req, res) {
    connection.query('SELECT * FROM requests Where (requester = ? and  result = -1)', [req.params.sender], function (err, result, fields) {
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            console.log(err);
            res.status("404").send();
        }else{
            res.send(result);
        }
    });
}

module.exports.numOfSentRequest = function (req, res) {
    connection.query('SELECT COUNT(*) FROM requests Where (requester = ? and  result = -1)', [req.params.sender], function (err, result, fields) {
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            console.log(err);
            res.status("404").send();
        }else{
            res.send(result);
        }
    });
}

module.exports.putSentRequest = function (req, res) {
    var id = req.params.id;
    connection.query('UPDATE requests SET result=2 Where id=?', [id], function (err, result) {
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            console.log(err);
            res.status("404").send();
        }else{
            res.send(result);
        }
    });
}