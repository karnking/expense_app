import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <Flex justify={'space-around'} textAlign={'center'} mb='2' fontWeight={'bold'} bg='silver'>
        <Link style={{width:'33%'}} to='/signup'><Text w='100%' p='3' to='/signup' _hover={{bg:'grey',color:'white'}}>Signup</Text></Link>
        <Link style={{width:'33%'}} to='/'><Text w='100%' p='3' to='/signup' _hover={{bg:'grey',color:'white'}}>Dashboard</Text></Link>
        <Link style={{width:'33%'}} to='/login'><Text w='100%' p='3' to='/signup' _hover={{bg:'grey',color:'white'}}>Login</Text></Link>
    </Flex>
  )
}

export default Navbar