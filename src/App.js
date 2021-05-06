import React, { useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import State from './context/app/State';

import Navigation from './components/Navigation';
import Ordenes from './components/Ordenes';
import Stock from './components/Stock';

function App() {
  return (
    <State>
    <Router>
      <Navigation />
      <Route path="/ordenes" component={Ordenes} />
      <Route path="/stock" component={Stock} />
    </Router>
  </State>
  );
}

export default App;
