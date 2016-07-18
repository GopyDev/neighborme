import React, { Component, PropTypes } from 'react';

export default class SignupForm extends Component {
  render() {
    return (
      <form
        acceptCharset="UTF-8"
        action="/signup"
        className="signup-form"
        data-action="Signup"
        method="post"
      >
        <input
          id="csrf_token"
          type="hidden"
          name="csrf_token"
          value={this.props.csrf_token}
        />
        <div className="signup-form-fields">
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
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              name="password_confirmation"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-join">Join</button>
      </form>
    );
  }
}
