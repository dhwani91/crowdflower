import React from 'react';

const Toast = ({actionType, message, closeToast, isToastOpen}) => {
        return (
        <div className={`toast toast-${actionType}`} onClick={closeToast}>
            <span className="toast-text">
            {message}
            </span>
            <span
                className={`close close-${actionType}`}
                onClick={closeToast}
            >&times;
        </span>
        </div>
        )
}



export default Toast;
