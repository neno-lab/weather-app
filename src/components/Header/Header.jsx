import React, { useState } from 'react';
import AddLocation from '../AddLocation/AddLocation';
import SelectContainer from '../SelectContainer/SelectContainer';
import './Header.scss';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <>
      <div className='header-container'>
        <p className='weather-app-title'>Weather app</p>
        <button className='heart-btn'></button>
        <button className='plus-btn' onClick={onClick}></button>
      </div>
      <AddLocation open={isOpen} onClose={() => setIsOpen(false)} />
      <SelectContainer />
    </>
  );
};

export default Header;
