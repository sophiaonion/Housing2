/**
 * Created by sophiawang on 2/4/16.
 */

var http = require('http');
var jwt = require('jwt-simple');

var validate= function(req, res){
    var tkt=req.query.ticket;
    console. log('the ticket is: '+ tkt);

    //the return url
    var url = "http://localhost:5000/validation";

    var options = {
        hostname: 'cas.lawrence.edu',
        path: '/validate?service=' + url + '&ticket=' + tkt,
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
                console.log("Response from callbakc: "+ str);
                var parts = str.split("\n");
                if (parts[0].localeCompare("yes")==0)
                {
                    //TODO Security read more at http://thejackalofjavascript.com/architecting-a-restful-node-js-app/
                    //Generate a token and dispatch it to the client since user authenticate success
                    res.json(genToken(parts[1]));

                    //check on whether the user is adminJS or studentJS
                    //TODO at this point I'll just have to manually assign people as adminJS
                    //I'll change this later
                    res.send('<html><body></body><script type="text/javascript">window.location.replace("/home.html");</script></html>')
                    //if (parts[1].localeCampre("designated adminJS")==0)
                    //res.send('<html><body></body><script type="text/javascript">window.location.replace("/adminJS/home.html");</script></html>')
                }else{
                    res.send('Login Failure')
                }

            });
        }
        http.request(options, callback).end();
    }catch (e){
        console.log("The error is:" + e);
        res.send('Login Failure');
    }

}

//secure REST http://thejackalofjavascript.com/architecting-a-restful-node-js-app/
// private method
function genToken(user) {
    var expires = expiresIn(7); // 7 days
    var token = jwt.encode({
        exp: expires
    }, require('../config/secret')());

    return {
        token: token,
        expires: expires,
        user: user
    };
}

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = validate;