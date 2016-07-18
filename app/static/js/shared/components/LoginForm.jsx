import React, { Component, PropTypes } from 'react';

export default class LoginForm extends Component {
  render() {
    return (
      <form
        acceptCharset="UTF-8"
        action="/login"
        className="login-form"
        data-action="login"
        method="post"
      >
        <input
          id="csrf_token"
          type="hidden"
          name="csrf_token"
          value={this.props.csrf_token}
        />
        <div className="login-form-fields">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              name="email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
            />
          </div>
        </div>
        <a className="forgot-password-link" href="#">Forgot your password?</a>
        <button type="submit" className="btn btn-join">Log in</button>
      </form>
    );
  }
}
