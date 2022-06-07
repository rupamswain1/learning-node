import React, { useState, useEffect } from 'react'
import LaunchData from '../../components/launchData/launchData';

import axios from 'axios';


import './historyPage.style.scss';

interface HistoryPageState {
    flightNumber: Number
    mission: string
    rocket: string
    launchDate: Date
    destination: string
    customer: string[]
    upcoming: boolean
    success: boolean
}

const HistoryPage = () => {
    const [historyLaunch, setHistoryLaunch] = useState<HistoryPageState[] | undefined>();
    useEffect(() => {
        axios.get('http://localhost:8000/launches')
            .then(result => setHistoryLaunch(result.data))
            .catch(err => console.log(err))
    }, [])
    return (
        <div className='historyPage'>
            <h2 className='sub-heading'>Historical Launches</h2>
            <div className='historyContainer'>
                <div>
                    <h3>History of Mission launches including SpaceX launches starting from the year 2006.</h3>
                    {
                        historyLaunch &&
                        <LaunchData launchData={historyLaunch} historical={true} />
                    }

                </div>
            </div>
        </div>
    )
}

export default HistoryPage
