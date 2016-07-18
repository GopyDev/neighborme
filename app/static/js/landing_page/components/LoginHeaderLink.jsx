import React, { Component, PropTypes } from 'react';
import SignupLoginActions from '../../shared/actions/SignupLoginActions.js';
import SignupLoginStore from '../../shared/stores/SignupLoginStore.js';

export default class LoginHeaderLink extends Component {
  onClickLogin() {
    SignupLoginActions.changePane({pane: SignupLoginStore.LOGIN_PANE});
  }

  render() {
    return (
      <a
        href="#"
        data-toggle="modal"
        data-target="#signupModal"
        onClick={this.onClickLogin}
      >
        Login
      </a>
    )
  }
}
