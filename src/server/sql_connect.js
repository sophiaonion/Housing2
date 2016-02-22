"use strict";

var mysql      = require('mysql');
//Need to encrypt user and password and host
//https://github.com/felixge/node-mysql#introduction see this for encrpt SSL option
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'housing'
});

connection.connect(function(err){
    if(!err) {
        console.log("connected as id " + connection.threadId);
    } else {
        console.log("Error connecting database ... : " + err.stack);
    }
});

module.exports = connection;

