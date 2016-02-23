/**
 * Created by sophiawang on 2/14/16.
 */

//show a list of user after user click on search
var RoomList = React.createClass({
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
    },
    render: function(){
        return (
            <div className="search">
                <input type="text" name="username" placeholder="username" onChange={this.handleUsernameChange}/>
                <Result data={this.state.data} curr_url = {this.props.url}/>
                <a href="#" className="button" onClick={this.handleClick}>Search</a>
                <a href="#" className="button" onClick={this.onClick}>Close</a>
            </div>
        );
    }
    //TODO 6. approve roommate request
});

var Result = React.createClass({
    render: function(){
        var curr_url = this.props.curr_url;
        return (
            <ul>{
                 this.props.data.map(function(user) {
                     return (
                        <List user={user} curr_url = {curr_url}/>
                     );
                 })
             }</ul>
        );
    }
});

//submit request to database
var List = React.createClass({
    handleClick: function(){
        console.log("testN is getting called");
        var post_url=this.props.curr_url;
        console.log("the post url is:" + post_url);

        var curr_user = getUsername();

        //save this request to the database
        $.ajax({
            type: "POST",
            url: post_url+curr_user+"/"+this.props.user.username,
            async:false,
            success: function(data) {
                console.log("post to database successful");
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            <li>L{this.props.user.l_num} {this.props.user.name} &#09;
                <button onClick={this.handleClick}>Send Request</button>
            </li>
        );
    }
});

React.render(<RoomList url="/api/users/"/>, document.getElementById('search'));


