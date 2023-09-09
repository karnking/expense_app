import { Box, Button, FormControl, FormLabel, HStack, Heading, Input, Select, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTracker } from '../redux/actions'

const obj_schema = {
    type: '',
    category: '',
    amount: '',
    date: ''
}
const Tracker = () => {
    const dispatch = useDispatch()
    const [obj, setObj] = useState(obj_schema)
    const income_categories = ["Salary", "Gifts", "Refunds", "Other"]
    const expense_categories = ["Food & Drinks", "Shopping", "Housing", "Bills", "Vehicle & Transport", "Lifestyle"]
    const toast = useToast()
    const id = 'test-toast'
    const user = useSelector(store=>store.user)
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
        const {type,category,amount,date} = obj
        if(type===''){
            showAlert('Please Select type')
            return;
        }
        if(category===''){
            showAlert('Please Select category')
            return;
        }
        if(amount===''){
            showAlert('Please Enter amount')
            return;
        }
        if(date===''){
            showAlert('Please Enter date')
            return;
        }
        dispatch(setTracker(user,obj))
        .then(()=>{
            showAlert("Created Track!!",'success')
        })
    }
    return (
        <Box textAlign='center' h='75vh'>
            <Heading colorScheme='blue' size={'lg'} p='2'>Create Tracker</Heading>
            <Box w='40%' margin='auto' p='2em' border={'1px solid black'}>
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
                        <Select size={'xs'} name='to_station' value={obj.to_station} onChange={(e) => setObj({ ...obj, category: e.target.value })}>
                            <option value=''>--select-category--</option>
                            {obj.type === 'Income' ? income_categories.map(cat => <option value={cat}>{cat}</option>) :
                                obj.type === 'Expense' ? expense_categories.map(cat => <option value={cat}>{cat}</option>) :
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
                <FormControl>
                    <Button mt='3' w='100%' onClick={validation} colorScheme='green'>Create</Button>
                </FormControl>
            </Box>
        </Box>
    )
}

export default Tracker