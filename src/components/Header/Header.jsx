import React, { useState } from 'react';
import AddLocation from '../AddLocation/AddLocation';
import './Header.scss';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const arr = [
    {
      id: 1,
      name: 'a',
      daily: 'aa',
    },
    {
      id: 2,
      name: 'b',
      daily: 'bb',
    },
    {
      id: 3,
      name: 'c',
      daily: 'cc',
    },
  ];

  const found = arr.find((item) => item.id === 1);
  console.log(found);

  return (
    <>
      <div className='header-container'>
        <p className='weather-app-title'>Weather app</p>
        <button className='plus-btn' onClick={onClick}></button>
      </div>
      <AddLocation open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Header;
