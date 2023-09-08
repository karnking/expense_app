import { Box, Button, FormControl, FormLabel, HStack, Heading, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/actions'

const user_schema = {
    name: '',
    email: '',
    password: ''
}
const Signup = () => {
    const dispatch = useDispatch()
    const [user, setuser] = useState(user_schema)
    const toast = useToast()
    const id = 'test-toast'
    const showAlert = (text = 'Error', status = 'error') => {
        if (!toast.isActive(id)) {
            toast({
                id,
                title: text,
                status: status
            })
        }
    }
    const signupUser = () =>{
        dispatch(setUser(user))
        showAlert("Signup successfull!!",'success')
    }
    const validation = () => {
        const { name, email, password } = user
        if (name === ''){
            showAlert("Please enter atleast 4 character name!")
            return;
        }
        if (email === ''){
            showAlert("Enter valid email!")
            return;
        }
        if (password === ''){
            showAlert("Password cannot be empty!")
            return
        }
        signupUser()
    }
    return (
        <Box textAlign='center'>
            <Heading colorScheme='blue' size={'lg'} p='2'>Registration</Heading>
            <Box w='40%' margin='auto' p='2em' border={'1px solid black'}>
                <FormControl>
                    <HStack>
                        <FormLabel w='50%'>Full Name</FormLabel>
                        <Input size={'xs'} required type='text' name='name' value={user.name} onChange={(e) => setuser({ ...user, name: e.target.value })} />
                    </HStack>
                </FormControl>
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
                    <Button mt='3' w='100%' onClick={validation} colorScheme='linkedin'>Register</Button>
                </FormControl>
            </Box>
        </Box>
    )
}

export default Signup