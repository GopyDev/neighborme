import React from 'react';
import ReactDOM from 'react-dom';
import LoginPane from '../shared/components/LoginPane.jsx';
import BootstrapData from '../shared/BootstrapData';

ReactDOM.render(
  <LoginPane
    csrf_token={BootstrapData.get('csrf_token')}
    static
  />,
  document.getElementById('login-pane-js')
);
