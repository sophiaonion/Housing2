/**
 * Created by sophiawang on 3/10/16.
 */

var React = require("react"),
    App = React.createFactory(require("iso_client"));

if (typeof window !== "undefined") {
    window.onload = function() {
        React.render(App(), document.getElementById("current_roommate"));
    };
}