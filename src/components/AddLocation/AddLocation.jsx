import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Autosuggest from 'react-autosuggest';
import cities from './cities.json';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './AddLocation.scss';
import { addCityToUrl } from '../../redux/actions/locationActions';

const AddLocation = ({ open, onClose, addCityToUrl }) => {
  const { register, handleSubmit } = useForm();
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const onSubmit = (data) => {
    if (!data.city) return;
    addCityToUrl(data);
    onClose();
  };

  if (!open) return null;
  return (
    <div className='location-container'>
      <form
        className='form'
        onSubmit={handleSubmit(onSubmit)}
        autoComplete='off'
      >
        <div className='add-location-card'>
          <div className='title'>
            <h2>Add location</h2>
            <button
              className='cancel-btn'
              onClick={onClose}
              type='button'
            ></button>
          </div>
          <div className='search-bar'>
            <label htmlFor='city'>City</label>
            <Autosuggest
              inputProps={{
                ref: register,
                placeholder: 'Search for city',
                name: 'city',
                id: 'city-id',
                value: city,
                type: 'search',
                onChange: (_event, { newValue }) => {
                  setCity(newValue);
                },
              }}
              suggestions={suggestions}
              onSuggestionsFetchRequested={async ({ value }) => {
                if (!value) {
                  setSuggestions([]);
                  return;
                }
                setSuggestions(
                  cities.filter((city) =>
                    city.name.toLowerCase().includes(value.toLocaleLowerCase())
                  )
                );
              }}
              onSuggestionsClearRequested={() => {
                setSuggestions([]);
              }}
              getSuggestionValue={(suggestion) => suggestion.name}
              renderSuggestion={(suggestion) => (
                <div className='suggest'>{suggestion.name}</div>
              )}
            />
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

const mapDispatchToProps = (dispatch) => {
  return {
    addCityToUrl: bindActionCreators(addCityToUrl, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(AddLocation);
