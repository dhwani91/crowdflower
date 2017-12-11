import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/actions_task.js';
import Header from '../components/header.jsx';
import TaskList from './TaskListContainer.js';
import Loader from '../components/loader.jsx';

class HeroContainer extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {isLoading,loadError}= this.props
        return (
            <div className="App">
                <Header />
                <div className="App-tasks container">
                    {isLoading &&
                    <Loader />
                    }
                    <TaskList />
                  {/*<TaskList />*/}
                    {/*{loadError &&*/}
                    {/*<div className="error">*/}
                        {/*<h1 className="error-text">We're having trouble loading your tasks. Please try refreshing the page.*/}
                        {/*</h1>*/}
                    {/*</div>*/}
                    {/*}*/}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tasks:state.task.tasks,
        isLoading:state.task.isLoading,
        loadError:state.task.loadError
    }
}
export default connect(mapStateToProps,Actions)(HeroContainer);
