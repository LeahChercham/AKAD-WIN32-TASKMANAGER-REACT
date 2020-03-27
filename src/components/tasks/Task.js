import React, { Component } from 'react';

class Task extends Component {
    render() {
        const task = this.props.task
        return (
            <div>
                <div>{task.important}</div>
                <div>{task.done}</div>
                <div>{task.text}</div>
            </div>
        );
    }
}

export default Task;