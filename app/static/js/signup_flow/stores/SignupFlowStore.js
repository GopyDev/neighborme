import alt from '../alt';
import SignupFlowActions from '../actions/SignupFlowActions';
import PanelState from '../constants/PanelState';
import Skill from '../models/Skill';
import CurrentUser from '../../shared/models/User';
import BootstrapData from '../../shared/BootstrapData';

class SignupFlowStore {
  constructor() {
    this.setInitialState();
    this.bindActions(SignupFlowActions);
  }

  setInitialState() {
    this.firstName = CurrentUser.firstName;
    this.lastName = CurrentUser.lastName;
    this.zipcode = CurrentUser.zipcode;
    this.gender = CurrentUser.gender;
    this.phoneNumber = CurrentUser.phoneNumber;

    this.aboutMe = CurrentUser.aboutMe;

    this.panel = this.initialPanelState;
  }

  // TODO: Come up with a better way of storing the state. Use this as backup.
  get initialPanelState() {
    if (this.aboutMe !== null) {
      return PanelState.PHOTOS;
    } else if (this.firstName !== null &&
        this.lastName !== null &&
        this.zipcode !== null &&
        this.gender !== null &&
        this.phoneNumber !== null) {
      return PanelState.ABOUT_YOU;
    }
    return PanelState.BASICS;
  }

  onChangePanel({panel}) {
    this.panel = panel;
  }

  onSaveField({key, value}) {
    this[key] = value;
  }

  onUpdateProfile({response}) {
  }

  onCompleteSignup({response}) {
    if (response.redirect) {
      window.location.href = response.redirect;
    }
  }

  onUploadPhoto({response}) {
  }
}

export default alt.createStore(SignupFlowStore, 'SignupFlowStore');
