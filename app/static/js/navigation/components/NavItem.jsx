import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  url: PropTypes.string,
  name: PropTypes.string
};

export default class NavItem extends Component {
  getClassNames() {
    return classNames({
      active: this.props.isActive
    });
  }

  render() {
    return (
      <li role="presentation" className={this.getClassNames()}>
        <a href={this.props.url}>{this.props.name}</a>
      </li>
    )
  }
}

NavItem.propTypes = propTypes;
