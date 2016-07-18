import alt from '../alt';
import Api from '../../shared/utils/Api';

class UserProfileActions {
  constructor() {
    this.generateActions(
      'setEditable',
      'saveFields'
    );
  }

  updateProfile({userId, params}) {
    return (dispatch) => {
      Api.updateProfile(userId, params).then(response => {
        dispatch({response});
      }, xhrObj => {
        dispatch({xhr: xhrObj});
      });
    };
  }

  uploadPhoto({userId, formData}) {
    return (dispatch) => {
      Api.uploadPhoto(userId, formData).then(response => {
        dispatch({response});
      }, xhrObj => {
        dispatch({xhr: xhrObj});
      });
    };
  }
}

export default alt.createActions(UserProfileActions);
