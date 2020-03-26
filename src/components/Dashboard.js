import React, { Component } from 'react';

class Dashboard extends Component {
    constructor(){
        super()
        this.state = {

        }
    }
    logOut = () => {
        this.props.logOut()
    }

    render() {
        return (
            <div>
                hi {this.props.login.user.username}
                <button onClick={this.logOut}>Log out</button>
            </div>
        );
    }
}

export default Dashboard;