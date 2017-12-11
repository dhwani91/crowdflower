import {
    ADD_TASK,
    SHOW_MODAL,
    SHOW_TOAST,
    DELETE_TASK,
    FETCH_TASKS_REQUEST,
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAILURE,
    SAVE_TASKS_REQUEST,
    SAVE_TASKS_SUCCESS,
    SAVE_TASKS_FAILURE

} from '../actions/actions_task.js';

const intialState = {
    showModal:false,
    showToast:false,
    isLoading:false,
    tasks:[],
    toast:{},
    loadError:null,
    hasTasksChanged:false
}

const taskReducer = (state=intialState,action) => {
    switch (action.type) {

        case ADD_TASK :
            return {
                ...state,
                tasks: [action.payload, ...state.tasks],
                hasTasksChanged: true
                }

        case DELETE_TASK:
            let tasksList = [...state.tasks];
            tasksList.splice(action.payload, 1);

            return Object.assign({}, state, {
                tasks: tasksList,
                hasTasksChanged: true
            })

        case SHOW_MODAL:
            return Object.assign({}, state, {
                showModal: action.payload
            })
        case SHOW_TOAST:
            return Object.assign({}, state, {
                showToast: action.payload
            })
        case FETCH_TASKS_REQUEST :
            return Object.assign({}, state, {
                isLoading: true
            })
        case FETCH_TASKS_SUCCESS :
            return Object.assign({}, state, {
                tasks:action.payload,
                isLoading:false,
                loadError:null
            })
        case FETCH_TASKS_FAILURE :
            return Object.assign({}, state, {
                loadError: action.payload,
                isLoading: false
            })
        case SAVE_TASKS_REQUEST:
            return Object.assign({}, state, {
                isLoading: true
            })

        case SAVE_TASKS_SUCCESS :
            return Object.assign({}, state, {
                isLoading: false,
                showToast:true,
                toast: {
                    type: 'success',
                    message: 'Task saved successfully !'
                }
            })
        case SAVE_TASKS_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
                showToast:true,
                toast: {
                    type: 'error',
                    message: 'Getting Error while Saving your Tasks !'
                }
            })
        default:
            return state;

    }
}
export default taskReducer;
