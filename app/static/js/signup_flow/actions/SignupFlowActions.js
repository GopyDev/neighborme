import alt from '../alt';
import Api from '../../shared/utils/Api';

class SignupFlowActions {
  constructor() {
    this.generateActions(
      'changePanel',
      'saveField'
    );
  }

  completeSignup({userId}) {
    return (dispatch) => {
      Api.completeSignup(userId).then(response => {
        dispatch({response});
      });
    }
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

export default alt.createActions(SignupFlowActions);
