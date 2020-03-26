import React, { Component } from 'react';
import Axios from 'axios';

class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            newUser: {
                username: "",
                password: ""
            },
            newUsername: {
                taken: true,
                username: "",
            }
        }
    }

    verifyForm = () => {

    }

    handleUsername = event => {
        let newUsername = {...this.state.newUsername}
        newUsername.name = event.target.value
        if(event.target.value){
            // let response = Axios.get()
            if(response.data){
                newUsername.taken = true
            } else {
                newUsername.taken = false
            }
        }
    }

    handleChange = event => {
        let newUser = {...this.state.newUser}
        let name = event.target.name
        let value = event.target.value
        newUser[name] = value
        this.setState({newUser: newUser})
    }

    render() {
        return (
            <div>
                <div>Sign Up</div>
                <form onSubmit={this.verifyForm}>
                    <label>
                        <div>Chose your username:</div>
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            onChange={this.handleUsername} />
                        <div>
                            {this.state.newUsername.username ?
                                this.state.newUsername.taken ?
                                    <div>This username is already taken</div>
                                    : <div>This username is free</div>
                                : null}
                        </div>
                    </label>
                    <label>
                        <div>Chose your password:</div>
                        <input
                            type="password"
                            name="password"
                            palceholder="password"
                            onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default SignUp;