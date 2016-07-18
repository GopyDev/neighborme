import React, { Component, PropTypes } from 'react';
import SignupForm from './SignupForm.jsx';
import SignupLoginActions from '../actions/SignupLoginActions.js';
import SignupLoginStore from '../stores/SignupLoginStore.js';

export default class SignupPane extends Component {
  onClickLogin(e) {
    SignupLoginActions.changePane({pane: SignupLoginStore.LOGIN_PANE});
    e.preventDefault();
  }

  onClickFacebookSignup() {
    if (FB === 'undefined') { return; }
    FB.login();
  }

  render() {
    var loginButton;
    if (this.props.static) {
      loginButton = <a href="/login">Login</a>;
    } else {
      loginButton = <a onClick={this.onClickLogin} href="#">Login</a>;
    }

    return (
      <div>
        <div className="modal-body">
          <div className="modal-body--header">
            <h2>Join the Neighborhood</h2>
          </div>
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              <SignupForm csrf_token={this.props.csrf_token} />
            </div>
          </div>
        </div>
        <div className="modal-footer modal-footer-no-border">
          <div className="modal-footer--text">
            Already a member? {loginButton}
          </div>
        </div>
      </div>
    );
  }
}
