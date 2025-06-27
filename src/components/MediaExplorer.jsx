import { useEffect, useState } from 'react';
import { searchMedia } from '../api/nasaApi';

const MediaExplorer = () => {
  const [mediaQuery, setMediaQuery] = useState('moon');
  const [mediaResults, setMediaResults] = useState([]);

  useEffect(() => {
    searchMedia(mediaQuery).then(res => setMediaResults(res.data.collection.items)).catch(console.error);
  }, [mediaQuery]);

  return (
    <div className='media-library-wrap'>
      <h2>NASA Media Library</h2>
      <input
        type="text"
        value={mediaQuery}
        onChange={e => setMediaQuery(e.target.value)}
        placeholder="Search media..."
      />
      <div className="grid">
        {mediaResults.map((item, i) => (
          <div key={i} className="card">
            <img src={item.links?.[0]?.href} alt="nasa media" />
            <p>{item.data[0].title}</p>
            <p>{item.data[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaExplorer;
