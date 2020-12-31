import React from 'react';
import './AddLocation.scss';

const AddLocation = () => {
  return (
    <div className='add-location-card'>
      <div className='title'>
        <h2>Add location</h2>
        <button className='cancel-btn'>X</button>
      </div>
      <div className='search-bar'>
        <label htmlFor='city'>City</label>
        <input type='text' placeholder='Search for city' />
      </div>
      <div className='location'>
        <button className='add-location-btn'>Add location</button>
      </div>
    </div>
  );
};

export default AddLocation;
