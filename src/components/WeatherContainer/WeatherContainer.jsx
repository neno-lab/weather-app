import React from 'react';
import './WeatherContainer.scss';

const WeatherContainer = () => {
  return (
    <div className='weather-container'>
      <div className='details-container'>
        <div className='top-details'>
          <div className='degree-location'>
            <div className='degree'>24&deg;</div>
            <div className='location'>Split</div>
          </div>
          <div className='weather-image'></div>
        </div>

        <div className='middle-details'>
          <p className='min'>Min. -10&deg;</p>
          <p className='max'>Max. 25&deg;</p>
        </div>

        {/* <div className='bottom-details'>
          <div className='days'><p>today, tomorrow, wednesday</p></div>
          <div className='sunrise-sunset'>
            <div className='sunrise'>
              <p>Sunrise</p>
              <p>At 6:30am</p>
            </div>
            <div className='sunset'>
              <p>Sunset</p>
              <p>At 7:21pm</p>
            </div>
          </div>
        </div> */}
      </div>
      <div className='favorites-container'>
        <p className='favorite-city-title'>Favorite city</p>
        <ul>
          <li>
            <div className='city'>Split, Croatia</div>
            <div className='cancel-btn'></div>
          </li>
          <li>
            <div className='city'>Split, Croatia</div>
            <div className='cancel-btn'></div>
          </li>
          <li>
            <div className='city'>Split, Croatia</div>
            <div className='cancel-btn'></div>
          </li>
          <li>
            <div className='city'>Split, Croatia</div>
            <div className='cancel-btn'></div>
          </li>
          <li>
            <div className='city'>Split, Croatia</div>
            <div className='cancel-btn'></div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WeatherContainer;
