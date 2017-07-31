import { combineReducers } from 'redux';
import home from './modules/home'
import { routerReducer } from 'react-router-redux';

export default combineReducers({
home,
routing: routerReducer
});