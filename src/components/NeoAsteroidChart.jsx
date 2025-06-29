import { useEffect, useState } from 'react';
import { getNeoStats } from '../api/nasaApi';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { formatDate } from '../utils/dateUtils';

const NeoAsteroidChart = () => {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 6);
  const maxDate = formatDate(today);

  const [start, setStart] = useState(formatDate(sevenDaysAgo));
  const [end, setEnd] = useState(formatDate(today));
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = () => {
    setError('');
    if (!start || !end) return;

    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffInDays = (endDate - startDate) / (1000 * 60 * 60 * 24);

    if (diffInDays > 6) {
      setError('Please select a date range of 7 days or less.');
      return;
    }

    setLoading(true);
    getNeoStats(start, end)
      .then(res => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [start, end]);

  return (
    <div className="near-earth-object-wrapper">
      <p className="head-1">Near-Earth Objects <span className="gradient-text">Detected Per Day</span></p>

      <div className="search-bar-wrapper">
        <input
          type="date"
          value={start}
          max={maxDate}
          onChange={(e) => setStart(e.target.value)}
          className="nasa-search-bar nasa-date-picker"
        />
        <input
          type="date"
          value={end}
          max={maxDate}
          onChange={(e) => setEnd(e.target.value)}
          className="nasa-search-bar nasa-date-picker"
        />
        {error && <p className="error-text font-popins">{error}</p>}
      </div>
      
      {loading ? (
        <p className="loading-text">Loading chart...</p>
      ) : (
        <ResponsiveContainer className="near-earth-object-barchart" width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#EC6852" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default NeoAsteroidChart;
