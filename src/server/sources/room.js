/**
 * Created by sophiawang on 2/4/16.
 */

var connection = require("./../sql_connect.js");

module.exports.getAvailableRoom = function (req, res) {
    try{
    connection.query('SELECT * FROM rooms where (availability = 1 and gender = ? and room_type = ?)',
    [req.params.gender, req.params.room_type],
    function (err, result, fields) {
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            console.log(err);
            res.send('Unable to retrieve');
        }else{
            res.send(result);
        }
    });

    } catch(e){
    console.log("SQL error: ");
    console.log(e.toString());}
};

