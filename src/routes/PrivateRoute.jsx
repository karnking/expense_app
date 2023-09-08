import { useToast } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const loggedIn = useSelector(store => store.loggedIn) || false
    const toast = useToast()
    const id = 'test-toast'
    const showAlert = (text = 'Error', status = 'error') => {
        if (!toast.isActive(id)) {
            toast({
                id,
                title: text,
                status: status,
                duration: 3000
            })
        }
    }
    if (!loggedIn) {
        showAlert('Please login first!!')
        return <Navigate to='/login' replace />
    }
    return children
}

export default PrivateRoute