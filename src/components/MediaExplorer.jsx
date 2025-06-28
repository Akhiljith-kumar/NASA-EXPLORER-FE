import { useEffect, useState } from 'react';
import { searchMedia } from '../api/nasaApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { Grid, Pagination } from 'swiper/modules';

const placeholderExamples = [
  'MOON LANDING',
  'APOLLO MISSION',
  'MARS',
  'SATURN',
  'TELESCOPE',
];

const MediaExplorer = () => {
  const [mediaQuery, setMediaQuery] = useState('');
  const [mediaResults, setMediaResults] = useState([]);
  const [placeholderText, setPlaceholderText] = useState('');
  const [exampleIndex, setExampleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typingForward, setTypingForward] = useState(true);
  const [loading, setLoading] = useState(false);

  // Typing effect
  useEffect(() => {
    const currentExample = placeholderExamples[exampleIndex];
    let timeout;

    if (typingForward) {
      if (charIndex <= currentExample.length) {
        timeout = setTimeout(() => {
          setPlaceholderText(currentExample.substring(0, charIndex));
          setCharIndex((prev) => prev + 1);
        }, 100);
      } else {
        timeout = setTimeout(() => setTypingForward(false), 1000);
      }
    } else {
      if (charIndex >= 0) {
        timeout = setTimeout(() => {
          setPlaceholderText(currentExample.substring(0, charIndex));
          setCharIndex((prev) => prev - 1);
        }, 50);
      } else {
        setTypingForward(true);
        setExampleIndex((exampleIndex + 1) % placeholderExamples.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, typingForward, exampleIndex]);

  useEffect(() => {
    if (mediaQuery.trim() === '') return;

    setLoading(true);
    searchMedia(mediaQuery)
      .then((res) => setMediaResults(res.data.collection.items))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [mediaQuery]);

  return (
    <div className="media-library-wrap">
      <div className='search-bar-wrapper'>
        <p className="seach-media-head head-1">Search NASA <span className='gradient-text'>Media Library</span></p>
      <input
        type="text"
        value={mediaQuery}
        onChange={(e) => setMediaQuery(e.target.value)}
        placeholder={placeholderText}
        className="nasa-search-bar"
      />
      </div>
      {loading && <p className="loading-text">Loading...</p>}
      {/* <img src="icons/solar-system-svgrepo-com.svg" alt="" /> */}
      <Swiper
        slidesPerView={3}
        grid={{ rows: 2, fill: 'row', }}
        spaceBetween={30}
        pagination={{ clickable: true }}
        modules={[Grid, Pagination]}
        breakpoints={{
          320: { slidesPerView: 1, grid: { rows: 1 } },
          768: { slidesPerView: 2, grid: { rows: 2 } },
          1024: { slidesPerView: 3, grid: { rows: 2 } },
        }}
        className="mySwiper"
      >
        {mediaResults.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="media-card">
              <img
                src={item.links?.[0]?.href}
                alt={item.data[0].title}
                className="media-thumb"
              />
              <p className="media-title orange">{item.data[0].title}</p>
              <p className="media-subtitle">{item.data[0].nasa_id}</p>
              <p className="media-desc font-popins">{item.data[0].description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MediaExplorer;
