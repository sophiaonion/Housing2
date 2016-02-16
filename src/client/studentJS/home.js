/**
 * Created by sophiawang on 2/10/16.
 */

var Choice = React.createClass({
    getInitialState() {
        return {email: ''}
    },
    handleChange(e) {
        this.setState({email: e.target.value})
    },
    render: function(){
        return (
            <div>
                <input name="email" value={this.state.email} onChange={this.handleChange}/>
                <button type="button" disabled={!this.state.email}>Button</button>
                <a href="#" class="small button"> Check Available Rooms </a>
            </div>

            /*<a href="#" class="small button">
              Select Roommate
            </a>
            <a href="#" class="small button">
              Check Available Housing
            </a>*/
        );
    }
});

var WelcomeMsg = React.createClass({
    render: function(){
        return (
            <div>
                Welcome
            </div>
        )
    }
});

React.render(<Choice/>, document.getElementById('content'));
