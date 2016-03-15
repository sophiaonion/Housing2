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
        type: 'GET',
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

//pass in username of the user
var getActualName= function(user){
    var value;
    $.ajax({
        url: "/api/users/"+user, //this url thing probably need to change
        dataType: 'json',
        async: false,
        success: function(data) {
            value= data[0]["name"];
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(status, err.toString());
        }.bind(this)
    });

    console.log("get actual name return value is: "+JSON.stringify(value));
    return value;
}

var getOtherUsername= function(user){
    var value;
    $.ajax({
        url: "/api/users/username/"+user, //this url thing probably need to change
        dataType: 'json',
        async: false,
        success: function(data) {
            value= data[0]["username"];
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(status, err.toString());
        }.bind(this)
    });

    console.log("get actual name return value is: "+JSON.stringify(value));
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


function selection(data){
    var user= getUsername();
    var success= false;
    //make a request to select first choice
    $.ajax({
        type: "POST",
        url: "/api/rooms/"+user,
        data: data.first,
        async:false,
        // dataType: 'json',
        success: function(d) {
            console.log("submit successful data"+d);
            success = d;
            //console.log(JSON.stringify(data));
            console.log("success!");
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(status, err.toString());
        }.bind(this)
    });

    return success;
}

