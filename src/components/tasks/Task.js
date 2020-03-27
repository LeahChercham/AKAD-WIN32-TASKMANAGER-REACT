import React, { Component } from 'react';
import Axios from 'axios';

class Task extends Component {


    updateTask = event => {
        let name = event.target.attributes.name.value
        Axios.put(`http://localhost:4000/tasks/${this.props.user.username}/${name}`, this.props.task).then(() => {
            this.props.getTasks()
        })
    }
    render() {
        const task = this.props.task
        return (
            <div>
                {task.important ?
                    <div name="important"
                        onClick={this.updateTask}>IMPORTANT</div>
                    : <div name="important" onClick={this.updateTask}>NOT IMPORTANT</div>
                }
                {
                    task.done ?
                        <div name="done" onClick={this.updateTask}>DONE</div> :
                        <div name="done" onClick={this.updateTask}>Not DONE</div>
                }
                <div>{task.done}</div>
                <div>{task.text}</div>
            </div>
        );
    }
}

export default Task;