import React, { useState, useEffect } from 'react'
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
    const [historyLaunch, setHistoryLaunch] = useState<HistoryPageState[] | undefined>(undefined);
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
                    <table className='history-table'>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Date</th>
                                <th>Mission</th>
                                <th>Rocket</th>
                                <th>Customers</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                historyLaunch ?
                                    historyLaunch.map(launch => {
                                        return (
                                            <tr>
                                                <td>{launch.flightNumber + ""}</td>
                                                <td>{`${new Date(launch.launchDate).getDate()}/${new Date(launch.launchDate).getMonth() + 1}/${new Date(launch.launchDate).getFullYear()}`}</td>
                                                <td>{launch.mission}</td>
                                                <td>{launch.rocket}</td>
                                                <td>{launch.customer.join(',')}</td>
                                            </tr>
                                        )
                                    }) : ''
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default HistoryPage
