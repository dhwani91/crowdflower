import {combineReducers} from 'redux';
import TaskListReducer from './reducer_tasks.js';
const rootReducer = combineReducers({
    task:TaskListReducer
})

export default rootReducer;
