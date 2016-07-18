import React, { Component, PropTypes } from 'react';
import ProgressBar from './ProgressBar.jsx';
import SignupFlowPanel from './SignupFlowPanel.jsx';

export default class SignupFlow extends Component {
  render() {
    return (
      <div>
        <ProgressBar />
        <div className="col-md-6 col-md-offset-3">
          <SignupFlowPanel />
        </div>
      </div>
    )
  }
}
