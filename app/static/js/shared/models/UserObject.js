export default class User {
  constructor(props) {
    this.id = props.id;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.zipcode = props.zipcode;
    this.gender = props.gender;
    this.phoneNumber = props.phoneNumber;
    this.skills = props.skills;
    this.skillsOther = props.skillsOther;
    this.desiredSkills = props.desiredSkills;
    this.desiredSkillsOther = props.desiredSkillsOther;
    this.profilePictureUrl = props.profilePictureUrl;
    this.aboutMe = props.aboutMe;
    this.helpReason = props.helpReason;
  }

  shortName() {
    return this.firstName + ' ' + this.lastName[0] + '.';
  }
}
