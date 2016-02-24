

var RoomList = React.createClass({
    getInitialState: function(){
        return {
            data: [],
            dorm: "",
            floor: "",
            room: ""
        };
    },
    componentDidMount: function() {
        var user = window.localStorage.getItem("user");
        user=JSON.parse(user);
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
    },
    handleDormUpdate: function(selectedDorm) {
        console.log("User changed dorm");
        console.log("Selected value is: "+ selectedDorm);
        this.setState({dorm: selectedDorm});

        var filteredFloor = this.state.data;
        console.log("Selected dorm is: "+ selectedDorm);
        filteredFloor= jQuery.grep(filteredFloor, function(value) {
            console.log("In the jQuery.grep, each value is: "+ JSON.stringify(value));
            console.log("value.dorm is: "+ value.dorm);
            return value.dorm == selectedDorm;
        });
        console.log("New data is: "+ JSON.stringify(filteredFloor));
        this.setState({floor:filteredFloor});
    },
    handleFloorUpdate: function(selectedFloor) {
        console.log("User changed floor");
        console.log("Selected value is: "+ selectedFloor);
        var filteredRoom=this.state.floor;
        filteredRoom= jQuery.grep(filteredRoom, function(value) {
            return value.room_number.toString().charAt(0) == selectedFloor;
        });
        console.log("new records for selected floor (filteredRoom) are: "+JSON.stringify(filteredRoom));
        this.setState({room: filteredRoom});
    },
    onClick: function(){
        $('#myModal').foundation('reveal', 'close');
    },
    render: function(){
        return (
            <div className="available_rooms">
                Dorm:  <Dorm data={this.state.data} update={this.handleDormUpdate} />
                Floor: <Floor floors={this.state.floor} update={this.handleFloorUpdate} />
                Room:  <Room rooms={this.state.room}/>
                <a href="#" className="button" onClick={this.onClick}>Close</a>
            </div>
        );

        //<button onClick={this.handleFilterChange}>Submit</button>
    }
});

var Dorm = React.createClass({
    getInitialState: function() {
        return {
            value: "0"
        };
    },
    handleChange: function(e){
        var value = e.target.value;
        this.setState({value: e.target.value});
        this.props.update(value);
    },
    render: function(){
        var seen=[];
        return (
                <select value={this.state.value} onChange={this.handleChange}>
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
    getInitialState: function() {
        return {
            value: "0"
        };
    },
    handleChange: function(e) {
        console.log("e.target.value is: "+e.target.value);
        var val = e.target.value.charAt(0);
        console.log("handle change for floor is called. the selected floor is: "+val);
        this.setState({value: e.target.value});
        console.log("did this set the value? "+ this.state.value);
        this.props.update(val);
    },
    render: function(){
        var seen=[];
        if (this.props.floors) {
            console.log("in");
            return (
                <select value={this.state.value} onChange={this.handleChange}>
                    <option></option>
                    {
                        this.props.floors.map(function (room) {
                            var floor = room.room_number.toString().charAt(0);
                            console.log("The floor is: " + floor);
                            if ($.inArray(floor, seen) == -1) {
                                seen.push(floor);
                                switch (floor) {
                                    case "1":
                                        floor = "1st";
                                        break;
                                    case "2":
                                        floor = "2nd";
                                        break;
                                    case "3":
                                        floor = "3rd";
                                        break;
                                    default:
                                        floor = floor + "th";
                                }
                                console.log("The floor is: (should be the same as the last one)" + floor);
                                return (<option>{floor} floor</option>);
                            }
                        })
                    }
                </select>
            );
        }else{
            return (
            <select>
                <option></option>
            </select>)
        }
    }
});

var Room = React.createClass({
    render: function(){
        if (this.props.rooms) {
            return (
                <select>
                    <option></option>
                    {
                        this.props.rooms.map(function(room) {
                            return (<option>{room.room_number}</option>);
                        })
                    }
                </select>
            );
        }else{
            return (
                <select>
                    <option></option>
                </select>
            )
        }
    }
});

React.render(<RoomList url="/api/rooms/"/>, document.getElementById('available_rooms'));