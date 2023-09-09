import {CREATE_TRACKER, DELETE_REQUEST, GET_USER_ERROR, GET_USER_SUCCESS, SET_ERROR, SET_LOADING, SET_USER_REQUEST, UPDATE_EXPENSE_REQUEST } from "./actionType"

const iniState = {
    user: {},
    loggedIn: false,
    isLoading: false,
    isError: false
}
export const reducer = (state=iniState,{type,payload}) => {
    switch(type){
        case SET_LOADING: return {...state,isLoading:true}
        case SET_ERROR: return {...state,isError:true}
        case GET_USER_SUCCESS: return {...state,isLoading:false,loggedIn:true,user:payload}
        case GET_USER_ERROR: return {...state,isLoading:false,loggedIn:false}
        case SET_USER_REQUEST : return {...state,isLoading:false}
        case CREATE_TRACKER  : return {...state,isLoading:false,user:payload}
        case DELETE_REQUEST  : return {...state,isLoading:false,user:payload}
        case UPDATE_EXPENSE_REQUEST: return {...state,isLoading:false,user:payload}
        default : return state
    }
}