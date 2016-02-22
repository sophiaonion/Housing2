/**
 * Created by sophiawang on 2/16/16.
 */


var token = window.localStorage.getItem("token");

if (token) {
    $.ajaxSetup({
        headers: {
            'x-access-token': token
        }
    });
};
