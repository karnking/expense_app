import { Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import Tracker from '../components/Tracker'
import Analytics from '../components/Analytics'
import History from '../components/History'

const Dashboard = () => {
    const colors = useColorModeValue(
        ['red.50', 'teal.50', 'blue.50'],
        ['red.900', 'teal.900', 'blue.900'],
    )
    const [tabIndex, setTabIndex] = useState(0)
    const bg = colors[tabIndex]
    return <>
        <Tabs isFitted variant='enclosed' onChange={(index) => setTabIndex(index)} bg={bg}>
            <TabList mb='1em'>
                <Tab>Tracker</Tab>
                <Tab>Analytics</Tab>
                <Tab>History</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Tracker />
                </TabPanel>
                <TabPanel>
                    <Analytics />
                </TabPanel>
                <TabPanel>
                    <History />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </>
}

export default Dashboard