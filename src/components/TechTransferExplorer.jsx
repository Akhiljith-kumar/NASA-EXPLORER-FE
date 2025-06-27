import { useEffect, useState } from 'react';
import { getTechByCategory } from '../api/nasaApi';

const TechTransferExplorer = () => {
  const [techCategory, setTechCategory] = useState('space');
  const [techResults, setTechResults] = useState([]);

  useEffect(() => {
    getTechByCategory(techCategory).then(res => setTechResults(res.data)).catch(console.error);
  }, [techCategory]);

  return (
    <div>
      <h2>🛰 TechTransfer Patents</h2>
      <select value={techCategory} onChange={e => setTechCategory(e.target.value)}>
        {['space', 'engine', 'medical', 'safety', 'material'].map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <div className="grid">
        {techResults.map((item, i) => (
          <div key={i} className="card">
            <h4>{item[1]}</h4>
            <p>{item[2]}</p>
            <a href={item[3]} target="_blank" rel="noreferrer">🔗 View Patent</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechTransferExplorer;
