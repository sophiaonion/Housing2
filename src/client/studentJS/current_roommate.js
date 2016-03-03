/**
 * Created by sophiawang on 2/19/16.
 */

var curr_user = getUsername();

//TODO convert all the username to people's actual name
//show a list of roomlist after user click on search
var Roommates = React.createClass({
    getInitialState: function(){
        return {data: [], single: false};
    },
    componentDidMount: function() {
        //Ajax call to get fetch data from server
        $.ajax({
            url: this.props.url+curr_user, //this url thing probably need to change
            dataType: 'json',
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
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function(){
        if (this.state.single){
            return (
                <div className="roommate-list">
                    <h3>You currently do not have any roommates</h3>
                </div>
            );
        }else{
            return (
                <div className="roommate-list">
                    <h3>Your current roommates are:</h3>
                    <Result data={this.state.data}/>
                </div>
            );
        }
    }
});

var Result = React.createClass({
    render: function(){
        var result=(
            <div>
                {this.props.data.map(function(data) {
                    return <ResultChild roommates={data}/>
                })
                }
            </div>
        );
        return result;
    }
});

var ResultChild = React.createClass({
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
            <div>
                {names} //TODO I don't think this is right, need to come back and check
            </div>
        );
    }
});

React.render(<Roommates url="/api/roommates/"/>, document.getElementById('current_roommate'));


