import { useEffect, useState } from 'react';
import { getNeoStats } from '../api/nasaApi';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const NeoAsteroidChart = () => {
  const [start, setStart] = useState('2025-06-20');
  const [end, setEnd] = useState('2025-06-26');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    if (!start || !end) return;
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
          onChange={(e) => setStart(e.target.value)}
          className="nasa-search-bar nasa-date-picker"
        />
        <input
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="nasa-search-bar nasa-date-picker"
        />
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
