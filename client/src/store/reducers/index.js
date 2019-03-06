import settings from './settings'
import authReducer from './authReducer'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import errorReducer from './errorReducer'

export default combineReducers({
  settings,
  auth: authReducer,
  form: formReducer,
  errors: errorReducer
})

