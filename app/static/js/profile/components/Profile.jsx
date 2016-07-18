import React, { Component } from 'react';
import RowBackground from '../../shared/components/RowBackground.jsx';
import ProfileCard from '../../shared/components/profile/ProfileCard.jsx';

export default class Profile extends Component {
  render() {
    return (
      <RowBackground>
        <ProfileCard
          aboutMe={this.props.user.aboutMe}
          desiredSkills={this.props.user.desiredSkills}
          desiredSkillsOther={this.props.user.desiredSkillsOther}
          helpReason={this.props.user.helpReason}
          profilePictureUrl={this.props.user.profilePictureUrl}
          shortName={this.props.user.shortName()}
          skills={this.props.user.skills}
          skillsOther={this.props.user.skillsOther}
        />
      </RowBackground>
    )
  }
}
