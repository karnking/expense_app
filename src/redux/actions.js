import axios from "axios"
import { CREATE_TRACKER, DELETE_REQUEST, GET_USER_ERROR, GET_USER_SUCCESS, SET_ERROR, SET_LOADING, SET_USER_REQUEST, UPDATE_EXPENSE_REQUEST } from "./actionType"

export const verifyUser = (user) => async(dispatch) => {
    dispatch({type:SET_LOADING})
    try{
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users?email=${user.email}&password=${user.password}`)
        console.log(res.data.length>0?true:false)
        if(res?.data.length>0){
             dispatch({type:GET_USER_SUCCESS,payload:res.data[0]})
        }
        else dispatch({type:GET_USER_ERROR})
        
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
        let obj;
        if(user?.trackings) obj = {...user,trackings:[...user?.trackings,track]}
        else obj = {...user,trackings:[track]}
        console.log(obj)
        await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/${user.id}`,obj)
        dispatch({type:CREATE_TRACKER,payload:obj})
    }catch(error){
        dispatch({type:SET_ERROR})
    }
}

export const editTracker = (user,i,ntrack) => async(dispatch) => {
    dispatch({type:SET_LOADING})
    try{
        console.log(user,i,ntrack)
        const obj = {...user,trackings:user.trackings.map((track,idx)=>{
            if(idx===i) return ntrack
            else return track
        })}
        await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/${user.id}`,obj)
        dispatch({type:UPDATE_EXPENSE_REQUEST,payload:obj})
    }catch(error){
        dispatch({type:SET_ERROR})
    }
}

export const deleteTracker = (user,i) => async(dispatch) => {
    dispatch({type:SET_LOADING})
    try{
        const obj = {...user,trackings:user.trackings.filter((track,idx)=>{
            return idx!==i
        })}
        await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/${user.id}`,obj)
        dispatch({type:DELETE_REQUEST,payload:obj})
    }catch(error){
        dispatch({type:SET_ERROR})
    }
}
