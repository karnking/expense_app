import { Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <Flex justify={'space-around'} p={3} mb='2' fontWeight={'bold'} bg='silver'>
        <Link to='/signup'>Signup</Link>
        <Link to='/'>Dashboard</Link>
        <Link to='/login'>Login</Link>
    </Flex>
  )
}

export default Navbar