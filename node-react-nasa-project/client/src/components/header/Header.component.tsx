import React from 'react'
import { Link } from 'react-router-dom';
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
                        <Link to="/launch">Launch</Link>
                    </li>
                    <li>
                        Upcoming
                    </li>
                    <li>
                        <Link to="/history">History</Link>

                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;