import React, { Component, PropTypes } from 'react';
import SignupLoginActions from '../../shared/actions/SignupLoginActions.js';
import SignupLoginStore from '../../shared/stores/SignupLoginStore.js';

export default class SignupLink extends Component {
  onClickSignup() {
    SignupLoginActions.changePane({pane: SignupLoginStore.SIGNUP_PANE});
  }

  render() {
    return (
      <button
        className="btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#signupModal"
        onClick={this.onClickSignup}
      >
        Sign up
      </button>
    )
  }
}
