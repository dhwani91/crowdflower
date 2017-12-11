import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import reducers from './src/reducers';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import TaskListContainer from './src/containers/TaskListContainer.js';
import App from './src/containers/HeroContainer.js';
import './src/stylesheets/main.scss';

const logger = createLogger({
    collapsed: true
});
let createStoreWithMiddleware;

createStoreWithMiddleware = createStore(
    reducers,
    compose(applyMiddleware(logger),applyMiddleware(thunkMiddleware))
);

document.addEventListener('DOMContentLoaded',() => {
    ReactDOM.render((
        <Provider store={createStoreWithMiddleware}>
          <App />
        </Provider>
    ), document.getElementById('app'));
});
