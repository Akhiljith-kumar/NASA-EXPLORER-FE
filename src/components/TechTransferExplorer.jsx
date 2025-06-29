import { useEffect, useState } from 'react';
import { getTechByCategory } from '../api/nasaApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Popup from './popup';

import 'swiper/css';
import 'swiper/css/navigation';

const TechTransferExplorer = () => {
  const [techCategory, setTechCategory] = useState('space');
  const [techResults, setTechResults] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);


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
              <p className="media-title font-popins orange">
                {item[2]}
              </p>
              <p className="media-subtitle orange">{item[1]}</p>
              <p className="media-desc font-popins">
                {item[3]?.length > 100 ? item[3].slice(0, 150) + '...' : item[3]}
              </p>
              {true && (
                <a
                  className="regular-btn"
                  style={{marginTop:'15px', width:'123px'}}
                  onClick={() => {
                    setActiveItem(item);
                    setShowPopup(true);
                    setTimeout(() => setIsPopupOpen(true), 10);
                  }}
                >
                  Read More
                </a>
              )}
            </div>
          </SwiperSlide>

        ))}
      </Swiper>
      {showPopup && activeItem && (
        <Popup
          heading={activeItem[2]}
          description={activeItem[3]}
          isVisible={isPopupOpen}
          onClose={() => {
            setIsPopupOpen(false);
            setTimeout(() => {
              setShowPopup(false);
              setActiveItem(null);
            }, 400);
          }}
        />
      )}

    </div>
  );
};

export default TechTransferExplorer;
