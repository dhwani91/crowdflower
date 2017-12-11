import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/actions_task.js';

class NewTaskContainer extends Component {
 constructor(props){
     super(props)
     this.closeModal= this.closeModal.bind(this);
     this.updateTitle= this.updateTitle.bind(this);
 }
    handleAddNewTask(e) {
        let taskTitle= e.target.value;
       this.props.addTask({
           title:taskTitle
       })
        this.closeModal();
    }
    updateTitle(e) {
        if (e.key === 'Enter') {
        console.log("e",e)
            e.target.previousElementSibling.blur();
            this.handleAddNewTask(e)
        }
    }
  closeModal() {
    this.props.showModal(false)
  }
  render() {
    const {isModalOpen}=this.props;
    return (
      <div id="newTaskModal" className="overlay">
        <div className="modal-content">
          <span className="modal-close" onClick={this.closeModal}>&times;
          </span>
          <textarea
            rows="1"
            className="task-title"
            placeholder="Add Title"
            onKeyDown={e => this.updateTitle(e)}
            col="5"></textarea>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        tasks: state.task.tasks,
        isModalOpen:state.task.showModal
    }
}

export default connect(mapStateToProps,Actions)(NewTaskContainer);
