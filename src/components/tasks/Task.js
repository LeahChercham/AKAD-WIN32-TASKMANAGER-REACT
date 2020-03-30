import React, { Component } from 'react';
import Axios from 'axios';
import { FaExclamationCircle, FaRegTrashAlt } from 'react-icons/fa'
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import '../../styles/Task.css'
import consts from '../../consts'
const CREATE_ROUTE = consts.CREATE_ROUTE
class Task extends Component {


    updateTask = (setting) => {
        Axios.put(CREATE_ROUTE(`tasks/${this.props.user.username}/${setting}`), this.props.task).then(() => {
            this.props.getTasks()
        })
    }
    updateTaskImportant = () => {
        this.updateTask("important")
    }

    updateTaskDone = () => {
        this.updateTask("done")
    }

    deleteTask = () => {
        Axios.delete(CREATE_ROUTE(`tasks/${this.props.user.username}/${this.props.task._id}`)).then(() => {
            this.props.getTasks()
        })
    }
    render() {
        const task = this.props.task
        return (
            <div className="taskContainer">
                {task.important ?
                    <div
                        name="important"
                        onClick={this.updateTaskImportant}>
                        <FaExclamationCircle
                            className="icon important" 
                            id={(task.done ? "doneImportant" : null)} />
                    </div>
                    : <div
                        name="important"
                        onClick={this.updateTaskImportant}>
                        <AiOutlineExclamationCircle className="icon notImportant" />
                    </div>
                }
                {
                    task.done ?
                        <div
                            className="doneTask"
                            name="done"
                            onClick={this.updateTaskDone}>
                            <MdCheckBox className="icon" />
                        </div> :
                        <div
                            name="done"
                            onClick={this.updateTaskDone}>
                            <MdCheckBoxOutlineBlank className="icon" />
                        </div>
                }
                <div className={"taskText "
                    + (task.important ? "importantTask " : " ")
                    + (task.done ? "doneTask" : null)}>
                    {task.text}
                </div>
                <div onClick={this.deleteTask}><FaRegTrashAlt className={"icon " + (task.done ? "doneTrash" : null)} /></div>
            </div>
        );
    }
}

export default Task;