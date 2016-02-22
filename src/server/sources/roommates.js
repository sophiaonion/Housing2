/**
 * Created by sophiawang on 2/19/16.
 */

var connection = require("./../sql_connect.js");
var constants = require("./../../util/constants.js");

module.exports.getRoommates = function (req, res) {

    connection.query('SELECT single FROM users Where username = ?', [req.params.username], function (err, result, fields) {
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            console.log(err);
        }else{
            var test = result[0].single;
            if (result[0].single == constants.YES) //if it's single
            {
                res.json("Single"); //send nothing
            }else{
                //if it's not a single, then send back the roommates
                //TODO this connection.query might behave really weird, I need to test this
                connection.query('SELECT * FROM roommates Where ? IN(rm1, rm2, rm3, rm4)', [req.params.username], function (err, result, fields) {
                    res.setHeader('Content-Type', 'application/json');
                    if (err) {
                        console.log(err);
                    }else{
                        console.log("user does have roommates, they are: "+ result);
                        res.send(result);
                    }
                });

            }
        }
    });


}