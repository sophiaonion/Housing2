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

function getUser(username){
    var user;
    $.ajax({
        url: '/api/users/'+username,
        async: false,
        success: function(data) {
            //data is current user's user name
            console.log("getUser function successful. result:"+JSON.stringify(data));
            user = data;
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(err.toString());
        }.bind(this)
    });
    return user;
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