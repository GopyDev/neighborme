import React, { Component, PropTypes } from 'react';
import User from '../../../shared/models/User';
import SkillLabels from './SkillLabels.jsx';
import Header from './Header.jsx';
import Body from './Body.jsx';
import Section from './Section.jsx';

const propTypes = {
  aboutMe: PropTypes.string.isRequired,
  desiredSkillsOther: PropTypes.string.isRequired,
  handleClickSave: PropTypes.func.isRequired,
  handleUploadPhoto: PropTypes.func.isRequired,
  helpReason: PropTypes.string.isRequired,
  skillsOther: PropTypes.string.isRequired
};

export default class EditableProfileCard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleEditPhotoClick = this.handleEditPhotoClick.bind(this);
    this.handleFileInputChange = this.handleFileInputChange.bind(this);
  }

  get profileAttributes() {
    return {
      aboutMe: this.refs.aboutMe.value,
      skillsOther: this.refs.skillsOther.value,
      desiredSkillsOther: this.refs.desiredSkillsOther.value,
      helpReason: this.refs.helpReason.value,
    }
  }

  handleClick(e) {
    this.props.handleClickSave({
      userId: User.id,
      profileAttributes: this.profileAttributes});
    e.preventDefault();
  }

  handleEditPhotoClick() {
    this.refs.fileInput.click();
  }

  handleFileInputChange() {
    const file = this.refs.fileInput.files[0];
    const preview = this.refs.image;
    const reader = new FileReader();

    reader.onloadend = () => {
      const formData = new FormData();
      formData.append('picture', file, file.name);
      this.props.handleUploadPhoto({userId: User.id, formData: formData});
      preview.src = reader.result;
    }

    if (file && file.type.match('image.*')) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
  }

  render() {
    return (
      <div className="panel panel-default panel-profile">
        <div className="panel-body">
          <div className="panel-body--header clearfix">
            <img
              className="pull-left user-profile--image"
              src={User.profilePictureUrl}
              ref="image"
              height="240"
              width="240"
            />
            <h2>{User.shortName()}</h2>
          </div>

          <div className="edit-photo-button-container">
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block"
              onClick={this.handleEditPhotoClick}
            >
              Upload New Photo
            </button>
            <input
              type="file"
              ref="fileInput"
              onChange={this.handleFileInputChange}
              style={{visibility: 'hidden', width: '1px'}}
            />
          </div>

          <Section>
            <Header>About Me</Header>
            <textarea
              className="form-control"
              defaultValue={this.props.aboutMe}
              ref="aboutMe"
              rows="3"
            />
          </Section>

          <Section>
            <Header>Offering</Header>
            <SkillLabels skills={User.skills} />
            <textarea
              className="form-control"
              defaultValue={this.props.skillsOther}
              ref="skillsOther"
              rows="3"
            />
          </Section>

          <Section>
            <Header>Requesting</Header>
            <SkillLabels skills={User.desiredSkills} />
            <textarea
              className="form-control"
              defaultValue={this.props.desiredSkillsOther}
              ref="desiredSkillsOther"
              rows="3"
            />
            <Body>{User.desiredSkillOther}</Body>
          </Section>

          <Section>
            <Header>I want to help other women because</Header>
            <textarea
              className="form-control"
              defaultValue={this.props.helpReason}
              ref="helpReason"
              rows="3"
            />
          </Section>

          <Section>
            <Header>Reviews</Header>
            <Body>You don’t have any reviews yet</Body>
          </Section>

          <div className="text-center">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={this.handleClick}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  }
}

EditableProfileCard.propTypes = propTypes;
