
//TODO: need to think about the situation when there are a lot of things on the list, how am I going to show?
var RoomList = React.createClass({
    getInitialState: function(){
        return {data: []};
    },
    componentDidMount: function() {
        //Ajax call to get fetch data from server
        $.ajax({
            url: this.props.url, //this url thing probably need to change
            dataType: 'json',
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        //TODO set interval to get update from time to time
    },
    filterList: function(event){
        var updatedList = this.state.data.filter(function(item){
            return item.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1;
        });
        this.setState({data: updatedList});
    },
    render: function(){
        return (
            <div className="room-list">
                <input type="text" placeholder="Search" onChange={this.filterList}/>
                <List data={this.state.data}/>
                <button>Submit</button>
            </div>
        );
    }
});

var List = React.createClass({
    render: function(){
        return (
            <ul>
                {
                    this.props.data.map(function(room) {
                        return (<li>{room.dorm} {room.room_number}</li>);
                    })
                }
            </ul>
        );
    }
});

React.render(<RoomList url="/api/rooms"/>, document.getElementById('mount-point'));