/**
 * Created by sophiawang on 1/31/16.
 */



var appRouter = function(app) { //passing app from server.js
    app.get('/test', function(request, response){
        response.send('success')
    });
}

module.exports = appRouter; //exporting appRouter