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
                <ReceivedRequestList data={this.state.data} url = {this.props.url}/>
            </div>
        );
    }
});

var ReceivedRequestList = React.createClass({
    render: function() {
        var url = this.props.url;
        return(
            <ul>{
                this.props.data.map(function(data) {
                    return <ResultChild data = {data} url = {url}/>
                })
            }</ul>
        );
    }
});

var ResultChild = React.createClass({
    onClick: function(){
        var id = this.props.data.id;
        $.ajax({
            type: "put",
            url: this.props.url+"put/"+id,
            dataType: 'json',
            async: false,
            success: function() {
                alert("Cancel successfully");
                $('#myModal').foundation('reveal', 'close');
                React.render(<NoSentRequest />, document.getElementById('no_sent_request'));
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function(){
        var name = this.props.data.receiver;
         name = getActualName(name);
        var data=name[0].name;
        return (
            <div>
                You are waiting for confirmation from: {data} {"  "}
                <a href="#" className="button" onClick={this.onClick}>Cancel</a>
            </div>
        );
    }
});

React.render(<SentRequest url="/api/requests/sent/"/>, document.getElementById('sent_request'));


var NoSentRequest = React.createClass({
    render: function() {
        var num= numberOfSentRequest();
        console.log("user sent this many requests: "+ num);
        if (num == 0){
            return(
                <div>
                    {"No roommate request sent"}
                </div>
            );
        }else {
            return (
                <div>
                    <a href="#" data-reveal-id="sent_request_Modal" className="small button"> {num}</a>
                    {"roommate request sent"}
                </div>
            );
        }
    }
});

React.render(<NoSentRequest />, document.getElementById('no_sent_request'));