import React, { Component, PropTypes } from 'react';
import User from '../../../shared/models/User';
import EditIconButton from './EditIconButton.jsx';
import SkillLabels from './SkillLabels.jsx';
import Header from './Header.jsx';
import Body from './Body.jsx';
import Section from './Section.jsx';

const propTypes = {
  aboutMe: PropTypes.string.isRequired,
  desiredSkills: PropTypes.array.isRequired,
  desiredSkillsOther: PropTypes.string.isRequired,
  editable: PropTypes.boolean,
  handleClickEdit: PropTypes.func,
  helpReason: PropTypes.string.isRequired,
  profilePictureUrl: PropTypes.string.isRequired,
  shortName: PropTypes.string.isRequired,
  skills: PropTypes.array.isRequired,
  skillsOther: PropTypes.string.isRequired
};

export default class ProfileCard extends Component {
  render() {
    return (
      <div className="panel panel-default panel-profile">
        <div className="panel-body">
          <div className="panel-body--header clearfix">
            <img
              className="pull-left user-profile--image"
              src={this.props.profilePictureUrl}
              height="240"
              width="240"
            />
            <h2>{this.props.shortName}</h2>
            {this.props.editable ?
              <EditIconButton handleClick={this.props.handleClickEdit} />
              : null}
          </div>

          <Section>
            <Header>About Me</Header>
            <Body>{this.props.aboutMe}</Body>
          </Section>

          <Section>
            <Header>Offering</Header>
            <SkillLabels skills={this.props.skills} />
            <Body>{this.props.skillsOther}</Body>
          </Section>

          <Section>
            <Header>Requesting</Header>
            <SkillLabels skills={this.props.desiredSkills} />
            <Body>{this.props.desiredSkillsOther}</Body>
          </Section>

          <Section>
            <Header>I want to help other women because</Header>
            <Body>{this.props.helpReason}</Body>
          </Section>

          <Section>
            <Header>Reviews</Header>
            <Body>You don’t have any reviews yet</Body>
          </Section>

        </div>
      </div>
    )
  }
}
