import UserProfileActions from '../actions/UserProfileActions';
import alt from '../alt';
import currentUser from '../../shared/models/User';

function firstNonNull(...values) {
  return values.reduce((prev, curr) => {
    if (prev !== null) {
      return prev;
    }
    return curr;
  }, null);
}

class UserProfileStore {
  constructor() {
    this.setInitialState();
    this.bindActions(UserProfileActions);
  }

  setInitialState() {
    this.editable = false;
    this.aboutMe = firstNonNull(currentUser.aboutMe, 'Tell us more about you!');
    this.desiredSkills = currentUser.desiredSkills;
    this.desiredSkillsOther = firstNonNull(currentUser.desiredSkillsOther,
                                           'Tell us more about you!');
    this.helpReason = firstNonNull(currentUser.helpReason, 'Tell us more about you!');
    this.profilePictureUrl = currentUser.profilePictureUrl;
    this.shortName = currentUser.shortName();
    this.skills = currentUser.skills;
    this.skillsOther = firstNonNull(currentUser.skillsOther,
                                    'Tell us more about you!');
  }

  onSaveFields(fields) {
    for (const key in fields) {
      this[key] = fields[key];
    };
  }

  onSetEditable(value) {
    this.editable = value;
  }
}

export default alt.createStore(UserProfileStore, 'UserProfileStore');
