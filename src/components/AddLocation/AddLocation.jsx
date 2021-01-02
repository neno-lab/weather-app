import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Autosuggest from 'react-autosuggest';
import cities from './cities.json';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './AddLocation.scss';
import { useHistory } from 'react-router-dom';
import { addCity } from '../../redux/actions/locationActions';

const AddLocation = ({ open, onClose, addCity }) => {
  const { register, handleSubmit } = useForm();
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const history = useHistory();

  const onSubmit = (data) => {
    console.log(data);
    addCity(data);
    history.push('/weather');
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
            <button className='cancel-btn' onClose={onClose}></button>
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
              renderSuggestion={(suggestion) => <div>{suggestion.name}</div>}
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
    addCity: bindActionCreators(addCity, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(AddLocation);
