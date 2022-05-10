import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Homepage.style.scss'
interface LaunchData {
  launchDate: string | null;
  missionName: string | null;
  rocketType: string | null;

  destination: string | null;

}
function Homepage() {

  const [launchData, setlaunchData] = useState<LaunchData>({ launchDate: null, missionName: null, rocketType: null, destination: null });
  const [blankField, setBlankField] = useState<string[]>([]);
  const [exoPlanets, setExoPlanets] = useState<string[]>([]);
  useEffect(() => {
    axios.get('http://localhost:8000/planets')
      .then(res => setExoPlanets(res.data))
  }, [])

  const handleChange = (event: any): void => {

    setlaunchData(((prevState) => ({ ...prevState, [event.target.name]: event.target.value })))

  }
  const handleSubmit = (event: any): void => {
    event.preventDefault();
    const emptyField: string[] = []
    Object.keys(launchData).forEach((key: string) => {
      const value = launchData[key as keyof LaunchData];
      if (value !== null) {
        console.log(true);
      }
      else {
        emptyField.push(key)
      }
    })
    setBlankField(emptyField)

  }

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
      {
        blankField.length > 0 ?
          <div className='launch-error'>
            {`${blankField} are mandatory`}
          </div>
          : ''
      }

      <form className="launchInput" onSubmit={handleSubmit} >
        <div className='inputdata'>
          <label htmlFor="launchData">Launch Date</label>
          <input type="date" id="launchData" onChange={handleChange} name="launchDate" />
        </div>
        <div className='inputdata'>
          <label htmlFor="missionName">Mission Name</label>
          <input type="text" id="missionName" name="missionName" onChange={handleChange} />
        </div>
        <div className='inputdata'>
          <label htmlFor="rocketType">Rocket type</label>
          <input type="text" id="rocketType" name="rocketType" onChange={handleChange} />
        </div>
        <div className='inputdata'>
          <label htmlFor="destExoPlanet">Destination Exoplanet</label>
          <select id="destExoPlanet" name="destination" onChange={handleChange}>
            {exoPlanets.map((planet) => {
              return <option value={planet}>{planet}</option>
            })}
          </select>
        </div>
        <input className="launchBtn" type="submit" value="Launch Mission" />
      </form>
    </div>

  </div>
}

export default Homepage
