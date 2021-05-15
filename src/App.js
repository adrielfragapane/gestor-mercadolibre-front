import React, { useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import State from './context/app/State';

import Navigation from './components/Navigation';
import Ordenes from './components/Ordenes';
import Stock from './components/Stock';
import Cassassa from './components/Cassassa';

function App() {
  return (
    <State>
    <Router>
      <Navigation />
      <Route path="/ordenes" component={Ordenes} />
      <Route path="/stock" component={Stock} />
      <Route path="/cassassa" component={Cassassa} />
    </Router>
  </State>
  );
}

export default App;
