import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {logger} from 'redux-logger';
import App from './App';
import createSagaMiddleware from 'redux-saga'
import {takeEvery, put} from 'redux-saga/effects';
import axios from 'axios';

// this startingPlantArray should eventually be removed
// const startingPlantArray = [
//   { id: 1, name: 'Rose' },
//   { id: 2, name: 'Tulip' },
//   { id: 3, name: 'Oak' }
// ];
function* rootSaga() {
  yield takeEvery('FETCH_PLANT', getPlantSaga);
  // yield takeEvery('ADD_FRUIT', addFruitSaga);
}

function* getPlantSaga(action){
  try {
    // yield console.log('attempting get');
    const response = yield axios.get('/api/plant/');
    yield console.log('back with:', response.data);
    yield put( { type: 'ADD_PLANT', payload: response.data } );
  } catch (error) {
    console.log('error with element get request', error);
  }
}

const plantList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return [ ...state, action.payload ]
    default:
      return state;
  }
};
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({ plantList }),
  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('react-root'));
