import React from 'react';
import './SelectContainer.scss';

const SelectContainer = () => {
  return (
    <div className='select-container'>
      <div className='select-section'>
        <button className='cancel-btn'></button>
        <h2>Cities</h2>
        <ul>
          <li>
            <div className='city'>Split, Croatia</div>
            <button className='delete-btn'></button>
          </li>
          <li>
            <div className='city'>Split, Croatia</div>
            <button className='delete-btn'></button>
          </li>
          <li>
            <div className='city'>Split, Croatia</div>
            <button className='delete-btn'></button>
          </li>
        </ul>
        <button className='add-location'>Add location</button>
      </div>
    </div>
  );
};

export default SelectContainer;
