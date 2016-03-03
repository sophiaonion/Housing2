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

module.exports.makeSelection = function (req, res) {
    var roomId, avail;

    try{
        connection.query('SELECT id, availability FROM rooms where (room_number = ? and dorm = ?)',
            [req.body.room, req.body.dorm],
            function (err, result, fields) {
                res.setHeader('Content-Type', 'application/json');
                if (err) {
                    console.log(err);
                    res.send('Unable to retrieve');
                }else{
                    roomId=result[0].id;
                    var bool = Boolean(result[0].availability);
                    if (!bool) //when the room is not available, send this back to user
                    {
                        res.status(460).send("Room not available"); //TODO need to test this sitaution, which can't be tested with only my account
                    }else{
                        connection.query("SET @receivedId=?, @user=?;"+
                            "UPDATE users SET roomId = @receivedId Where username = @user;"+
                            "UPDATE rooms SET availability = 0 Where id = @receivedId;"+
                            "UPDATE roommates SET room_id = @receivedId Where delegate = @user;", [roomId, req.params.username], function (err, result) {
                            res.setHeader('Content-Type', 'application/json');
                            if (err) {
                                console.log(err);
                                res.status("404").send();
                            }else{
                                res.status("200").send("success");
                            }
                        });
                    }
                }
            });
    } catch(e){
        console.log("SQL error: ");
        console.log(e.toString());
    }

};

