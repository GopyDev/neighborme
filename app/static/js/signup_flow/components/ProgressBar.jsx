import React, { Component, PropTypes } from 'react';
import connectToStores from 'alt/utils/connectToStores';
import SignupFlowStore from '../stores/SignupFlowStore';
import PanelState from '../constants/PanelState';
import classnames from 'classnames';

class Label extends Component {
  get labelClassNames() {
    let highlight = false;
    const name = this.props.name;

    switch (this.props.panel) {
      case PanelState.BASICS:
        highlight = name === 'basics';
        break;
      case PanelState.ABOUT_YOU:
        highlight = name === 'about you';
        break;
      case PanelState.PHOTOS:
        highlight = name === 'photos';
    }

    return classnames({
      "progress-highlight": highlight
    });
  }

  render() {
    return (
      <h4 name={this.props.name} className={this.labelClassNames}>
        {this.props.name}
      </h4>
    );
  }
}

class ProgressBar extends Component {
  static getStores() {
    return [SignupFlowStore];
  }

  static getPropsFromStores() {
    return SignupFlowStore.getState();
  }

  get width() {
    switch (this.props.panel) {
      case PanelState.BASICS:
        return '33%';
      case PanelState.ABOUT_YOU:
        return '66%';
      case PanelState.PHOTOS:
        return '100%';
    }
  }

  render() {
    return (
      <div className="row row-progress">
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuenow="60"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{width: this.width}}
          />
        </div>
        <ul className="progress-labels">
          <li>
            <Label name='basics' panel={this.props.panel} />
          </li>
          <li>
            <Label name='about you' panel={this.props.panel} />
          </li>
          <li>
            <Label name='photos' panel={this.props.panel} />
          </li>
        </ul>
      </div>
    )
  }
}

export default connectToStores(ProgressBar);
