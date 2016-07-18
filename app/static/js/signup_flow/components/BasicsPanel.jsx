import React, { Component, PropTypes } from 'react';
import SignupFlowActions from '../actions/SignupFlowActions';
import { camelCase } from '../../shared/utils/StringUtils';
import CurrentUser from '../../shared/models/User';

const propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  zipcode: PropTypes.string,
  gender: PropTypes.string,
  phoneNumber: PropTypes.string,
  CSRFToken: PropTypes.string
};

export default class BasicsPanel extends Component {
  get profileAttributes() {
    return {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      zipcode: this.props.zipcode,
      gender: this.props.gender,
      phoneNumber: this.props.phoneNumber
    }
  }

  componentWillUnmount() {
    SignupFlowActions.updateProfile({
      userId: CurrentUser.id,
      params: this.profileAttributes
    });
  }

  saveField(event) {
    const key = camelCase(event.target.name);
    const value = event.target.value;

    SignupFlowActions.saveField({key, value});
  }

  render() {
    return (
      <div>
        <div className="text-center">
          <h3>Tell us some basic facts about you</h3>
          <br />
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
              value={this.props.CSRFToken}
            />
            <div className="signup-form-fields">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control input-lg"
                  placeholder="First name"
                  name="first_name"
                  onChange={this.saveField}
                  value={this.props.firstName}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control input-lg"
                  placeholder="Last name"
                  name="last_name"
                  onChange={this.saveField}
                  value={this.props.lastName}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control input-lg"
                  placeholder="Zipcode"
                  name="zipcode"
                  onChange={this.saveField}
                  value={this.props.zipcode}
                />
              </div>
              <div className="form-group">
                <select
                  name="gender"
                  className="form-control input-lg"
                  defaultValue="gender"
                  onChange={this.saveField}
                  value={this.props.gender}
                >
                  <option value="gender" disabled hidden>Gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  className="form-control input-lg"
                  placeholder="Phone"
                  name="phone_number"
                  onChange={this.saveField}
                  value={this.props.phoneNumber}
                />
              </div>
            </div>
          </form>

          <small>We take data privacy very seriously. We won’t share your phone number unless you’ve accepted or offered help</small>
        </div>
      </div>
    )
  }
}

BasicsPanel.propTypes = propTypes;
