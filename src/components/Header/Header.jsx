import React, { useState } from 'react';
import AddLocation from '../AddLocation/AddLocation';
import { connect } from 'react-redux';
import './Header.scss';

const Header = ({ cities }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onClickPlus = (e) => {
    e.preventDefault();
    setIsOpenModal(true);
  };

  return (
    <>
      <div className='header-container'>
        <p className='weather-app-title'>
          {cities.length === 0 ? 'Weather app' : ''}
        </p>
        <button className='plus-btn' onClick={onClickPlus}></button>
      </div>
      <AddLocation open={isOpenModal} onClose={() => setIsOpenModal(false)} />
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    cities: state.locationReducer.cities,
  };
};

export default connect(mapStateToProps, null)(Header);
