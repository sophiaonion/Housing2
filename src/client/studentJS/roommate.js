/**
 * Created by sophiawang on 2/14/16.
 */

/*var RoommateInfo = React.createClass({


});*/

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
    render: function(){
        return (
            <div className="search">
                <input type="text" name="username" placeholder="username" onChange={this.handleUsernameChange}/>
                <button onClick={this.handleClick}>Search</button>
                <Result data={this.state.data}/>
            </div>
        );
    }
    //TODO 5. send the roommate pending request
    //TODO 6. approve roommate request
});

var Result = React.createClass({
    handleClick: function(){
        var curr_user;
        //save this request to the database
        $.ajax({
            url: this.props.url+curr_user+"/"+this.state.username,
            dataType: 'json',
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
            <ul>{
                this.props.data.map(function(user) {
                    return (
                        <li>L{user.l_num} {user.name} &#09; test
                        </li>
                    );
                })
            }</ul>
        );
    }
});

//need to put this back to the <p> <!--<button onClick={this.handleClick}>Send Request</button>-->

//TODO how to convert search result to be part of the rest request?
React.render(<RoomList url="/api/rooms/"/>, document.getElementById('search'));