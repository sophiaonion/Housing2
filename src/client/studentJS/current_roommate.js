/**
 * Created by sophiawang on 2/19/16.
 */

var curr_user = getUsername();

//show a list of roomlist after user click on search
var Roommates = React.createClass({
    getInitialState: function(){
        return {data: [], single: false};
    },
    componentDidMount: function() {
        //Ajax call to get fetch data from server
        $.ajax({
            url: this.props.url+curr_user, //this url thing probably need to change
            //dataType: 'json',
            async: false,
            success: function(data) {
                if (data == "Single"){
                    this.setState({data: data, single: true});
                }
                if (data != "Single")
                {
                    this.setState({data: data, single: false});
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    },
    render: function(){
        if (this.state.single){
            return (
                <div>
                </div>
            );
        }else{
            return (
                <div>
                    <h3>Your current roommates:</h3>
                    <Result data={this.state.data}/>
                    <hr />
                </div>
            );
        }
    }
});

var Result = React.createClass({
    render: function(){
        return (
            <div className="small-12 columns">
                <ul className = "small-block-grid-3">
                    {
                        this.props.data.map(function(data) {
                            return <ResultChild roommates={data}/>
                        })
                    }
                </ul>
            </div>
        );
    }
});

var ResultChild = React.createClass({
    getInitialState:function() {
           return {
               isHovering: false,
            isActive: false,};
    },
    render: function(){
        var data = this.props.roommates;
        delete data["id"]; delete data["gp_lottery"]; delete data["room_id"]; delete data["delegate"];
        var names=[];
        jQuery.each(data, function(element, value) {
            if (value && (value.localeCompare(curr_user) != 0)){
                var actual_name = getActualName(value);
                names.push(actual_name);
            }
        });
        return (
            <li>{
                names.map(function(name) {
                    return (
                        <div className="circle-bg tooltipcustom" >
                            {name}
                            <Dropdown name={name}/>
                        </div>
                    );
                })
            }
            </li>
        );

    }
});

var Dropdown = React.createClass({
    render: function(){
        return (
            <div className="tooltiptext">
                <div><DelegateRoommate data={this.props.name}/></div>
                <div><DeleteRoommate data={this.props.name}/></div>
            </div>
        );
    }
});

var DelegateRoommate = React.createClass({
    onClick: function(){
        var roommate_username = getUsername(this.props.data);
        $.ajax({
            type: 'PUT',
            url: this.props.url+"/delegate/"+roommate_username, //this url thing probably need to change
            async: false,
            success: function(data) {
                alert("Success");
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function(){
        return (
            <a href="#" onClick={this.onClick}>
                Delegate
            </a>
        );
    }
});

var DeleteRoommate = React.createClass({
    onClick: function(){
        $('#delete_confirmation_Modal').foundation('reveal', 'open');
    },
    render: function(){
        return (
            <a href="#" onClick={this.onClick}>Delete
            </a>
        );
    }
});

React.render(<Roommates url="/api/roommates/"/>, document.getElementById('current_roommate'));

var Delete_warning = React.createClass({
    clickCancel: function(){
        $('#delete_confirmation_Modal').foundation('reveal', 'close');
    },
    onClick: function(){

        $.ajax({
            type: 'DELETE',
            url: this.props.url+curr_user, //this url thing probably need to change
            //dataType: 'json',
            async: false,
            success: function(data) {
                alert("Success");
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        $('#delete_confirmation_Modal').foundation('reveal', 'close');
        location.reload();
    },
    render: function() {
        return (
            <div className="text-center">
                <p>{"Are you sure?"}</p>
                <p><a href="#" className="button" onClick={this.onClick}>
                    Yes
                </a></p>
                <p> <a href="#" className="button" onClick={this.clickCancel}>
                    Cancel
                </a></p>
            </div>
        )
    }
});

React.render(<Delete_warning url="/api/roommates/"/>, document.getElementById('delete_confirmation'));

