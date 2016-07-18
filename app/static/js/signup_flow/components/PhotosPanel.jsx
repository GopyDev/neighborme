import React, { Component, PropTypes } from 'react';
import SignupFlowActions from '../actions/SignupFlowActions';
import CurrentUser from '../../shared/models/User';

export default class PhotosPanel extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    this.refs.fileInput.click();
  }

  handleChange() {
    const file = this.refs.fileInput.files[0];
    const preview = this.refs.image;
    const reader = new FileReader();

    reader.onloadend = () => {
      const formData = new FormData();
      formData.append('picture', file, file.name);
      SignupFlowActions.uploadPhoto({userId: CurrentUser.id, formData: formData});
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
      <div>
        <div className="text-center">
          <h3>Add photo</h3>
          <div className="photos-text">
            <small>NeighborMe is based on trust &amp; relationships. Your photo will help your neighbors get to you know you - please upload a photo that clearly shows your face.</small>
          </div>
          <div className="photo-container">
            <div className="photo-container--img">
              <img src="" ref="image" height="240" width="240" />
            </div>
            <button
              type="button"
              className="btn btn-pink btn-lg btn-block"
              onClick={this.handleClick}
            >
              Upload Photo
            </button>
          </div>
          <input
            type="file"
            ref="fileInput"
            onChange={this.handleChange}
            style={{visibility: 'hidden', width: '1px'}}
          />
        </div>
      </div>
    )
  }
}
