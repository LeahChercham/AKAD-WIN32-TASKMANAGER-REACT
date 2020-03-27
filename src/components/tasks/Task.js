import React, { Component } from 'react';
import Axios from 'axios';
import { FaExclamationCircle, } from 'react-icons/fa'
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
class Task extends Component {


    updateTaskImportant = () => {
        let name = "important"
        Axios.put(`http://localhost:4000/tasks/${this.props.user.username}/${name}`, this.props.task).then(() => {
            this.props.getTasks()
        })
    }

    updateTaskDone = () => {
        let name = "done"
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
                        onClick={this.updateTaskImportant}><FaExclamationCircle className="icon" /></div>
                    : <div name="important" onClick={this.updateTaskImportant}><AiOutlineExclamationCircle className="icon" /></div>
                }
                {
                    task.done ?
                        <div name="done" onClick={this.updateTaskDone}><MdCheckBox className="icon" /></div> :
                        <div name="done" onClick={this.updateTaskDone}><MdCheckBoxOutlineBlank className="icon" /></div>
                }
                <div>{task.done}</div>
                <div>{task.text}</div>
            </div>
        );
    }
}

export default Task;