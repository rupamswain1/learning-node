import React, { useState, useEffect } from 'react'

import axios from 'axios';
import LaunchData from '../../components/launchData/launchData';
import './upcomingPage.style.scss';
import { classicNameResolver } from 'typescript';

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
    const [reload, setReload] = useState<boolean>(false);
    useEffect(() => {
        axios.get('http://localhost:8000/v1/launches/upcoming')
            .then(result => setupcomingLaunch(result.data))
            .catch(err => console.log(err))
    }, [reload])
    const clicked = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { className, id }: { className: string, id: string } = (event.target as HTMLInputElement);

        if (className === 'close-btn') {
            if (id) {
                axios.delete(`http://localhost:8000/v1/launches/${id}`)
                    .then(result => setReload(!reload))
                    .catch(err => console.log(err))
            }
        }

    }
    return (
        <div className='historyPage'>
            <h2 className='sub-heading'>Upcoming Launches</h2>
            <div className='historyContainer'>
                <div onClick={clicked}>
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
