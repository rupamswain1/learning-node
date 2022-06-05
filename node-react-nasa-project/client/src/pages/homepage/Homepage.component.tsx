import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Homepage.style.scss'
import { response } from 'express';
interface LaunchData {
  launchDate: string | undefined;
  mission: string | undefined;
  rocket: string | undefined;

  destination: string | undefined;

}
function Homepage() {

  const [launchData, setlaunchData] = useState<LaunchData>({ launchDate: undefined, mission: undefined, rocket: undefined, destination: undefined });
  const [blankField, setBlankField] = useState<string[]>([]);
  const [exoPlanets, setExoPlanets] = useState<string[]>([]);
  const [error, setError] = useState<string>();
  const [launchSuccess, setlaunchSuccess] = useState<boolean>(true);
  useEffect(() => {
    axios.get('http://localhost:8000/planets')
      .then(res => setExoPlanets(res.data))
  }, [])


  const handleSubmit = (event: any): void => {
    event.preventDefault();
    if (!launchSuccess) {
      return;
    }
    const data = new FormData(event.target);
    const launchDate = data.get("launchDate")?.toString();
    const missionName = data.get("missionName")?.toString();
    const rocketType = data.get("rocketType")?.toString();
    const destination = data.get("destination")?.toString();
    const emptyField: string[] = [];
    if (!launchDate) {
      emptyField.push("Launch Date")
      launchDate
    }
    if (!missionName) {
      emptyField.push("Mission Name")
    }
    if (!rocketType) {
      emptyField.push("Rocket Type")
    }
    if (!destination || destination === "select") {
      emptyField.push("Destination")
    }

    setBlankField(emptyField)
    if (emptyField.length < 1) {
      console.log(launchDate, missionName, rocketType, destination)
      setlaunchData((prevState) => { return { ...prevState, launchDate: launchDate, mission: missionName, rocket: rocketType, destination: destination } })
      console.log(launchData)
      setlaunchSuccess(false)
      axios.post('http://localhost:8000/launches', { launchDate: launchDate, mission: missionName, rocket: rocketType, destination: destination })
        .then(response => {
          setlaunchSuccess(true)
        })
        .catch(err => {
          setError(err.response.data.error)
          setlaunchSuccess(true)
        })


    }
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
          :
          error ?
            <div className='launch-error'>
              {error}
            </div>
            : ''
      }

      <form className="launchInput" onSubmit={handleSubmit} >
        <div className='inputdata'>
          <label htmlFor="launchDate">Launch Date</label>
          <input type="date" id="launchDate" name="launchDate" />
        </div>
        <div className='inputdata'>
          <label htmlFor="missionName">Mission Name</label>
          <input type="text" id="missionName" name="missionName" />
        </div>
        <div className='inputdata'>
          <label htmlFor="rocketType">Rocket type</label>
          <input type="text" id="rocketType" name="rocketType" />
        </div>
        <div className='inputdata'>
          <label htmlFor="destExoPlanet">Destination Exoplanet</label>
          <select id="destExoPlanet" name="destination">
            <option value="select">Select</option>
            {exoPlanets.map((planet) => {
              return <option value={planet}>{planet}</option>
            })}
          </select>
        </div>
        <input className={`launchBtn ${launchSuccess ? '' : "btn-disable"}`} type="submit" value={`${!launchSuccess ? 'Launching.....' : 'Launch Mission'}`} />

      </form>
    </div>

  </div>
}

export default Homepage
