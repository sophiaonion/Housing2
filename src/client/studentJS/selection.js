/**
 * Created by sophiawang on 2/19/16.
 */

var curr_user = getUsername();

var Selection = React.createClass({
    handleClickHome: function(){
        window.location = './home.html';
    },
    render: function(){
        return (
            <div className="selection">
                <h2>Your current selection are:</h2>
                <List />
                <button onClick={this.handleClickHome}>Homepage</button>
                <button>Submit</button>
            </div>
        );
    }
});

var List = React.createClass({
    render: function(){
        return (
            <ul>
                <li>1st choice:  <button onClick={this.handleClick}>Select A Room</button></li>
                <li>2nd choice:  <button onClick={this.handleClick}>Select A Room</button></li>
                <li>3rd choice:  <button onClick={this.handleClick}>Select A Room</button></li>
            </ul>
        );
    }
});

React.render(<Selection />, document.getElementById('selection'));