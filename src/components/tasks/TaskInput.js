import React, { Component } from 'react';
import Axios from 'axios';

class TaskInput extends Component {
    constructor() {
        super()
        this.state = {
            task: {
                important: false,
                done: false,
                text: "",
                date: "",
            }
        }
    }

    handleChange = event => {
        let task = { ...this.state.task }
        task[event.target.name] = event.target.value
        this.setState({ task })
    }

    saveTask = () => {
        let data = { ...this.state.task }
        data.date = new Date()
        Axios.post(`http://localhost:4000/saved/${this.props.login.user.username}`, data)
        let task = {
            important: false,
            done: false,
            text: "",
            date: "",
        }
        this.setState({ task })
    }
    render() {
        return (
            <div>
                <input
                    type="text"
                    name="task"
                    placeholder="What do you need to do ?"
                    onChange={this.handleChange} />
                <button onClick={this.saveTask}>Add</button>
            </div>
        );
    }
}

export default TaskInput;