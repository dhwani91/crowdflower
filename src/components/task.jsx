import React from 'react';
const Task = ({task, index, handleTitleEditing, removeTask, titleUpdateOnEnter, titleUpdateOnBlur}) => {
    return (
        <li className="list-task">
      <textarea
          rows="1"
          className="task-title"
          onKeyDown={e => titleUpdateOnEnter(e, index)}
          onBlur={e => titleUpdateOnBlur(e, index)}
          defaultValue={task.title}
          col="5"/>
            <i
                className="fa fa-trash-o light-grey right icon-remove"
                onClick={e => removeTask(index)}
            />
        </li>
    );
}

export default Task

