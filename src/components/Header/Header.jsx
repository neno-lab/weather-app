import React, { useState } from 'react';
import AddLocation from '../AddLocation/AddLocation';
import './Header.scss';

const Header = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onClickPlus = (e) => {
    e.preventDefault();
    setIsOpenModal(true);
  };

  return (
    <>
      <div className='header-container'>
        <p className='weather-app-title'>Weather app</p>
        <button className='plus-btn' onClick={onClickPlus}></button>
      </div>
      <AddLocation open={isOpenModal} onClose={() => setIsOpenModal(false)} />
    </>
  );
};

export default Header;
