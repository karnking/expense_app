import { CloseIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Button, Card, CardBody, Flex, FormControl, FormLabel, HStack, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, VStack, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTracker, editTracker } from '../redux/actions'

const obj_schema = {
    type: '',
    category: '',
    amount: '',
    date: ''
}
const History = () => {
    const dispatch = useDispatch()
    const [ido,setIdo] = useState(-1)
    const user = useSelector(store => store.user)
    const handleEdit = (track, i) => {
        onOpen()
        setIdo(i)
        setObj(track)
    }
    const handleDelete = (i) => {
        dispatch(deleteTracker(user, i))
    }
    const [obj, setObj] = useState(obj_schema)
    const income_categories = ["Salary", "Gifts", "Refunds", "Other"]
    const expense_categories = ["Food & Drinks", "Shopping", "Housing", "Bills", "Vehicle & Transport", "Lifestyle"]
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
    const validation = () => {
        const { type, category, amount, date } = obj
        if (type === '') {
            showAlert('Please Select type')
            return;
        }
        if (category === '') {
            showAlert('Please Select category')
            return;
        }
        if (amount === '') {
            showAlert('Please Enter amount')
            return;
        }
        if (date === '') {
            showAlert('Please Enter date')
            return;
        }
        onClose()
        dispatch(editTracker(user, ido, obj))
        .then(()=>{
            showAlert("Edit successfull",'success')
        })
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    return <Box minH='75vh' textAlign={'center'}>
        <Heading>History of Expenses & Tracking</Heading>
        {user?.trackings?.map((track, i) => {
            const { type, category, amount, date } = track
            return <Card w='50%' margin={'auto'} mt='2' key={i}>
                <CardBody>
                    <Flex justify={'space-between'} px='5'>
                        <VStack textAlign={'left'}>
                            <Heading fontSize={'18'}>{category}</Heading>
                            <Text textAlign={'left'} fontSize={'13'}>{new Date(date).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}</Text>
                            <Text textAlign={'left'} fontSize={'13'}>{type.toUpperCase()}</Text>
                        </VStack>
                        <VStack>
                            <Text textAlign={'left'} fontSize={'13'} color={type === 'Income' ? 'green' : 'red'}>{type === 'Income' ? `+${amount}` : `-${amount}`}</Text>
                            <HStack>
                                <EditIcon onClick={() => handleEdit(track, i)} boxSize='15px' />
                                <CloseIcon onClick={() => handleDelete(i)} boxSize='15px' />
                            </HStack>
                        </VStack>
                    </Flex>
                </CardBody>
            </Card>
        })}
        <Modal
            isCentered
            onClose={onClose}
            isOpen={isOpen}
            motionPreset='slideInBottom'
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Track</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box w='90%' margin='auto' p='2em' border={'1px solid black'}>
                        <FormControl>
                            <HStack>
                                <FormLabel w='50%'>Type</FormLabel>
                                <Select size={'xs'} value={obj.type} onChange={(e) => setObj({ ...obj, type: e.target.value })}>
                                    <option value=''>--select-type--</option>
                                    <option value='Income'>Income</option>
                                    <option value='Expense'>Expense</option>
                                </Select>
                            </HStack>
                        </FormControl>
                        <FormControl>
                            <HStack>
                                <FormLabel w='50%'>Category</FormLabel>
                                <Select size={'xs'} name='category' value={obj.category} onChange={(e) => setObj({ ...obj, category: e.target.value })}>
                                    <option value=''>--select-category--</option>
                                    {obj.type === 'Income' ? income_categories.map((cat,i) => <option key={i} value={cat}>{cat}</option>) :
                                        obj.type === 'Expense' ? expense_categories.map((cat,i) => <option key={i} value={cat}>{cat}</option>) :
                                            <option value=''></option>
                                    }
                                </Select>
                            </HStack>
                        </FormControl>
                        <FormControl>
                            <HStack>
                                <FormLabel w='51%'>Amount</FormLabel>
                                <Input size={'xs'} type='number' value={obj.amount} onChange={(e) => setObj({ ...obj, amount: e.target.value })} />
                            </HStack>
                        </FormControl>
                        <FormControl>
                            <HStack>
                                <FormLabel w='51%'>Date</FormLabel>
                                <Input size={'xs'} type='date' value={obj.date} onChange={(e) => setObj({ ...obj, date: e.target.value })} />
                            </HStack>
                        </FormControl>
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button mt='3' w='100%' onClick={validation} colorScheme='green'>Update</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
}

export default History