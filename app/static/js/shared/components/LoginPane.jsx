import React, { Component, PropTypes } from 'react';
import LoginForm from './LoginForm.jsx';
import SignupLoginActions from '../actions/SignupLoginActions.js';
import SignupLoginStore from '../stores/SignupLoginStore.js';

export default class LoginPane extends Component {
  onClickSignup(e) {
    SignupLoginActions.changePane({pane: SignupLoginStore.SIGNUP_PANE});
    e.preventDefault();
  }

  onClickFacebookLogin() {
    if (FB === 'undefined') { return; }
    FB.login();
  }

  render() {
    var signupButton;
    if (this.props.static) {
      signupButton = <a href="/signup">Join</a>;
    } else {
      signupButton = <a onClick={this.onClickSignup} href="#">Join</a>;
    }

    return (
      <div>
        <div className="modal-body">
          <div className="modal-body--header">
            <h2>Welcome back!</h2>
          </div>
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              <LoginForm csrf_token={this.props.csrf_token} />
            </div>
          </div>
        </div>
        <div className="modal-footer modal-footer-no-border">
          <div className="modal-footer--text">
            New to NeighborMe? {signupButton}
          </div>
        </div>
      </div>
    );
  }
}
