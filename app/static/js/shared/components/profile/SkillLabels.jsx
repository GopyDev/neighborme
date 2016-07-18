import React, { Component, PropTypes } from 'react';
import SkillButton from './SkillButton.jsx';

const propTypes = {
  skills: PropTypes.array,
};

export default class SkillLabels extends Component {
  render() {
    return (
      <div className="skill-labels">
        {this.props.skills.map((name, i) => {
          return (
            <SkillButton
              handleClick={() => {}}
              key={i}
              name={name}
              selected
            />
          );
        })}
      </div>
    );
  }
}

SkillLabels.propTypes = propTypes;
