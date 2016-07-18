import React, { Component, PropTypes } from 'react';
import connectToStores from 'alt/utils/connectToStores';

import BasicsPanel from './BasicsPanel.jsx';
import AboutYouPanel from './AboutYouPanel.jsx';
import PhotosPanel from './PhotosPanel.jsx';

import SignupFlowActions from '../actions/SignupFlowActions';
import SignupFlowStore from '../stores/SignupFlowStore';

import PanelState from '../constants/PanelState';

import CurrentUser from '../../shared/models/User';

class SignupFlowPanel extends Component {
  constructor(props) {
    super(props);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  static getStores() {
    return [SignupFlowStore];
  }

  static getPropsFromStores() {
    return SignupFlowStore.getState();
  }

  panelContents() {
    switch (this.props.panel) {
      case PanelState.BASICS:
        return (
          <BasicsPanel
            firstName={this.props.firstName}
            lastName={this.props.lastName}
            zipcode={this.props.zipcode}
            gender={this.props.gender}
            phoneNumber={this.props.phoneNumber}
            CSRFToken={this.props.csrf_token}
          />
        );
      case PanelState.ABOUT_YOU:
        return (
          <AboutYouPanel
            aboutMe={this.props.aboutMe}
          />
        );
      case PanelState.PHOTOS:
        return <PhotosPanel />;
    }
  }

  handleBackClick() {
    SignupFlowActions.changePanel({panel: this.props.panel - 1});
  }

  handleNextClick() {
    SignupFlowActions.changePanel({panel: this.props.panel + 1});
  }

  handleDoneClick() {
    SignupFlowActions.completeSignup({userId: CurrentUser.id});
  }

  renderBackButton() {
    if (this.props.panel !== PanelState.BASICS) {
      return (
        <button
          onClick={this.handleBackClick}
          className="panel-bottom--back btn btn-link"
        >
          Back
        </button>
      );
    }
  }

  renderNextButton() {
    if (this.props.panel === PanelState.PHOTOS) {
      return (
        <button
          onClick={this.handleDoneClick}
          className="panel-bottom--done btn btn-link"
        >
          Done
        </button>
      );
    } else {
      return (
        <button
          onClick={this.handleNextClick}
          className="panel-bottom--next btn btn-link"
        >
          Next
        </button>
      );
    }
  }

  render() {
    return (
      <div className="panel panel-default panel-signup">
        <div className="panel-body">
          {this.panelContents()}
          <div className="panel-bottom">
            {this.renderBackButton()}
            {this.renderNextButton()}
          </div>
        </div>
      </div>
    )
  }
}

export default connectToStores(SignupFlowPanel);
