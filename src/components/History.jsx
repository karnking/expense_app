import { CloseIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Card, CardBody, Flex, HStack, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

const History = () => {
    const user = useSelector(store => store.user)
    return <Box minH='75vh' textAlign={'center'}>
        <Heading>History of Expenses & Tracking</Heading>
        {user?.trackings?.map(track => {
            const { type, category, amount, date } = track
            return <Card w='50%' margin={'auto'} mt='2'>
                <CardBody>
                    <Flex justify={'space-between'} px='5'>
                        <VStack>
                            <Heading fontSize={'18'}>{category}</Heading>
                            <Text fontSize={'13'}>{new Date(date).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}</Text>
                            <Text fontSize={'13'}>{type.toUpperCase()}</Text>
                        </VStack>
                        <VStack>
                            <Text fontSize={'13'} color={type === 'Income' ? 'green' : 'red'}>{type === 'Income' ? `+${amount}` : `-${amount}`}</Text>
                            <HStack>
                                <EditIcon boxSize='15px'/>
                                <CloseIcon boxSize='15px'/>
                            </HStack>
                        </VStack>
                    </Flex>
                </CardBody>
            </Card>
        })}
    </Box>
}

export default History