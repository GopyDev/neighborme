import React, { Component } from 'react';

export default class Body extends Component {
  render() {
    return (
      <p>{this.props.children}</p>
    );
  }
}
