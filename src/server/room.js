/**
 * Created by sophiawang on 2/4/16.
 */

var connection = require("./../util/sql_connect.js");

module.exports.getAvailableRoom = function (req, res) {
    connection.query('SELECT * FROM rooms', function (err, result, fields) {
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            console.log(err);
            res.send('Unable to retrieve');
        }else{
            res.send(result);
        }
    });
}
