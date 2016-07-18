import alt from '../../shared/alt';
import SignupLoginActions from '../actions/SignupLoginActions';

class SignupLoginStore {
  constructor() {
    this.setInitialState();
    this.bindActions(SignupLoginActions);
  }

  setInitialState() {
    this.pane = SignupLoginStore.SIGNUP_PANE;
  }

  onChangePane({pane}) {
    this.setState({pane});
  }
}

SignupLoginStore.SIGNUP_PANE = 'signup';
SignupLoginStore.LOGIN_PANE = 'login';

export default alt.createStore(SignupLoginStore, 'SignupLoginStore');
