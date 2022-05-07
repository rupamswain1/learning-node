import React from 'react'

import './Header.style.scss';
function Header() {
    return (
        <nav className="nasa-navbar">
            <div className="nasa-logo">
                Nasa React Project
            </div>
            <div className='nasa-menu'>
                <ul className='nasa-menuItem'>
                    <li>
                        Launch
                    </li>
                    <li>
                        Upcoming
                    </li>
                    <li>
                        History
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;