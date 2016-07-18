import React, { Component, PropTypes } from 'react';
import SignupLoginActions from '../../shared/actions/SignupLoginActions.js';
import SignupLoginStore from '../../shared/stores/SignupLoginStore.js';

export default class SignupHeaderLink extends Component {
  onClickSignup() {
    SignupLoginActions.changePane({pane: SignupLoginStore.SIGNUP_PANE});
  }

  render() {
    return (
      <a
        href="#"
        data-toggle="modal"
        data-target="#signupModal"
        onClick={this.onClickSignup}
      >
        Sign Up
      </a>
    )
  }
}
