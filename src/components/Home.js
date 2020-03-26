import React, { Component } from 'react';
import SignUp from './authentification/SignUp';

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
                <SignUp showLogIn={this.showLogIn}/>    : <div>don't showSignUp</div>
            }

            </div>
        );
    }
}

export default Home;