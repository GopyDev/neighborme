import React, { Component, PropTypes } from 'react';

export default class RowBackground extends Component {
  render() {
    return (
      <div className="row row-gray">
        <div className="container">
          <div className="row row-houses-bg">
            <div className="col-sm-10 col-sm-offset-1">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
