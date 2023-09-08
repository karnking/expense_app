import axios from "axios"
import { CREATE_TRACKER, GET_USER_SUCCESS, SET_ERROR, SET_LOADING, SET_USER_REQUEST } from "./actionType"

export const verifyUser = (user) => async(dispatch) => {
    dispatch({type:SET_LOADING})
    try{
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users?email=${user.email}&password=${user.password}`)
        dispatch({type:GET_USER_SUCCESS,payload:res.data[0]})
    }catch(error){
        dispatch({type:SET_ERROR})
    }
}

export const setUser = (payload) => async(dispatch)=>{
    dispatch({type:SET_LOADING})
    try{
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/users`,payload)
        dispatch({type:SET_USER_REQUEST,payload:payload})
    }catch(error){
        dispatch({type:SET_ERROR})
    }
}

export const setTracker = (user,track) => async(dispatch) =>{
    dispatch({type:SET_LOADING})
    try{
        const obj = {...user,trackings:[...user.trackings,track]}
        await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/${user.id}`,obj)
        dispatch({type:CREATE_TRACKER,payload:obj})
    }catch(error){
        dispatch({type:SET_ERROR})
    }
}