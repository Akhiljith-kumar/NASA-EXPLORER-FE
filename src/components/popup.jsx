import { useEffect, useState } from 'react';

const Popup = ({ heading, description, imageSrc, onClose, isVisible }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [isVisible]);

  return (
    <div id="pop-up" className={`${visible ? 'active' : ''} blue-grey-bg`}>
      <h2 className='font-popins' style={{ fontWeight: '400' }}>{heading}</h2>
      <p className='font-popins' style={{ margin: '25px 0px' }}>{description}</p>
      <a className="regular-btn" onClick={onClose}>Close</a>
    </div>
  );
};

export default Popup;
