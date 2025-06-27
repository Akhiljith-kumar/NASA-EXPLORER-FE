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
        <h2>Space Weather Alerts</h2>
        <img className='radar-icon' src="icons/space-satellite-dish-svgrepo-com.svg" alt="" />
      </div>
      <div>
        {alerts.slice(0, 10).map(alert => {
          const { intensity, peak } = parseFlareData(alert.messageBody);
          return (
            <div key={alert.messageID} className="card">
              <h4>{alert.messageType} Alert</h4>
              <p><strong>Issued:</strong> {new Date(alert.messageIssueTime).toLocaleString()}</p>
              <p><strong>Intensity:</strong> {intensity}</p>
              <p><strong>Peak Time:</strong> {peak}</p>
              <a href={alert.messageURL} target="_blank" rel="noreferrer">🔗 View Alert</a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpaceWeatherAlerts;
