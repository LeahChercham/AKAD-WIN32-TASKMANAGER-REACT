import React, { Component } from 'react';
import TaskInput from './tasks/TaskInput'
import Axios from 'axios'
import TasksList from './tasks/TasksList'

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
            let tasks = [...this.state.tasks]
            tasks = response.data.tasks
            console.log(tasks);
            this.setState({tasks})
        })
    }
    componentDidMount(){
        this.getTasks()
    }


    render() {
        return (
            <div>
                <div>
                    <div>
                        hi {this.props.login.user.username}
                    </div>
                    <button onClick={this.logOut}>Log out</button>
                    <TaskInput login={this.props.login} />
                    <TasksList getTasks={this.getTasks} tasks={this.state.tasks}/>

                </div>

            </div>
        );
    }
}

export default Dashboard;