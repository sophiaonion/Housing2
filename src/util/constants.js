/**
 * Created by sophiawang on 2/13/16.
 */


var gender = {
    FEMALE : 0,
    MALE : 1,
    NEUTRAL : 2
};

var room_type = {
    SINGLE : 0,
    DOUBLE : 1,
    TRIPLE: 2,
    QUAD : 3
};

var request ={
    ROOMMATE: 0,
    DELEGATE: 1
};

var request_result ={
    UNPROCESSED: -1,
    DECLINE: 0,
    ACCEPT: 1,
    CANCELLED: 2
};

exports.YES = true;
exports.NO = false;
exports.gender=gender;
exports.room_type=room_type;
exports.request=request;
exports.request_result=request_result;
