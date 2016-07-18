import React from 'react';
import ReactDOM from 'react-dom';
import Offers from './components/Offers.jsx';
import BootstrapData from '../shared/BootstrapData';

ReactDOM.render(
  <Offers request={BootstrapData.getJSON('offers')}/>,
  document.getElementById('offers')
);