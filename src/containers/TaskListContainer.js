import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions_task.js';
import Header from '../components/header.jsx';
import Toast from '../components/toast.jsx';
import Task from '../components/task.jsx';
import Menu from '../components/menu.jsx';
import NewTaskContainer from './NewTaskContainer.js';

class TasksContainer extends Component {
    constructor(props) {
        super(props)
        this.closeToast = this.closeToast.bind(this)
        this.removeTask= this.removeTask.bind(this);
        this.handleSaveTasks=this.handleSaveTasks.bind(this);
        this.titleUpdateOnEnter=this.titleUpdateOnEnter.bind(this);
        this.titleUpdateOnBlur=this.titleUpdateOnBlur.bind(this)
        this.displayModal=this.displayModal.bind(this);
        this.closeToast=this.closeToast.bind(this);
    }
    componentDidMount() {
        this.props.fetchTasks()
    }
    removeTask(index) {
        this.props.deleteTask(index)
    }
    handleSaveTasks() {
        this.props.saveTasks(this.props.tasks)
    }
    titleUpdateOnEnter(e, index) {
        if (e.key === 'Enter') {
            //This will trigger handleTitleUpdateOnBlur
            //allowing update to happen on both Enter and Blur
            e.target.blur();
        }
    }
    titleUpdateOnBlur(e, index) {
        // Only dispatch if the new title is different from the store's
        if (this.props.tasks[index].title !== e.target.value) {
            this.props.updateTaskTitle(e.target.value, index)
        }
    }
    displayModal() {
        this.props.showModal(true)
    }

    closeToast() {
        this.props.showToast(false)
    }
    render() {
        return (
            <div className="task-list">
                <Menu
                    displayModal={this.displayModal}
                    handleSaveTasks={this.handleSaveTasks}
                    hasTasksChanged={this.props.hasTasksChanged}
                />
                <ul className="list">
                    {this.props.tasks!==null &&
                    this.props.tasks.map((task, i) =>
                            <Task
                                task={task}
                                key={`${task.title}-${i}`}
                                index={i}
                                removeTask={this.removeTask}
                                titleUpdateOnEnter={this.titleUpdateOnEnter}
                                titleUpdateOnBlur={this.titleUpdateOnBlur}
                            />
                        )
                    }
                </ul>
                {this.props.isModalOpen &&
                <NewTaskContainer displayModal={this.displayModal}/>
                }
                {this.props.isToastOpen &&
                <Toast
                    isToastOpen={this.props.isToastOpen}
                    actionType={this.props.toast.type}
                    message={this.props.toast.message}
                    closeToast={this.closeToast}
                />
                }
                    </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.task.tasks,
        isModalOpen: state.task.showModal,
        hasTasksChanged: state.task.hasTasksChanged,
        isToastOpen: state.task.showToast,
        toast:state.task.toast,
        isLoading:state.task.isLoading
    };
};
export default connect(mapStateToProps,Actions)(TasksContainer);
