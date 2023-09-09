import { Box, Button, FormControl, FormLabel, HStack, Heading, Input, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { verifyUser } from '../redux/actions'
import { GET_USER_ERROR } from '../redux/actionType'

const user_schema = {
    email: '',
    password: ''
}
const Login = () => {
    const dispatch = useDispatch()
    const [user, setuser] = useState(user_schema)
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
    const loggedIn = useSelector(store => store.loggedIn)
    const loginUser = () =>{
        dispatch(verifyUser(user))
        .then(()=>{
            console.log(loggedIn)
            if(loggedIn) showAlert("Login successfull!!",'success')
            else showAlert("Wrong Credentials")
        })
    }
    const validation = () => {
        const { email, password } = user
        if (email === ''){
            showAlert("Enter valid email!")
            return;
        }
        if (password === ''){
            showAlert("Password cannot be empty!")
            return
        }
        loginUser()
    }
    useEffect(()=>{
        dispatch({type:GET_USER_ERROR})
    })
  return (
    <Box textAlign='center'>
            <Heading colorScheme='blue' size={'lg'} p='2'>Login</Heading>
            <Box w='40%' margin='auto' p='2em' border={'1px solid black'}>
                <FormControl>
                    <HStack>
                        <FormLabel w='50%'>Email</FormLabel>
                        <Input size={'xs'} required name='email' type='email' value={user.email} onChange={(e) => setuser({ ...user, email: e.target.value })} />
                    </HStack>
                </FormControl>
                <FormControl>
                    <HStack>
                        <FormLabel w='50%'>Password</FormLabel>
                        <Input size={'xs'} required name='password' type='password' value={user.password} onChange={(e) => setuser({ ...user, password: e.target.value })} />
                    </HStack>
                </FormControl>
                <FormControl>
                    <Button mt='3' w='100%' onClick={validation} colorScheme='linkedin'>Login</Button>
                </FormControl>
            </Box>
        </Box>
  )
}

export default Login