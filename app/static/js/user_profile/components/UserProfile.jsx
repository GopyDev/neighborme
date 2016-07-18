import React, { Component } from 'react';
import connectToStores from 'alt/utils/connectToStores';
import SubNav from '../../navigation/components/SubNav.jsx';
import RowBackground from '../../shared/components/RowBackground.jsx';
import ProfileCard from '../../shared/components/profile/ProfileCard.jsx';
import EditableProfileCard from '../../shared/components/profile/EditableProfileCard.jsx';
import UserProfileStore from '../stores/UserProfileStore';
import UserProfileActions from '../actions/UserProfileActions';
import SettingsNav from './SettingsNav.jsx'

class UserProfile extends Component {
  static getStores() {
    return [UserProfileStore];
  }

  static getPropsFromStores() {
    return UserProfileStore.getState();
  }

  handleClickEdit() {
    UserProfileActions.setEditable(true);
  }

  handleClickSave({userId, profileAttributes}) {
    UserProfileActions.updateProfile({
      userId: userId,
      params: profileAttributes
    });
    UserProfileActions.saveFields(profileAttributes);
    UserProfileActions.setEditable(false);
  }

  handleUploadPhoto(params) {
    UserProfileActions.uploadPhoto(params);
  }

  render() {
    return (
      <div>
        <SubNav activeIndex={3} />
        <SettingsNav />
        <RowBackground>
          {this.props.editable ?
            <EditableProfileCard
                aboutMe={this.props.aboutMe}
                desiredSkillsOther={this.props.desiredSkillsOther}
                handleClickSave={this.handleClickSave}
                handleUploadPhoto={this.handleUploadPhoto}
                helpReason={this.props.helpReason}
                skillsOther={this.props.skillsOther}
            /> :
            <ProfileCard
                aboutMe={this.props.aboutMe}
                desiredSkills={this.props.desiredSkills}
                desiredSkillsOther={this.props.desiredSkillsOther}
                handleClickEdit={this.handleClickEdit}
                helpReason={this.props.helpReason}
                profilePictureUrl={this.props.profilePictureUrl}
                shortName={this.props.shortName}
                skills={this.props.skills}
                skillsOther={this.props.skillsOther}
                editable
            />
          }
        </RowBackground>
      </div>
    )
  }
}

export default connectToStores(UserProfile);
