/**
 * Created by sophiawang on 2/19/16.
 */

var curr_user = getUsername();

var getActualName= function(user){
    var value;
    $.ajax({
        url: "/api/users/"+user, //this url thing probably need to change
        dataType: 'json',
        async: false,
        success: function(data) {
            console.log("the data is: "+ JSON.stringify(data));
            value= data;
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }.bind(this)
    });
    console.log("the return value is: "+JSON.stringify(value));
    return value;
}

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
                console.log("this is the data before setState: "+ JSON.stringify(data));
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
        console.log("rendered");
        return (
            <div>
                {this.props.data.map(function(data) {
                     delete data["id"]; delete data["gp_lottery"]; delete data["room_id"]; delete data["delegate"];
                     jQuery.each(data, function(element, value) {
                        if (value && (value != curr_user)){
                            var name = getActualName(value);
                            return (<li> {name[0].name} </li>);
                        }
                     });
                   })
                }
           </div>
        );
    }
});

React.render(<Roommates url="/api/roommates/"/>, document.getElementById('current_roommate'));


