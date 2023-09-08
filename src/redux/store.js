import { applyMiddleware, legacy_createStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";
import thunk from "redux-thunk"

export const store = legacy_createStore(reducer,applyMiddleware(thunk))