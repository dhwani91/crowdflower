import React from 'react';
const Menu = ({hasTasksChanged, handleSaveTasks, displayModal}) => {
    return (
        <div className="top-bar">
            <div className="float-left">
                <h2 className='App-title'>Tasks</h2>
            </div>
            <div className="float-right">
                <button
                    className="btn btn-add"
                    onClick={displayModal}>Add Task
                </button>
                <button
                    disabled={!hasTasksChanged}
                    className="btn btn-save"
                    onClick={handleSaveTasks}>Save</button>
            </div>
            <div className="clear"> </div>
        </div>
    );
}
export default Menu
