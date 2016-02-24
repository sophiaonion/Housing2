/**
 * Created by sophiawang on 2/23/16.
 */

/**
 * Created by sophiawang on 2/19/16.
 */

//get a list of request that other people send me
var SentRequest = React.createClass({
    getInitialState: function(){
        return {data: []};
    },
    componentDidMount: function(){
        var curr_user = getUsername();
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
                <ReceivedRequestList data={this.state.data}/>
            </div>
        );
    }
});

//TODO approve roommate request
var ReceivedRequestList = React.createClass({
    render: function() {

        return(
            <ul>{
                this.props.data.map(function(data) {
                    return <ResultChild data = {data.receiver}/>
                })
            }</ul>
        );
    }
});

var ResultChild = React.createClass({
    render: function(){
        var name = this.props.data;
         name = getActualName(name);
        var data=name[0].name;
        return (
            <div>
                You are waiting for confirmation from: {data}
            </div>
        );
    }
});

React.render(<SentRequest url="/api/requests/sent/"/>, document.getElementById('sent_request'));