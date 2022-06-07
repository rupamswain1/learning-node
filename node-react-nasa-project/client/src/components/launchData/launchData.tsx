import React from 'react'

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
    if (historical) {
        data = launchData.filter((launch) => new Date() > new Date(launch.launchDate) || launch.upcoming === false)
    }
    else {
        data = launchData.filter((launch) => new Date < new Date(launch.launchDate));
    }
    console.log(data)
    const abort = (flightNumber: Number) => {
        return flightNumber
    }
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
                        data.map(launch => {
                            return (
                                <tr>
                                    <td>{launch.flightNumber + ""}</td>
                                    <td>{`${new Date(launch.launchDate).getDate()}/${new Date(launch.launchDate).getMonth() + 1}/${new Date(launch.launchDate).getFullYear()}`}</td>
                                    <td>{launch.mission}</td>
                                    <td>{launch.rocket}</td>
                                    <td>{launch.customer.join(',')}</td>
                                    {
                                        history ?
                                            launch.success ?
                                                <td>Success</td>
                                                : <td>Aborted</td>
                                            :
                                            <td onClick={() => abort(launch.flightNumber)}>X</td>

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
