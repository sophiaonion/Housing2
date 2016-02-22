

var RoomList = React.createClass({
    getInitialState: function(){
        return {data: []};
    },
    componentDidMount: function() {
        var user = window.localStorage.getItem("user");
        user=JSON.parse(user);
        console.log("the user is after parse: "+ user);
        console.log("user's gender is: "+ user[0].gender);
        console.log("user has this many roommates: "+ user[0].roommates);
        $.ajax({
            url: this.props.url+user[0].gender+"/"+user[0].roommates,
            dataType: 'json',
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        //TODO set interval to get update from time to time
    },
    render: function(){
        return (
            <div className="available_rooms">
                Dorm:  <Dorm data={this.state.data}/>
                Floor: <Floor data={this.state.data}/>
                Room:  <Room data={this.state.data}/>
                <button>Submit</button>
            </div>
        );
    }
});

var Dorm = React.createClass({
    render: function(){
        var seen=[];
        return (
            <select>
                <option></option>
                {
                    this.props.data.map(function(data) {
                        var dorm= data.dorm;
                        if ($.inArray(dorm, seen) == -1)
                        {
                            seen.push(dorm);
                            return (<option>{dorm}</option>);
                        }
                    })
                }
            </select>
        );
    }
});

var Floor = React.createClass({
    render: function(){
        return (
            <select>
                <option></option>
                {
                    this.props.data.map(function(room) {
                        return (<option>{room.dorm}</option>);
                    })
                }
            </select>
        );
    }
});

var Room = React.createClass({
    render: function(){
        return (
            <select>
                <option></option>
                {
                    this.props.data.map(function(room) {
                        return (<option>{room.room_number}</option>);
                    })
                }
            </select>
        );
    }
});

React.render(<RoomList url="/api/rooms/"/>, document.getElementById('available_rooms'));