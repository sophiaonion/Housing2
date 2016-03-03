/**
 * Created by sophiawang on 2/4/16.
 */

var http = require('http');
var jwt = require('jwt-simple');
var tokenSecret = require('./../util/jwtTokenSecret.js');

var validate= function(req, res){
    var tkt=req.query.ticket;

    //the return url
    var url = "http://localhost:5000/login";

    var options = {
        hostname: 'cas.lawrence.edu',
        path: '/validate?service=' + url + '&ticket=' + tkt,
  /*      method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': post_data.length
        }*/
    };

    try{
        callback = function(response) {
            var str = '';

            //another chunk of data has been recieved, so append it to `str`
            response.on('data', function (chunk) {
                str += chunk;
            });

            //the whole response has been recieved, so we just print it out here
            response.on('end', function () {
                var parts = str.split("\n");
                if (parts[0].localeCompare("yes")==0)
                {
                    //TODO Security read more at http://thejackalofjavascript.com/architecting-a-restful-node-js-app/
                    //Generate a token and dispatch it to the client since user authenticate success
                    var token = JSON.stringify(genToken(parts[1]));

                    //check on whether the user is adminJS or studentJS
                    //TODO at this point I'll just have to manually assign people as adminJS
                    //I'll change this later
                    var html =  '<html><body></body><script type="text/javascript"> window.localStorage.setItem("token",' + JSON.stringify(token)+');' +
                        'window.location.replace("/home.html"); </script></html>';
                    res.send(html);
                    //if (parts[1].localeCampre("designated adminJS")==0)
                    //res.send('<html><body></body><script type="text/javascript">window.location.replace("/adminJS/home.html");</script></html>')
                }else{
                    res.send('Login Failure')
                }

            });
        }
        http.request(options, callback).on('error', function (e) {
            console.log("err in request");
            console.log(e);
        }).end();
    }catch (e){
        console.log("The error is:" + e);
        res.send('Login Failure');
    }

}

// private method
function genToken(username) {
    var dateObj = new Date();
    var expires = dateObj.setDate(dateObj.getDate() + 7); // 7 days
    var token = jwt.encode({
        iss: username,
        exp: expires
    }, tokenSecret.jwtTokenSecret);

    return {
        token: token,
        expires: expires,
        //user: username
    };
}



module.exports = validate;