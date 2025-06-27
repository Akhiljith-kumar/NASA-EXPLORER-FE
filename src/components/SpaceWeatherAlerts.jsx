import { useEffect, useState } from 'react';
import { getSpaceWeather } from '../api/nasaApi';

const parseFlareData = (body) => {
  const intensity = body.match(/Flare intensity: (.*? class)/)?.[1] || 'Unknown';
  const peak = body.match(/Flare peak time: (.*?)\./)?.[1] || 'Unknown';
  return { intensity, peak };
};

const SpaceWeatherAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    getSpaceWeather().then(res => setAlerts(res.data)).catch(console.error);
  }, []);

  return (
    <div className='space-weather'>
      <div className='flex-row'>
        <p style={{fontSize:'1.9rem'}}>Space Weather <span className='orange'>Alerts</span></p>
        <img className='radar-icon' src="icons/space-satellite-dish-svgrepo-com.svg" alt="" />
      </div>
      <div className='alter-list-wrapper'>
        {alerts.slice(0, 10).map(alert => {
          const { intensity, peak } = parseFlareData(alert.messageBody);
          return (
            <div key={alert.messageID} className="weather-alert-card font-popins">
              <p style={{fontSize:'19px', marginBottom: '10px'}}>{alert.messageType} Alert</p>
              <p>Issued: {new Date(alert.messageIssueTime).toLocaleString()}</p>
              <p>Intensity: {intensity}</p>
              <p style={{marginBottom: '10px'}}>Peak Time: {peak}</p>
              <a className='view-altert-btn font-cubano' href={alert.messageURL} target="_blank" rel="noreferrer">VIEW ALERT <i class="ri-external-link-line" style={{fontSize:'24px'}}></i></a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpaceWeatherAlerts;
