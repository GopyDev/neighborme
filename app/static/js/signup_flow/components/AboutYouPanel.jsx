import React, { Component, PropTypes } from 'react';
import CurrentUser from '../../shared/models/User';
import { camelCase } from '../../shared/utils/StringUtils';
import SignupFlowActions from '../actions/SignupFlowActions';

export default class AboutYouPanel extends Component {
  get profileAttributes() {
    return {
      aboutMe: this.props.aboutMe
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
          <h3>We know you’re multi-talented! Tell us about yourself:</h3>
          <br />
          <form>
            <div className="form-group">
              <textarea
                className="form-control input-lg"
                name="about_me"
                onChange={this.saveField}
                rows="5"
                value={this.props.aboutMe}
              />
            </div>
          </form>
        </div>
      </div>
    )
  }
}
