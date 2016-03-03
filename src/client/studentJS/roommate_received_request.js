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
        $.ajax({
            url: this.props.url+curr_user,
            dataType: 'json',
            async: false,
            success: function(data) {
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
                    return <ResultChild data = {data} url = {url} />
                })
            }</ul>
        );
    }
});

var ResultChild = React.createClass({
    Accept: function(){
        var id=this.props.data.id;
        $.ajax({
            type: "put",
            url: this.props.url+id+"/"+true,
            dataType: 'json',
            async: false,
            success: function() {
                alert("accept successfully");
                $('#myModal').foundation('reveal', 'close');
                React.render(<NoReceivedRequest />, document.getElementById('no_received_request'));
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    Decline: function(){
        var id = "id"+this.props.data.id;
        $.ajax({
            type: "put",
            url: this.props.url+id+"/"+false,
            dataType: 'json',
            async: false,
            success: function() {
                alert("reject successfully");
                $('#myModal').foundation('reveal', 'close');
                React.render(<NoReceivedRequest />, document.getElementById('no_received_request'));
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function(){
        var name = this.props.data.requester;
        name = getActualName(name);
        var data=name[0].name;
        return (
            <div>
                Received roommate request from: {data} {"  "}
                <a href="#" className="button" onClick={this.Accept}>Accept</a>
                {" "}
                <a href="#" className="button" onClick={this.Decline}>Decline</a>
            </div>
        );
    }
});

React.render(<ReceivedRequest url="/api/requests/"/>, document.getElementById('received_request'));

var NoReceivedRequest = React.createClass({
    render: function() {
        var num= numberOfReceivedRequest();
        console.log("user received this many requests: "+ num);
        if (num == 0){
            return(
                <div>
                    {"No roommate request received"}
                </div>
            );
        }else{
            return(
                <div>
                    <a href="#" data-reveal-id="received_request_Modal" className="small button"> {num}</a>
                    {"roommate request received"}
                </div>
            );
        }
    }
});

React.render(<NoReceivedRequest />, document.getElementById('no_received_request'));