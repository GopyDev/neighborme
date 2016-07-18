import React, { Component, PropTypes } from 'react';

const propTypes = {
  handleClick: PropTypes.func.isRequired
};

export default class EditIconButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.handleClick();
    e.preventDefault();
  }

  render() {
    return (
      <a
        href="#"
        onClick={this.handleClick}
      >
        <img
          className="edit-icon"
          src="/static/img/Edit.png"
          height="40"
          width="40"
        />
      </a>
    );
  }
}

EditIconButton.propTypes = propTypes;
