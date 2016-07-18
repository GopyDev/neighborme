import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './components/Profile.jsx';

import BootstrapData from '../shared/BootstrapData';
import User from '../shared/models/UserObject';

const user = new User(BootstrapData.getJSON('profile'));

ReactDOM.render(
  <Profile
    user={user}
  />,
  document.getElementById('profile')
);
