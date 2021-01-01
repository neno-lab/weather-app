import React, { useState } from 'react';
import AddLocation from '../AddLocation/AddLocation';
import './Header.scss';

const Header = () => {
  const [isBlur, setIsBlur] = useState(false);

  const onClick = (e) => {
    e.preventDefault();
    setIsBlur(true);
  };

  return (
    <>
      <div className='weather-container'>
        <p className='weather-app'>Weather app</p>
        <button className='plus-btn' onClick={onClick}></button>
      </div>
      <AddLocation blur={isBlur} />
    </>
  );
};

export default Header;
