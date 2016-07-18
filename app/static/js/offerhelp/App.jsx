import React from 'react';
import ReactDOM from 'react-dom';
import OfferHelp from './components/OfferHelp.jsx';
import BootstrapData from '../shared/BootstrapData';

ReactDOM.render(
  <OfferHelp requestinfo={BootstrapData.getJSON('requestinfo')} />,
  document.getElementById('offerhelp')
);
