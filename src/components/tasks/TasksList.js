import React, { Component } from 'react';
import Task from './Task'

class TasksList extends Component {

    render() {
        console.log(this.props.tasks);
        return (
            <div>
                {this.props.tasks.length === 0 ? 
                <div>empty</div>    
                : this.props.tasks.map(t => <Task task={t}/>)
            }
            taskslist
            </div>
        );
    }
}

export default TasksList;