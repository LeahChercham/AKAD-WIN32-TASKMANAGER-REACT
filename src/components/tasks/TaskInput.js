import React, { Component } from 'react';
import Axios from 'axios';
import '../../styles/Dashboard.css'
import consts from '../../consts'
const CREATE_ROUTE = consts.CREATE_ROUTE

class TaskInput extends Component {
    constructor() {
        super()
        this.state = {
            task: {
                important: false,
                done: false,
                text: "",
                date: "",
                user: {}
            }
        }
    }

    handleChange = event => {
        let task = { ...this.state.task }
        task[event.target.name] = event.target.value
        this.setState({ task })
    }

    handleKeyDown = event => {
        if (event.which === 13 && this.state.task.text) {
            this.saveTask()
        }
    }

    logOut = () => {
        this.props.logOut()
    }
    componentWillMount() {
        document.addEventListener('keydown', this.handleKeyDown)
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    saveTask = () => {
        if (!this.state.task.text) {
            return
        }
        let data = { ...this.state.task }
        data.date = new Date()
        data.user = this.props.login.user._id
        Axios.put(CREATE_ROUTE(`saved/${this.props.login.user.username}`), data).then(() => {
            this.props.getTasks()
        })
        let task = {
            important: false,
            done: false,
            text: "",
            date: "",
            user: {}
        }
        document.getElementById('taskInput').reset()

        this.setState({ task })
    }

    render() {
        return (
            <div className="inputContainer">
                <form id="taskInput">
                    <input
                        className="taskInput"
                        type="text"
                        name="text"
                        placeholder="What do you need to do ?"
                        onChange={this.handleChange} />
                </form>
                <button
                    className="addButton"
                    onClick={this.saveTask}>Add</button>
                <button
                    id="logOutButton"
                    onClick={this.logOut}>Log out</button>
            </div>
        );
    }
}

export default TaskInput;