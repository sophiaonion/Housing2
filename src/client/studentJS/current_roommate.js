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
                <div>
                </div>
            );
        }else{
            return (
                <div>
                    <h3>Your current roommates:</h3>
                    <Result data={this.state.data}/>
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
        return (//TODO I don't think this is right, need to come back and check
            <li>
                <div className="circle-bg">
                    {names}
                </div>
            </li>
        );
    }
});

React.render(<Roommates url="/api/roommates/"/>, document.getElementById('current_roommate'));


