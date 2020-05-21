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

    componentDidMount() {
        this.nameInput.focus();
    }

    saveTask = () => {

        // Falls kein Text im Task-Eingabefeld vorhanden ist, soll der Task auch nicht gespeichert werden
        if (!this.state.task.text) return

        let data = { ...this.state.task } // Spread Syntax: Erstellt eine Kopie des States
        data.date = new Date()
        data.user = this.props.login.user._id // Bekommt Daten der übergeordneten Komponente (Dashboard.js)

        // Hier wird der Auftrag an das Back-End übergeben
        Axios.put(CREATE_ROUTE(`saved/${this.props.login.user.username}`), data)
            .then(() => { // Nachdem der neue Task auf der Datenbank gespeichert wurde...
                this.props.getTasks() // ... Hole alle Tasks erneut aus der Datenbank
            })

        let task = { // Die Struktur des Objektes in Anlehnung an das Mongoose Schema
            important: false,
            done: false,
            text: "",
            date: "",
            user: {}
        }

        document.getElementById('taskInputForm').reset() // Leert das Eingabefeld
        this.setState({ task }) // Der Task im State der Komponente wird geleert

    }

    render() {
        return (
            <div className="inputContainer">
                <form id="taskInputForm">
                    <input
                        ref={(input) => { this.nameInput = input; }}
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