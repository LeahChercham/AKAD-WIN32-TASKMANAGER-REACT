import React, { Component } from 'react';
import TaskInput from './tasks/TaskInput'
import Axios from 'axios'
import TasksList from './tasks/TasksList'
import '../styles/Dashboard.css'

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            tasks: []
        }
    }
    logOut = () => {
        this.props.logOut()
    }

    getTasks = () => {
        let login = JSON.parse(localStorage.login)
        let user = login.user
        Axios.get(`http://localhost:4000/tasks/${user.username}`).then((response) => {
            let tasks = response.data.tasks
            this.setState({ tasks })
        })
    }
    componentDidMount() {
        this.getTasks()
    }


    render() {
        return (
            <div className="dashboardContainer">
                <div className="bannerContainer">
                    <div id="welcomeMessage">
                        Welcome {this.props.login.user.username}!
                    </div>
                    <button onClick={this.logOut}>Log out</button>
                </div>
                <TaskInput getTasks={this.getTasks} login={this.props.login} />
                <TasksList getTasks={this.getTasks} user={this.props.login.user} tasks={this.state.tasks} />

            </div>
        );
    }
}

export default Dashboard;