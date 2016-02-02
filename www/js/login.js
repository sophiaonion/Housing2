var main = function(){

    //TODO this url is subject to change
    var url = "localhost:5000/students/home.html";

    //TODO need to figure out the return address after service=
    window.location.href = "https://cas.lawrence.edu/login?service="+url;

}//end main


$(document).ready(main);