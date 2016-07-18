import React, { Component, PropTypes } from 'react';
import SignupPane from '../../shared/components/SignupPane.jsx';
import LoginPane from '../../shared/components/LoginPane.jsx';
import SignupLoginStore from '../../shared/stores/SignupLoginStore.js';
import connectToStores from 'alt/utils/connectToStores';

class SignupLoginModal extends Component {
  static getStores() {
    return [SignupLoginStore];
  }

  static getPropsFromStores() {
    return SignupLoginStore.getState()
  }

  renderPane() {
    if (this.props.pane === SignupLoginStore.LOGIN_PANE) {
      return <LoginPane csrf_token={this.props.csrf_token} />;
    } else if (this.props.pane === SignupLoginStore.SIGNUP_PANE) {
      return <SignupPane csrf_token={this.props.csrf_token} />;
    }
  }

  render() {
    return (
      <div
        className="modal fade"
        id="signupModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="signupModalLabel"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content modal-signup text-center">
            <div className="modal-header modal-header-no-border">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {this.renderPane()}
          </div>
        </div>
      </div>
    );
  }
}

export default connectToStores(SignupLoginModal);
