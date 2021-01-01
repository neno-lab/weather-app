import React from 'react';
import './AddLocation.scss';

const AddLocation = ({ blur }) => {
  if (!blur) return null;
  return (
    <div className='location-container'>
      <form className='form'>
        <div className='add-location-card'>
          <div className='title'>
            <h2>Add location</h2>
            <button className='cancel-btn' type='submit'></button>
          </div>
          <div className='search-bar'>
            <label htmlFor='city'>City</label>
            <input type='text' placeholder='Search for city' />
          </div>
          <div className='location'>
            <button className='add-location-btn' type='submit'>
              Add location
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddLocation;
