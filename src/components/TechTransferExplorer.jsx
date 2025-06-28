import { useEffect, useState } from 'react';
import { getTechByCategory } from '../api/nasaApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TechTransferExplorer = () => {
  const [techCategory, setTechCategory] = useState('space');
  const [techResults, setTechResults] = useState([]);

  useEffect(() => {
    getTechByCategory(techCategory)
      .then(res => setTechResults(res.data))
      .catch(console.error);
  }, [techCategory]);

  return (
    <div className="media-library-wrap">
      <h2 className="main-head">TechTransfer <span className='gradient-text'>Patents</span></h2>

      <div className="search-bar-wrapper">
        <select
          value={techCategory}
          onChange={e => setTechCategory(e.target.value)}
          className="nasa-search-bar"
        >
          {['space', 'engine', 'medical', 'safety', 'material'].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <Swiper
        navigation={true}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {techResults.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="media-card">
              {item[10] && (
                <img
                  src={item[10]}
                  alt={item[1]}
                  className="media-thumb"
                />
              )}
              <p className="media-title orange">{item[1]}</p>
              <p className="media-desc">{item[2]}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TechTransferExplorer;
