import React, { Component } from 'react';

class LogIn extends Component {
    constructor() {
        super()
        this.state = {
            user: {
                username: "",
                password: "",
            }

        }
    }

    logIn = event => {
        event.preventDefault()
        this.props.logIn(this.state.user.username, this.state.user.password)
    }

    handleChange = event => {
        let name = event.target.name
        let value = event.target.value
        let user = { ...this.state.user }
        user[name] = value
        this.setState({ user })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.logIn}>
                    <label>
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            onChange={this.handleChange} />
                    </label>
                    <label>
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default LogIn;