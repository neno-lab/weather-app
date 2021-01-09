import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  addFavoriteCity,
  deleteCity,
  setIsFavoriteCity,
} from '../../redux/actions/locationActions';
import './SelectContainer.scss';

const SelectContainer = ({
  open,
  close,
  cities,
  deleteCity,
  addFavoriteCity,
  setIsFavoriteCity,
}) => {
  if (!open) return null;

  const handleFavorite = (city) => {
    setIsFavoriteCity(true);
    addFavoriteCity(city);
  };

  const handleDelete = (e, city) => {
    e.stopPropagation();
    deleteCity(city);
  };

  return (
    <div className='select-container'>
      <div className='select-section'>
        <button className='cancel-btn' onClick={close}></button>
        <h2>Cities</h2>
        <ul>
          {cities.map((city) => (
            <li key={city.id} onClick={() => handleFavorite(city)}>
              <div className='city'>{city.name}</div>
              <button
                className='delete-btn'
                onClick={(e) => handleDelete(e, city.id)}
              ></button>
            </li>
          ))}
        </ul>
        <button className='add-location'>Add location</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    cities: state.locationReducer.cities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCity: bindActionCreators(deleteCity, dispatch),
    addFavoriteCity: bindActionCreators(addFavoriteCity, dispatch),
    setIsFavoriteCity: bindActionCreators(setIsFavoriteCity, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectContainer);
