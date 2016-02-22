/**
 * Created by sophiawang on 2/19/16.
 */

var curr_user = getUsername();

//TODO convert all the username to people's actual name
//show a list of roomlist after user click on search
var Roommates = React.createClass({
    getInitialState: function(){
        return {data: []};
    },
    componentDidMount: function() {
        //Ajax call to get fetch data from server
        $.ajax({
            url: this.props.url+curr_user, //this url thing probably need to change
            dataType: 'json',
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
                    <h2>You currently do not have any roommates</h2>
                </div>
            );
        }else{
            return (
                <div className="roommate-list">
                    <h2>Your current roommates are:</h2>
                    <Result data={this.state.data}/>
                </div>
            );
        }

    }
});

var Result = React.createClass({
    render: function(){
        return (
            <ul>{
                this.props.data.map(function(data) {
                    if (curr_user == data.rm1){
                        return (
                            <li> {data.rm2} {data.rm3} {data.rm4}</li>
                        );
                    }else if (curr_user == data.rm2){
                        return (
                            <li> {data.rm1} {data.rm3} {data.rm4}</li>
                        );
                    }else if (curr_user == data.rm3){
                        return (
                            <li> {data.rm1} {data.rm2} {data.rm4}</li>
                        );
                    }else {
                        return (
                            <li> {data.rm1} {data.rm2} {data.rm3}</li>
                        );
                    };
                })
            }</ul>
        );
    }
});

React.render(<Roommates url="/api/roommates/"/>, document.getElementById('current_roommate'));


