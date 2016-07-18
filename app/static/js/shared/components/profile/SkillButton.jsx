import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class SkillButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  get classes() {
    const selected = this.props.selected;
    return classnames(
      'skill-button',
      'btn',
      {'btn-pink': selected},
      {'btn-default': !selected},
      {'selected': selected},
      'btn-lg',
      'btn-margin'
    );
  }

  handleClick() {
    if (this.props.toggleDisabled) { return; }
    const selected = !this.props.selected;
    const name = this.props.name;
    this.props.handleClick({name, selected});
  }

  render() {
    const name = this.props.name;
    return (
      <button
        type="button"
        className={this.classes}
        onClick={this.handleClick}
      >
        {name}
      </button>
    )
  }
}
