import React, { useState, useEffect } from 'react'

import axios from 'axios';
import LaunchData from '../../components/launchData/launchData';
import './upcomingPage.style.scss';

interface UpcomingPageState {
    flightNumber: Number
    mission: string
    rocket: string
    launchDate: Date
    destination: string
    customer: string[]
    upcoming: boolean
    success: boolean
}


export const UpcomingPage = () => {
    const [upcomingLaunch, setupcomingLaunch] = useState<UpcomingPageState[] | undefined>();
    useEffect(() => {
        axios.get('http://localhost:8000/launches/upcoming')
            .then(result => setupcomingLaunch(result.data))
            .catch(err => console.log(err))
    }, [])
    return (
        <div className='historyPage'>
            <h2 className='sub-heading'>Upcoming Launches</h2>
            <div className='historyContainer'>
                <div>
                    <h3>Upcoming Mission launches including SpaceX launches starting from Today.</h3>
                    {
                        upcomingLaunch &&
                        <LaunchData launchData={upcomingLaunch} historical={false} />
                    }

                </div>
            </div>
        </div>
    )
}
