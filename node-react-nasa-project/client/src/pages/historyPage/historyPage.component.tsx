import React from 'react'

import './historyPage.style.scss';

const HistoryPage = () => {
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
                            <tr>
                                <td>1</td>
                                <td>2</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default HistoryPage
