import React from 'react';
import ReactDOM from 'react-dom';
import SignupLoginModal from './components/SignupLoginModal.jsx';
import SignupLink from './components/SignupLink.jsx';
import SignupHeaderLink from './components/SignupHeaderLink.jsx';
import LoginHeaderLink from './components/LoginHeaderLink.jsx';
import LogoutHeaderLink from './components/LogoutHeaderLink.jsx';
import BootstrapData from '../shared/BootstrapData';

ReactDOM.render(
  <SignupLoginModal
    csrf_token={BootstrapData.get('csrf_token')}
  />,
  document.getElementById('signup-login-modal-js')
);

ReactDOM.render(
  <SignupLink />,
  document.getElementById('signup-link-js')
);

const signupHeaderLink = document.getElementById('signup-header-link-js');
if (signupHeaderLink) {
  ReactDOM.render(
    <SignupHeaderLink />,
    signupHeaderLink
  );
}

const loginHeaderLink = document.getElementById('login-header-link-js');
if (loginHeaderLink) {
  ReactDOM.render(
    <LoginHeaderLink />,
    loginHeaderLink
  );
}

const logoutHeaderLink = document.getElementById('logout-header-link-js');
if (logoutHeaderLink) {
  ReactDOM.render(
    <LogoutHeaderLink />,
    logoutHeaderLink
  );
}
