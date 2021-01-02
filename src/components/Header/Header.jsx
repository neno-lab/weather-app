import React, { useState } from 'react';
import AddLocation from '../AddLocation/AddLocation';
import './Header.scss';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <>
      <div className='weather-container'>
        <p className='weather-app'>Weather app</p>
        <button className='plus-btn' onClick={onClick}></button>
      </div>
      <AddLocation open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Header;
