import React from 'react';
import ReactDOM from 'react-dom';
import Browse from './components/Browse.jsx';
import BootstrapData from '../shared/BootstrapData';

ReactDOM.render(
  <Browse requests={BootstrapData.getJSON('requests')} />,
  document.getElementById('browse')
);
