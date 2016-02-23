/**
 * Created by sophiawang on 2/19/16.
 */

//get a list of request that other people send me
var ReceivedRequest = React.createClass({
    getInitialState: function(){
        return {data: []};
    },
    componentDidMount: function(){
        var curr_user = getUsername();
        console.log("Roommate_request_one; current user is: "+ curr_user);
        $.ajax({
            url: this.props.url+curr_user,
            dataType: 'json',
            async: false,
            success: function(data) {
                console.log("Successfully get the data: "+ data);
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function(){
        return (
            <div className="requests-list">
                <h3>Below is the list of request that you received: </h3>
                <ReceivedRequestList data={this.state.data}/>
            </div>
        );
    }
});

//TODO 6. approve roommate request
var ReceivedRequestList = React.createClass({
    render: function() {
        return(
            <ul>{
                this.props.data.map(function(data) {
                    return (<li>requester:{data.requester} </li>);
                })
            }</ul>
        );
    }
});

React.render(<ReceivedRequest url="/api/requests/"/>, document.getElementById('received_request'));