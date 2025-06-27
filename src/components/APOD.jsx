import { useEffect, useState } from 'react';
import { fetchAPOD } from '../api/nasaApi';
import Popup from './popup';

const APODWidget = () => {
    const [apod, setApod] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        fetchAPOD()
            .then(res => setApod(res.data))
            .catch(console.error);
    }, []);

    if (!apod) return <p>Loading...</p>;

    return (
        <div className='apod'>
            <h2 className='head-1'>
                Astronomy <span className='gradient-text'>Picture of the Day</span>
            </h2>
            <div className='flex-row astro-container'>
                <div className='astro-img-container'>
                    <img src={apod.url} alt={apod.title}
                        style={{ width: '100%', maxWidth: '600px', cursor: 'pointer' }}
                        onClick={() => setIsFullScreen(true)} />
                </div>
                <div className='apod-content'>
                    <h3 className='head-2 font-popins'>{apod.title}</h3>
                    <p className='astro-des para vertical-ellipsis font-popins'>{apod.explanation}</p>
                    <a
                        className='regular-btn no-select'
                        onClick={() => {
                            setShowPopup(true);
                            setTimeout(() => setIsPopupOpen(true), 10);
                        }}
                    >
                        Read more
                    </a>
                </div>
            </div>

            {showPopup && (
                <Popup
                    heading={apod.title}
                    description={apod.explanation}
                    imageSrc={apod.url}
                    isVisible={isPopupOpen}
                    onClose={() => {
                        setIsPopupOpen(false);
                        setTimeout(() => setShowPopup(false), 400);
                    }}
                />
            )}

            {isFullScreen && (
                <div className='full-screen-img' onClick={() => setIsFullScreen(false)}>
                    <img src={apod.url} alt={apod.title} />
                </div>
            )}

        </div>
    );
};

export default APODWidget;
