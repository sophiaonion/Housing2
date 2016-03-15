/**
 * Created by sophiawang on 2/14/16.
 */

var curr_user = getUsername();
//show a list of user after user click on search
var Search = React.createClass({
    getInitialState: function(){
        return {data: []};
    },
    //get user input
    handleUsernameChange: function(e) {
        this.setState({username: e.target.value});
    },
    handleClick: function(){
        console.log("The request url is: "+ this.props.url+this.state.username);
        //search user's input in the database
        $.ajax({
            url: this.props.url+this.state.username,
            dataType: 'json',
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    onClick: function(){
        $('#myModal').foundation('reveal', 'close');
        React.render(<NoSentRequest />, document.getElementById('no_sent_request'));
    },
    render: function(){
        return (
            <div className="row">

                    <input type="text" name="username" placeholder="username" onChange={this.handleUsernameChange}/>
                    <Result data={this.state.data} curr_url = {this.props.url}/>

                    <a href="#" className="button" onClick={this.handleClick}>Search</a>
                    {"   "}
                    <a href="#" className="button" onClick={this.onClick}>Close</a>
            </div>
        );
    }
});

var Result = React.createClass({
    render: function(){
        var curr_url = this.props.curr_url;
        return (
            <div>{
                 this.props.data.map(function(user) {
                     return (
                        <List user={user} curr_url = {curr_url}/>
                     );
                 })
             }</div>
        );
    }
});

//submit request to database
var List = React.createClass({
    handleClick: function(){
        console.log("testN is getting called");
        var post_url=this.props.curr_url;
        console.log("the post url is:" + post_url);

        //save this request to the database
        $.ajax({
            type: "POST",
            url: post_url+curr_user+"/"+this.props.user.username,
            async:false,
            success: function() {
                console.log("post to database successful");
                alert("success"); //TODO if I have more time, I could make this look prettier by using the code below
                /*<div data-alert className="alert-box success radius">
                    Request submit successfully!
                    <a href="#" className="close">&times;</a>
                </div>*/
                $('#myModal').foundation('reveal', 'close');
                React.render(<NoSentRequest />, document.getElementById('no_sent_request'));

            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div className="row">
                <div className="small-4 columns">
                    L{this.props.user.l_num}
                </div>
                <div className="small-4 columns">
                    {this.props.user.name}
                </div>
                <div className="small-4 columns">
                    <a href="#" className="button" onClick={this.handleClick}>Send Request</a>
                </div>
            </div>
        );
    }
});

React.render(<Search url="/api/users/"/>, document.getElementById('search'));

////////////////////////////////////
/**
 * Created by sophiawang on 2/19/16.
 */

//get a list of request that other people send me
var ReceivedRequest = React.createClass({
    getInitialState: function(){
        return {data: []};
    },
    componentDidMount: function(){
        $.ajax({
            url: this.props.url+curr_user,
            dataType: 'json',
            async: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function(){
        return (
            <div className="requests-list">
                {"Received roommate request from:"}
                <ReceivedRequestList data={this.state.data} url = {this.props.url}/>
            </div>
        );
    }
});

var ReceivedRequestList = React.createClass({
    render: function() {
        var url = this.props.url;
        return(
            <ul>{
                this.props.data.map(function(data) {
                    return <ResultChild data = {data} url = {url} />
                })
            }</ul>
        );
    }
});

var ResultChild = React.createClass({
    Accept: function(){
        var id=this.props.data.id;
        $.ajax({
            type: "put",
            url: this.props.url+id+"/"+true
                +"/"+this.props.data.requester+"/"+curr_user,
            //dataType: 'json',
            async: false,
            success: function() {
                alert("accept successfully");
                //$('#myModal').foundation('reveal', 'close');
                //React.render(<NoReceivedRequest />, document.getElementById('no_received_request'));
                location.reload();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    Decline: function(){
        var id = this.props.data.id;
        $.ajax({
            type: "put",
            url: this.props.url+id+"/"+false+"/"+this.props.data.requester+"/"+curr_user,
            dataType: 'json',
            async: false,
            success: function() {
                alert("reject successfully");
                $('#myModal').foundation('reveal', 'close');
                React.render(<NoReceivedRequest />, document.getElementById('no_received_request'));
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function(){
        var name = this.props.data.requester;
        name = getActualName(name);
        var data=name[0].name;
        return (
            <div className="row">
                <div className="large-4 columns">{name} </div>
                <div className="large-4 columns">
                    <a href="#" className="button" onClick={this.Accept}>Accept</a>
                </div>
                <div className="large-4 columns">
                    <a href="#" className="button" onClick={this.Decline}>Decline</a>
                </div>
            </div>
        );
    }
});

React.render(<ReceivedRequest url="/api/requests/"/>, document.getElementById('received_request'));

var NoReceivedRequest = React.createClass({
    render: function() {
        var num= numberOfReceivedRequest();
        console.log("user received this many requests: "+ num);
        if (num == 0){
            return(
                <div>
                    {"No roommate request received"}
                </div>
            );
        }else{
            return(
                <div>
                    <a href="#" data-reveal-id="received_request_Modal" className="small button"> {num}</a>
                    <div>{"roommate request received"}</div>
                </div>
            );
        }
    }
});

React.render(<NoReceivedRequest />, document.getElementById('no_received_request'));

////////////////////
/**
 * Created by sophiawang on 2/19/16.
 */

//get a list of request that other people send me
var SentRequest = React.createClass({
    getInitialState: function(){
        return {data: []};
    },
    componentDidMount: function(){
        var curr_user = getUsername();
        $.ajax({
            url: this.props.url+curr_user,
            dataType: 'json',
            async: false,
            success: function(data) {
                console.log("Successfully get the data: "+ data);
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function(){
        return (
            <div className="requests-list">
                <ReceivedRequestList data={this.state.data} url = {this.props.url}/>
            </div>
        );
    }
});

var ReceivedRequestList = React.createClass({
    render: function() {
        var url = this.props.url;
        return(
            <ul>{
                this.props.data.map(function(data) {
                    return <ResultChild data = {data} url = {url}/>
                })
            }</ul>
        );
    }
});

var ResultChild = React.createClass({
    onClick: function(){
        var id = this.props.data.id;
        $.ajax({
            type: "put",
            url: this.props.url+"put/"+id,
            dataType: 'json',
            async: false,
            success: function() {
                alert("Cancel successfully");
                $('#myModal').foundation('reveal', 'close');
                React.render(<NoSentRequest />, document.getElementById('no_sent_request'));
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function(){
        var name = this.props.data.receiver;
        name = getActualName(name);
        var data=name[0].name;
        return (
            <div>
                {"You are waiting for confirmation from:"}
                <div className="row">
                    <div className="large-4 columns">
                    {name}
                    </div>
                    <div className="large-4 columns">
                        <a href="#" className="button" onClick={this.onClick}>Cancel</a>
                    </div>
                </div>
            </div>
        );
    }
});

React.render(<SentRequest url="/api/requests/sent/"/>, document.getElementById('sent_request'));


var NoSentRequest = React.createClass({
    render: function() {
        var num= numberOfSentRequest();
        if (num == 0){
            return(
                <div>
                    {"No roommate request sent"}
                </div>
            );
        }else {
            return (
                <div>
                    <a href="#" data-reveal-id="sent_request_Modal" className="small button"> {num}</a>
                    <div>{"roommate request sent"}</div>
                </div>
            );
        }
    }
});

React.render(<NoSentRequest />, document.getElementById('no_sent_request'));


