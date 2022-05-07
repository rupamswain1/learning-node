import React from 'react'

import './Homepage.style.scss'

function Homepage() {
  return <div className="homepage-container">
    <div className='missionLauncher'>
      <div>
        Schedule a mission launch for intersteller travel to one of the Kepler Explored Planets
      </div>
      <div>
        Only confirmed planets matching the following criteria are available for the earlier scheduled missions:
      </div>
      <ul>
        <li>
          Planetary radius &lt; 1.6 times Earth's Radius
        </li>
        <li>
          Effective Seller flux &gt; 0.36 times Earth's value and &lt; 1.11 times Earth's value
        </li>
      </ul>
      <form className="launchInput">
        <div className='inputdata'>
          <label htmlFor="launchData">Launch Date</label>
          <input type="date" id="launchData" />
        </div>
        <div className='inputdata'>
          <label htmlFor="missionName">Mission Name</label>
          <input type="text" id="missionName" />
        </div>
        <div className='inputdata'>
          <label htmlFor="rocketType">Rocket type</label>
          <input type="text" id="rocketType" />
        </div>
        <div className='inputdata'>
          <label htmlFor="destExoPlanet">Destination Exoplanet</label>
          <select id="destExoPlanet">
            <option value="test">Test</option>
          </select>
        </div>
        <input className="launchBtn" type="submit" value="Launch Mission" />
      </form>
    </div>

  </div>
}

export default Homepage
