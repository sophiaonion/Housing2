/**
 * Created by sophiawang on 2/19/16.
 */

function getUsername(){
    var username="";
    $.ajax({
        url: '/api/getUsername/',
        async: false,
        success: function(data) {
            //data is current user's user name
            username = data;
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(err.toString());
        }.bind(this)
    });
    return username;
}

//I believe this one get user object
function getUser(username){
    var user;
    $.ajax({
        url: '/api/users/'+username,
        async: false,
        success: function(data) {
            //data is current user's user name
            user = data;
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(err.toString());
        }.bind(this)
    });
    return user;
}

function getRoommates(username){
    var names=[];
    $.ajax({
        url: '/api/roommates/'+username,
        async: false,
        success: function(data) {
            //data is current user's user name
            var list=data[0];
            delete list["delegate"]; delete list["gp_lottery"]; delete list["id"]; delete list["room_id"];

            for (var element in list) {
                if(list[element]){
                    if (list[element].localeCompare(username) != 0)
                    {
                        var aname = getActualName(list[element]);
                        names.push(aname);
                    }
                }
            }
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(err.toString());
        }.bind(this)
    });
    return names;
}

var getActualName= function(user){
    var value;
    $.ajax({
        url: "/api/users/"+user, //this url thing probably need to change
        dataType: 'json',
        async: false,
        success: function(data) {
            value= data;
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(status, err.toString());
        }.bind(this)
    });
    return value;
}

function numberOfReceivedRequest(){
    var num=0;
    $.ajax({
        url: '/api/num/requests/'+getUsername(),
        async: false,
        success: function(data) {
            //data is current user's user name
            var key = "COUNT(*)";
            num = data[0][key];
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(err.toString());
        }.bind(this)
    });
    return num;
}

function numberOfSentRequest(){
    var num=0;
    $.ajax({
        url: '/api/num/requests/sent/'+getUsername(),
        async: false,
        success: function(data) {
            //data is current user's user name
            var key = "COUNT(*)";
            num = data[0][key];
            console.log("user sent these requests: "+ num);
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(err.toString());
        }.bind(this)
    });
    return num;
}