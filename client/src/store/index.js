import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const inititalState = {}
export default createStore(rootReducer,
  inititalState, applyMiddleware(thunk))


