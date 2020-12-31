import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './routes/Home';
import WeatherDetailPage from './routes/WeatherDetailPage';
import './App.scss';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/weather' component={WeatherDetailPage} />
      </Switch>
    </Router>
  );
};

export default App;