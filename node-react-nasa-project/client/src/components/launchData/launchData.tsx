import React from 'react'

import './launchData.scss'

type LaunchData = {
    flightNumber: Number
    mission: string
    rocket: string
    launchDate: Date
    destination: string
    customer: string[]
    upcoming: boolean
    success: boolean

}
type launchDataProps = {
    launchData: LaunchData[],
    historical: Boolean
}


const LaunchData: React.FC<launchDataProps> = ({ launchData, historical }) => {
    let data: LaunchData[] = [];


    return (
        <table className='history-table'>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Date</th>
                    <th>Mission</th>
                    <th>Rocket</th>
                    <th>Customers</th>
                    {
                        !historical ?
                            <th>Abort</th>
                            : <th>Launch Status</th>
                    }
                </tr>
            </thead>
            <tbody>
                {
                    launchData ?
                        launchData.map(launch => {
                            return (
                                <tr>
                                    <td>{launch.flightNumber + ""}</td>
                                    <td>{`${new Date(launch.launchDate).getDate()}/${new Date(launch.launchDate).getMonth() + 1}/${new Date(launch.launchDate).getFullYear()}`}</td>
                                    <td>{launch.mission}</td>
                                    <td>{launch.rocket}</td>
                                    <td>{launch.customer.join(',')}</td>
                                    {
                                        historical ?
                                            (launch.success ?
                                                <td>Success</td>
                                                : <td>Aborted</td>)
                                            : <td className="close-btn" id={`${launch.flightNumber}`} >X</td>
                                    }
                                </tr>
                            )
                        }) : ''
                }

            </tbody>
        </table>
    )
}

export default LaunchData
