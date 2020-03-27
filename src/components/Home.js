import React, { Component } from 'react';
import SignUp from './authentification/SignUp';
import LogIn from './authentification/LogIn';
import '../styles/Home.css'

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
            <div className="homeContainer">
                {this.state.showLogIn ?
                    <div>
                        <div className="homeTitle">Log In</div>
                        <div>
                            <span>
                                New here ?
                            </span>
                            <button onClick={this.showSignUp}>Sign Up</button>
                        </div>
                        <LogIn logIn={this.props.logIn} />

                    </div> :
                    <div>
                        <div className="homeTitle">Sign Up</div>
                        <div>
                            <span>
                                Already have an account?
                            </span>
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