import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
// import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import reducer from '../src/reducers/reducer_tasks';
import * as actions from '../src/actions/actions_task';


const middlwares = [thunk];
const mockStore = configureMockStore(middlwares);


describe('Redux Reducer',() => {
    it('should return initial state', () => {
      const reducerState = reducer(undefined, {});
      const initialState = {
        isLoading: false,
        showModal: false,
        showToast: false,
        loadError: null,
        tasks: [],
        toast: {},
        hasTasksChanged: false
      };
      expect(reducerState).toEqual(initialState);
    });
  it('should handle SAVE_TASKS_SUCCESS', () => {
    const initialState = {
      tasks: [{title: 'hello!'}],
      showToast: false,
      toast: {}
    }
    const reducerState = reducer(initialState, {
      type: 'SAVE_TASKS_SUCCESS',
      payload: [{title: 'hello!'}]
    });
    const expectedState = {
      tasks: [{title: 'hello!'}],
      showToast: true,
      toast: {
        type: 'success',
        message:'Task saved successfully !'
      },
      isLoading:false
    }
    expect(reducerState).toEqual(expectedState);
  });
  it('should handle SAVE_TASKS_FAILURE', () => {
    const initialState = {
      showToast: false,
      toast: {}
    }
    const reducerState = reducer(initialState, {
      type: 'SAVE_TASKS_FAILURE'
    });
    const expectedState = {
      showToast: true,
      toast: {
        type: 'error',
        message:'Getting Error while Saving your Tasks !'
      },
      isLoading:false
    }
    expect(reducerState).toEqual(expectedState);
  });
  it('should handle ADD_TASK', () => {

    const initialState = {
      tasks: [],
      hasTasksChanged: false
    };

    const reducerState = reducer(initialState, {
      type: 'ADD_TASK',
      payload: { title: 'task1'}
    });

    const expectedState = {
      tasks: [ { title: 'task1' }],
      hasTasksChanged: true
    };

    expect(reducerState).toEqual(expectedState);

  });
  it('should handle SHOW_MODAL', () => {

    const initialState = {
      showModal: false
    };

    const reducerState = reducer(initialState, {
      type: 'SHOW_MODAL',
      payload: true
    });

    const expectedState = {
      showModal: true
    };

    expect(reducerState).toEqual(expectedState);

  });

  it('should handle SHOW_TOAST', () => {

    const initialState = {
      showToast: false
    };

    const reducerState = reducer(initialState, {
      type: 'SHOW_TOAST',
      payload: true
    });

    const expectedState = {
      showToast: true
    };

    expect(reducerState).toEqual(expectedState);

  });

})

describe('Redux Actions',() => {
    it('should create an action to add a task', () => {
        const payload = { title: 'Test task' };
        const expectedAction = {
            type:actions.ADD_TASK,
            payload
        };
        expect(actions.addTask(payload)).toEqual(expectedAction);
    });
    it('should create an action to update a task', () => {
        const payload = { title: 'Update Task', index: 1 };
        const expectedAction = {
            type: actions.UPDATE_TASK_TITLE,
            payload
        };
        expect(
            actions.updateTaskTitle(payload.title, payload.index))
            .toEqual(expectedAction);
    });
    it('should create an action to delete a task',() => {
      const payload={ index:1 };
      const expectedAction = {
          type:actions.DELETE_TASK,
          payload
      };
      expect(
          actions.deleteTask(payload)).
          toEqual(expectedAction)

    });
    it('should create an action to show modal',() => {
        const payload= true;
        const expectedAction= {
            type:actions.SHOW_MODAL,
            payload
        };
        expect(
            actions.showModal(payload))
            .toEqual(expectedAction)

    });
    it('should create an action to show notification',() => {
        const payload= true;
        const expectedAction= {
            type:actions.SHOW_TOAST,
            payload
        };
        expect(
            actions.showToast(payload))
            .toEqual(expectedAction)
    })

})
describe('async actions', () => {
    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })
    it('creates FETCH_TODOS_SUCCESS when fetching TASKS has been done', () => {
        fetchMock
            .getOnce('/tasks', { body: [{'title':'task1'}] , headers: { 'content-type': 'application/json' } })


        const expectedActions = [
            { type: actions.FETCH_TASKS_REQUEST },
            { type: actions.FETCH_TASKS_SUCCESS, body: [{'title':'task1'}]  }
        ]
        const store = mockStore({ tasks: [] })

        return store.dispatch(actions.fetchTasks()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
});
