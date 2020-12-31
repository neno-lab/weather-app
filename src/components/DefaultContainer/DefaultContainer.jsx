import React from 'react';
import './DefaultContainer.scss';

const DefaultContainer = () => {
  return (
    <div className='default-container'>
      <div className='default-text'>
        <div className='pleading-face'></div>
        <h3>Currently you have not added your city</h3>
        <p>
          It is easy! You can add your city just by clicking add button and
          typing your city in. <br />
          We even have autocomplete so it is way easier.
        </p>
        <button>Add location</button>
      </div>
    </div>
  );
};

export default DefaultContainer;
