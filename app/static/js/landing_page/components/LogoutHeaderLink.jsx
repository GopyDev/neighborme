import React, { Component, PropTypes } from 'react';
import SignupLoginActions from '../../shared/actions/SignupLoginActions.js';
import SignupLoginStore from '../../shared/stores/SignupLoginStore.js';

export default class LogoutHeaderLink extends Component {
  onClickLogout() {
    if (FB === 'undefined') { return; }
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        FB.logout();
      }
    })
  }

  render() {
    return (
      <a
        href="/logout"
        onClick={this.onClickLogout}
      >
        Logout
      </a>
    )
  }
}
