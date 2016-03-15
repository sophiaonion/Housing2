/**
 * Created by sophiawang on 2/19/16.
 */

var connection = require("./../sql_connect.js");
var constants = require("./../../util/constants.js");

module.exports.getRoommates = function (req, res) {

    connection.query('SELECT roommates FROM users Where username = ?', [req.params.username], function (err, result, fields) {
        //res.setHeader('Content-Type', 'application/json');
        if (err) {
            console.log(err);
        }else{
            if (result[0].roommates == 0) //if it's single
            {
                res.json("Single"); //send nothing
            }else{
                //if it's not a single, then send back the roommates
                //TODO this connection.query might behave really weird, I need to test this
                connection.query('SELECT * FROM roommates Where ? IN(rm1, rm2, rm3, rm4)', [req.params.username], function (err, result, fields) {
                    res.setHeader('Content-Type', 'application/json');
                    if (err) {
                        res.status("404").send();
                        console.log(err);
                    }else{
                        res.send(result);
                    }
                });

            }
        }
    });

}

module.exports.deleteRoommates = function (req, res) {

    connection.query('DELETE FROM roommates WHERE ? In (rm1, rm2, rm3, rm4)', [req.params.username], function (err, result, fields) {
        //res.setHeader('Content-Type', 'application/json');
        if (err) {
            res.status("404").send();
            console.log(err);
        }else{
            connection.query('UPDATE users SET roommates=0 Where username=?', [req.params.username], function (err, result2) {
                //res.setHeader('Content-Type', 'application/json');
                if (err) {
                    console.log(err);
                    res.status("404").send();
                }
            });

            res.send(result);
        }
    });

}

module.exports.delegateRoommate = function (req, res) {
    connection.query('UPDATE roommates SET delegate=? Where username=?', [req.params.delegate], function (err, result2) {
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            console.log(err);
            res.status("404").send();
        }
    });
    res.send(result);
}

module.exports.isDelegate = function (req, res) {
    connection.query('SELECT * FROM roommates Where delegate = ?', [req.params.username], function (err, result, fields) {
        //res.setHeader('Content-Type', 'application/json');
        if (err) {
            console.log(err);
        }else{
            var test=result[0];

        }
    });
}