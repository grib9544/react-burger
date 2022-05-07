import { combineReducers } from "@reduxjs/toolkit";
import burgerReducer from './burger';

export const rootReducer = combineReducers({
    burger: burgerReducer,
})