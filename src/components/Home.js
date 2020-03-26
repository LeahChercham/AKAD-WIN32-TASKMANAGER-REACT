import React, { Component } from 'react';

class Home extends Component {
    constructor() {
        super()
        this.state = {
            showLogIn: false,
            showSignUp: false,
        }
    }

    showLogIn = () => {
        this.setState({ showLogIn: true, showSignUp: false })
    }

    showSignUp = () => {
        this.setState({ showLogIn: false, showSignUp: true })
    }

    render() {
        return (
            <div>
                <button onClick={this.showLogIn}>Log In</button>
                <button onClick={this.showSignUp}>Sign Up</button>
                {this.state.showLogIn ?
                    <div>Show Login</div> : <div>Don't show Login</div>
                }
                {this.state.showSignUp ?
                <div>Show Signup</div>    : <div>don't showSignUp</div>
            }

            </div>
        );
    }
}

export default Home;