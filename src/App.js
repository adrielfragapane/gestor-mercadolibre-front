import React, { useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import 'bootstrap/dist/js/bootstrap';

import State from './context/app/State';

import Navigation from './components/Navigation';
import Ordenes from './components/Ordenes';
import Stock from './components/Stock';
import Cassassa from './components/Cassassa';
import Preguntas from './components/Preguntas';
import Facturas from './components/Facturas';
import Waldhuter from './components/Waldhuter ';

function App() {
  return (
    <State>
    <Router>
      <Navigation />
      <Route path="/stock" component={Stock} />
      <Route path="/waldhuter" component={Waldhuter} />
      <Route path="/ordenes" component={Ordenes} />
      <Route path="/facturas" component={Facturas} />
      <Route path="/cassassa" component={Cassassa} />
  <Route path="/preguntas" component={Preguntas} />
    </Router>
  </State>
  );
}

export default App;
