import React, { Component } from 'react';
import SignUp from './authentification/SignUp';
import LogIn from './authentification/LogIn';

class Home extends Component {
    constructor() {
        super()
        this.state = {
            showLogIn: true,
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
                {this.state.showLogIn ?
                    <div>
                        <div>
                            <div>Log In</div>
                            <div>
                                New here ?
                            </div>
                            <button onClick={this.showSignUp}>Sign Up</button>
                        </div>
                        <LogIn logIn={this.props.logIn} />

                    </div> :
                    <div>
                        <div>
                            <div>Sign Up</div>
                            <div>
                                Already have an account?
                            </div>
                            <button onClick={this.showLogIn}>Log in</button>
                        </div>
                        <SignUp showLogIn={this.showLogIn} />
                    </div>

                }
            </div>

        );
    }
}

export default Home;