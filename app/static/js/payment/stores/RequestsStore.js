import moment from 'moment';
import RequestsActions from '../actions/RequestsActions';
import alt from '../alt';
import User from '../../shared/models/User';
import BootstrapData from '../../shared/BootstrapData';

function createRequest(fields) {
  return {
    amount: fields.amount,
    city: fields.city,
    date: fields.date,
    details: fields.details,
    firstName: User.firstName,
    imgPath: User.profilePictureUrl,
    title: fields.title
  };
}

class RequestsStore {
  constructor() {
    this.setInitialState();
    this.bindActions(RequestsActions);
  }

  setInitialState() {
    this.date = moment();
    this.showModal = false;
    this.requests = BootstrapData.getJSON('requests');
  }

  onAddRequest({response}) {
    this.requests.push(createRequest(response));
  }

  onSaveField({key, value}) {
    this[key] = value;
  }

  onShowModal(showModal) {
    this.showModal = showModal;
  }
}

export default alt.createStore(RequestsStore, 'RequestsStore');
