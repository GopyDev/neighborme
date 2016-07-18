import React from 'react';
import ReactDOM from 'react-dom';
import SignupPane from '../shared/components/SignupPane.jsx';
import BootstrapData from '../shared/BootstrapData';

ReactDOM.render(
  <SignupPane
    csrf_token={BootstrapData.get('csrf_token')}
    static
  />,
  document.getElementById('signup-pane-js')
);
