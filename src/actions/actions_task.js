export const ADD_TASK = 'ADD_TASK';
export const SHOW_MODAL = 'SHOW_MODAL';
export const SHOW_TOAST = 'SHOW_TOAST';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASK_TITLE = 'UPDATE_TASK_TITLE';
export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';
export const SAVE_TASKS_REQUEST ='SAVE_TASKS_REQUEST';
export const SAVE_TASKS_SUCCESS = 'SAVE_TASKS_SUCCESS';
export const SAVE_TASKS_FAILURE = 'SAVE_TASKS_FAILURE';

import axios from 'axios';
const ROOT_URL = 'http://cfassignment.herokuapp.com/dhwani/tasks';


export const showModal = (bool) => {
    return{
        type:SHOW_MODAL,
        payload:bool
    }
}
export const showToast =(bool)=>{
    return{
        type:SHOW_TOAST,
        payload:bool
    }
}
export const addTask =(task)=>{
    return {
        type:ADD_TASK,
        payload:task
    }
}
export const updateTaskTitle = (title, index) => {
    return {
        type: UPDATE_TASK_TITLE,
        payload: { title, index }
    }
}

export const deleteTask = (taskIndex) =>{
    return{
       type:DELETE_TASK,
       payload:taskIndex
   }
}
export const saveTaskRequest = (task) => {
   return{
       type:SAVE_TASKS_REQUEST,
       payload:task
   }
}
export const saveTaskSuccess = (response) => {
    return{
        type:SAVE_TASKS_SUCCESS,
        payload:response
    }
}
export const saveTaskFailure = (err) => {
    return{
        type:SAVE_TASKS_FAILURE,
        payload:err
    }
}
export const fetchTaskRequest =() =>{
    return{
        type:FETCH_TASKS_REQUEST
    }
}
export const fetchTaskSuccess=(response) => {
    return {
        type:FETCH_TASKS_SUCCESS,
        payload:response.data.tasks
    }
}
export const fetchTaskFailure = (err) => {
    return {
        type:FETCH_TASKS_FAILURE,
        payload:err
    }
}
export function saveTasks (tasks)  {
    return dispatch =>{
         dispatch(saveTaskRequest(tasks))

        return axios.post(`${ROOT_URL}`,{tasks:tasks})
            .then(res => {
                dispatch(saveTaskSuccess(res))
                })
            .catch(err => {
                dispatch(saveTaskFailure(err))
            })
    };
}
export function fetchTasks() {
    return dispatch => {
        dispatch(fetchTaskRequest())
        return axios.get(`${ROOT_URL}`)
            .then(response =>
           {dispatch(fetchTaskSuccess(response))
            })
            .catch(error => {
                dispatch(fetchTaskFailure(error))
            })
    }
}
