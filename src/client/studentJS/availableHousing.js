
var first = false;
var second = false;
var third = false;
var submission = {};

var ChangeFeaturedImage = function(img)
{
    console.log("the featured image is going to change to "+img);
    var current_feature = document.getElementById("clearing_img").getElementsByClassName("clearing-featured-img");
    Object.keys(current_feature).forEach(function(k) {
        if(!(k === "0")) {
            $("#"+k).removeClass("clearing-featured-img");
        }
    });
    $("#"+img).addClass("clearing-featured-img");
}

var RoomList = React.createClass({
    getInitialState: function(){
        return {
            data: [],
            floor: "",
            room: "",
            current_selection:{}
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
        var obj = this.state.current_selection;
        obj["dorm"]=selectedDorm;
        this.setState({current_selection: obj});

        var filteredFloor = this.state.data;
        filteredFloor= jQuery.grep(filteredFloor, function(value) {
            return value.dorm == selectedDorm;
        });
        this.setState({floor:filteredFloor});
    },
    handleFloorUpdate: function(selectedFloor) {
        var filteredRoom=this.state.floor;
        filteredRoom= jQuery.grep(filteredRoom, function(value) {
            return value.room_number.toString().charAt(0) == selectedFloor;
        });

        var obj = this.state.current_selection;
        obj["floor"]=selectedFloor;
        this.setState({current_selection: obj});
        this.setState({room: filteredRoom});
    },
    handleRoomUpdate: function(selectedRoom) {
        var obj = this.state.current_selection;
        obj["room"]=selectedRoom;
        this.setState({current_selection: obj});
    },
    handleImgClicking: function() {
        var obj = this.state.current_selection;
        obj["room"]=selectedRoom;
        this.setState({current_selection: obj});
    },
    render: function(){
        return (
            <div className="row">
                <div>
                Dorm:  <DormSelect data={this.state.data} update={this.handleDormUpdate} />
                Floor: <FloorSelect floors={this.state.floor} update={this.handleFloorUpdate} />
                Room:  <RoomSelect rooms={this.state.room} update={this.handleRoomUpdate}/>
                </div>
                <p></p>
                <div className ="right-align">
                 <Button current_selection={this.state.current_selection}/>
                </div>
            </div>


        );
    }
});

//TODO modify button, pass current state to button and button will *save* it and reflect on the page
var Button = React.createClass({
    onClick: function(){
        $('#myModal').foundation('reveal', 'close');

        if (first) {first = false;}
        if (second) {second = false;}
        if (third) {third = false;}
    },
    onSelect: function(){
        //validation check whether user have select a value
        var dorm = false; var floor = false; var room = false;

        if (this.props.current_selection["dorm"]){
            dorm = true;
        }

        if (this.props.current_selection["floor"]){
            floor = true;
        }

        if (this.props.current_selection["room"]){
            room = true;
        }

        if (dorm && floor && room){
            //there is a value
            $('#myModal').foundation('reveal', 'close');

            //below rerender the choice component on the selection page
            //first, second, third represent which select a room is being clicked
            //they got triggered in their respective choice component
            if (first) {
                React.render(<FirstChoice data= {this.props.current_selection} changeButton = {true}/>,
                    document.getElementById('first_choice'));
                first = false;
                submission["first"] = jQuery.extend(true, {}, this.props.current_selection);
            }
            if (second) {
                React.render(<SecondChoice data= {this.props.current_selection} changeButton = {true}/>,
                    document.getElementById('second_choice'));
                second = false;
                submission["second"] = jQuery.extend(true, {}, this.props.current_selection);
            }
            if (third) {
                React.render(<ThirdChoice data= {this.props.current_selection} changeButton = {true}/>,
                    document.getElementById('third_choice'));
                third = false;
                submission["third"] = jQuery.extend(true, {}, this.props.current_selection);
            }
        }else{
            alert("Please select a value for every field! ");
            //TODO highlight the place where user need to select
        }

    },
    render: function() {
        if (show_submit_button) {
            return (
                <div>
                    <a href="#" className="button" onClick={this.onSelect}>Select</a>
                    {"  "}
                    <a href="#" className="button" onClick={this.onClick}>Back</a>
                </div>
            );
        } else {
            return (
                <div>
                    <a href="#" className="button" onClick={this.onClick}>Back</a>
                </div>
            );

        }
    }
});

var DormSelect = React.createClass({
    getInitialState: function() {
        return {
            value: "0"
        };
    },
    handleChange: function(e){
        var value = e.target.value;
        this.setState({value: e.target.value});
        this.props.update(value);
        ChangeFeaturedImage(value);
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

var FloorSelect = React.createClass({
    getInitialState: function() {
        return {
            value: "0"
        };
    },
    handleChange: function(e) {
        var val = e.target.value.charAt(0);
        ChangeFeaturedImage(val); //TODO change the value passing in
        this.setState({value: e.target.value});
        this.props.update(val);
    },
    render: function(){
        var seen=[];
        if (this.props.floors) {
            return (
                <select value={this.state.value} onChange={this.handleChange}>
                    <option></option>
                    {
                        this.props.floors.map(function (room) {
                            var floor = room.room_number.toString().charAt(0);
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

var RoomSelect = React.createClass({
    getInitialState: function() {
        return {
            value: "0"
        };
    },
    handleChange: function(e) {
        var val = e.target.value;
        this.setState({value: e.target.value});
        this.props.update(val);
        ChangeFeaturedImage(val);
    },
    render: function(){
        if (this.props.rooms) {
            return (
                <select value={this.state.value} onChange={this.handleChange}>
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


////////////////////////////////////////////////////////////////////////////////
var FirstChoice = React.createClass({
    render: function() {
        return(
            <div className="row selection-layout">
                <div className="large-4 columns">1st choice:</div>
                <FirstChoiceSelection selection={this.props.data}/>
                <div className="large-4 columns">
                    <FirstChoiceButton changeButton = {this.props.changeButton}/>
                </div>
            </div>
        );
    }
});

//this render users' selection value
var FirstChoiceSelection = React.createClass({
    render: function() {
        var val = this.props.selection;
        var type = typeof val;
        if (type.localeCompare("string")==0) //check this line, might be a problem
        {
            return(
                <div className="large-4 columns">
                    {"None"}
                </div>
            );
        }else{
            return(
                <div className="large-4 columns">
                    {this.props.selection.dorm + " "+ this.props.selection.room}
                </div>
            );
        }
    }
});

//this responsible for the button
var FirstChoiceButton = React.createClass({
    onClick: function (){
        first = true;
    },
    render: function() {
        if(this.props.changeButton){
            return(
                <a href="#" data-reveal-id="myModal" className="small button"
                   data-options="close_on_background_click:false;close_on_esc:false;"
                   onClick={this.onClick}>Change</a>
            );
        }else{
            return(
                <a href="#" data-reveal-id="myModal" className="small button"
                   data-options="close_on_background_click:false;close_on_esc:false;"
                   onClick={this.onClick}>Select A Room</a>
            );
        }
    }
});

React.render(<FirstChoice data="None" changeButton = {false}/>, document.getElementById('first_choice'));


var SecondChoice = React.createClass({
    render: function() {
        return(
            <div className="row selection-layout">
                <div className="large-4 columns">2nd choice:</div>
                <SecondChoiceSelection selection={this.props.data}/>
                <div className="large-4 columns">
                    <SecondChoiceButton changeButton = {this.props.changeButton}/>
                </div>
            </div>
        );
    }
});

var SecondChoiceSelection = React.createClass({
    render: function() {
        var val = this.props.selection;
        var type = typeof val;
        if (type.localeCompare("string")==0) //check this line, might be a problem
        {
            return(
                <div className="large-4 columns">
                    {"None"}
                </div>
            );
        }else{
            return(
                <div className="large-4 columns">
                    {this.props.selection.dorm + " "+ this.props.selection.room}
                </div>
            );
        }
    }
});

var SecondChoiceButton = React.createClass({
    onClick: function (){
        second = true;
    },
    render: function() {
        if(this.props.changeButton){
            return(
                <a href="#" data-reveal-id="myModal" className="small button"
                   data-options="close_on_background_click:false;close_on_esc:false;"
                   onClick={this.onClick}>Change</a>
            );
        }else{
            return(
                <a href="#" data-reveal-id="myModal" className="small button"
                   data-options="close_on_background_click:false;close_on_esc:false;"
                   onClick={this.onClick}>Select A Room</a>
            );
        }
    }
});

React.render(<SecondChoice data="None" changeButton = {false}/>, document.getElementById('second_choice'));

var ThirdChoice = React.createClass({
    render: function() {
        return(
            <div className="row selection-layout">
                <div className="large-4 columns">3rd choice:</div>
                <ThirdChoiceSelection selection={this.props.data}/>
                <div className="large-4 columns">
                    <ThirdChoiceButton changeButton = {this.props.changeButton}/>
                </div>
            </div>
        );
    }
});

var ThirdChoiceSelection = React.createClass({
    render: function() {
        var val = this.props.selection;
        var type = typeof val;
        if (type.localeCompare("string")==0) //check this line, might be a problem
        {
            return(
                <div className="large-4 columns">
                    {"None"}
                </div>
            );
        }else{
            return(
                <div className="large-4 columns">
                    {this.props.selection.dorm + " "+ this.props.selection.room}
                </div>
            );
        }
    }
});

var ThirdChoiceButton = React.createClass({
    onClick: function (){
        third = true;
    },
    render: function() {
        if(this.props.changeButton){
            return(
                <a href="#" data-reveal-id="myModal" className="small button"
                   data-options="close_on_background_click:false;close_on_esc:false;"
                   onClick={this.onClick}>Change</a>
            );
        }else{
            return(
                <a href="#" data-reveal-id="myModal" className="small button"
                   data-options="close_on_background_click:false;close_on_esc:false;"
                   onClick={this.onClick}>Select A Room</a>
            );
        }
    }
});

React.render(<ThirdChoice data="None" changeButton = {false}/>, document.getElementById('third_choice'));

///////////////////////////////////////////////

var Submit_button = React.createClass({
    onClick: function (){
        if (jQuery.isEmptyObject(submission)) {
            alert("You need to at least select one housing in order to proceed!");
        }else{
            //if this key doesn't exist in JSON object
            if (submission["first"] && submission["second"] && submission["third"]){
                React.render(<Confirm data={submission}/>, document.getElementById('confirm'));
                $('#confirmation').foundation('reveal', 'open');
            }else{
                $('#warning').foundation('reveal', 'open');
            }
        }
    },
    render: function() {
        return(
            <a className="small button" onClick={this.onClick}>Submit</a>
        );
    }
});

React.render(<Submit_button />, document.getElementById('submit'));

var Proceed = React.createClass({
    onClickProceed: function (){
        React.render(<Confirm data={submission}/>, document.getElementById('confirm'));
        $('#warning').foundation('reveal', 'close');
        $('#confirmation').foundation('reveal', 'open');
    },
    onClickBack: function (){
        $('#warning').foundation('reveal', 'close');
    },
    render: function() {
        return(
            <div>
                You don't have all three selection made, are you sure you want to proceed?
                {" "}
                <div><a href="#" className="button" onClick={this.onClickProceed}>Proceed</a></div>
                <div><a href="#" className="button" onClick={this.onClickBack}>Back & make more selections</a></div>
            </div>
        );
    }
});

React.render(<Proceed />, document.getElementById('warning_class'));

////////////////////
var Confirm = React.createClass({
    onClickProceed: function (){
        //go on to the selection procedure
        var success = selection(this.props.data);

        if (success){
            React.render(<Congrat data={this.props.data.first}/>, document.getElementById('congrats_content'));
            $('#confirmation').foundation('reveal', 'close');
            $('#congrats').foundation('reveal', 'open');
        }else{
            React.render(<Sorry />, document.getElementById('sorry_content'));
            $('#confirmation').foundation('reveal', 'close');
            $('#sorry').foundation('reveal', 'open');
        }
    },
    onClickBack: function (){
        $('#confirmation').foundation('reveal', 'close');
    },
    render: function() {
        var type = typeof this.props.data;
        if (type=="string"){
            return(
                <div> You need to make a selection!
                    <a href="#" className="button" onClick={this.onClickBack}>Back</a>
                </div>
            );
        }else{
            return(
                <div>
                    These are your choices:
                    <div className="row">
                        <div className="large-4 columns">1st choice:</div>
                        <div className="large-4 columns">{this.props.data.first.dorm}</div>
                        <div className="large-4 columns">{this.props.data.first.room}</div>
                    </div>
                    <Confirm_second data={this.props.data}/>
                    <Confirm_third data={this.props.data}/>
                    <div>Are you sure you want to proceed?</div>
                    <div>
                        <a href="#" className="button" onClick={this.onClickProceed}>
                            Yes, please select my room</a>
                    </div>
                    <div>
                        <a href="#" className="button" onClick={this.onClickBack}>
                            No, I want to change my choice</a>
                    </div>
                </div>
            );
        }
    }
});

var Confirm_second = React.createClass({
    render: function() {
        if(this.props.data.second){
            return (
                <div className="row">
                    <div className="large-4 columns">2nd choice:</div>
                    <div className="large-4 columns">{this.props.data.second.dorm}</div>
                    <div className="large-4 columns">{this.props.data.second.room}</div>
                </div>
            )
        }else{
            return (
                <div className="row"></div>
            )
        }

    }
});

var Confirm_third = React.createClass({
    render: function() {
        if(this.props.data.third){
            return (
                <div className="row">
                    <div className="large-4 columns">3rd choice:</div>
                    <div className="large-4 columns">{this.props.data.third.dorm}</div>
                    <div className="large-4 columns">{this.props.data.third.room}</div>
                </div>
            )
        }else{
            return (
                <div className="row"></div>
            )
        }

    }
});

React.render(<Confirm data=""/>, document.getElementById('confirm'));

//////////////////////////////////////////////////////////////


//TODO disallow user to go back to the selection page
var Congrat = React.createClass({
    render: function() {
        return(
            <div className="center">
                Congratulation! You room will be
                <div className="row">
                    <div className="large-4 columns">{this.props.data.dorm} Hall</div>
                    <div className="large-4 columns">Room {this.props.data.room} </div>
                </div>
                <Roommates />
                <a href="home.html" className="button">
                    <i className="fi-home size-24"></i> Home
                </a>
            </div>
        );
    }
});

var Roommates = React.createClass({
    render: function() {
        var user= getUsername();
        var data= getRoommates(user);
        console.log(JSON.stringify(data));
        if (jQuery.isEmptyObject(data)){//the situation that user doesn't have roommates
            return(
                <div></div>
            );
        }else{
            console.log(JSON.stringify(data));
            return(
                <div>
                    with roommates
                    <div>
                        {data}
                    </div>
                </div>
            );
        }
    }
});

///////!!!!!!!!!!!!!!!
/*var Roommate = React.createClass({
    render: function() {
        var data= getRoommates(user)
        console.log(JSON.stringify(data));
        if (jQuery.isEmptyObject(data)){//the situation that user doesn't have roommates
            return(
                <div></div>
            );
        }else{
            console.log(JSON.stringify(data));
            return(
                <div>
                    with roommates
                    {
                        data.map(function(d) {
                            console.log("the d is: "+ JSON.stringify(d));
                            return (<div>{d}</div>);
                        })
                    }
                </div>
            );
        }
    }
});*/

React.render(<Congrat data=""/>, document.getElementById('congrats_content'));

var Sorry = React.createClass({
    onClick: function() {
        $('#sorry_content').foundation('reveal', 'close');
        //todo refresh original page
    },
    render: function() {
        return(
            <div className="center">
                Sorry! Your didn't get the room you want.... :(
                <div className="row">
                    <a href="#" className="button" onClick={this.onClick}>
                        Reselect room</a>
                </div>
            </div>
        );
    }
});

React.render(<Sorry />, document.getElementById('sorry_content'));





