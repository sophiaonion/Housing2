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