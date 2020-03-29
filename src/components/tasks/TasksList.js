import React, { Component } from 'react';
import Task from './Task'

class TasksList extends Component {

    render() {
        return (
            <div>
                {this.props.tasks.length === 0 ? 
                <div>Start by adding some tasks!</div>    
                : this.props.tasks.map(t => <Task getTasks={this.props.getTasks} user={this.props.user} task={t}/>)
            }
            </div>
        );
    }
}

export default TasksList;