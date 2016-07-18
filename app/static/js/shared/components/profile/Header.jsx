import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <h4 className="header">{this.props.children}</h4>
    );
  }
}
