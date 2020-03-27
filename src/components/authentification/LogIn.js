import React, { Component } from 'react';
import '../../styles/Home.css'

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

    logIn = async (event) => {
        event.preventDefault()
        await this.props.logIn(this.state.user.username, this.state.user.password)
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
            <form onSubmit={this.logIn}>
                <div className="formGrid">
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
                    <input className="btn" type="submit" value="Submit" />
                    </div>
                </form>
        );
    }
}

export default LogIn;