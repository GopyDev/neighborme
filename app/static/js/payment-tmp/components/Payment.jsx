import React, { Component, PropTypes } from 'react';
import connectToStores from 'alt/utils/connectToStores';

import Modal from '../../shared/components/Modal.jsx';
import CurrentUser from '../../shared/models/User';
import SubNav from '../../navigation/components/SubNav.jsx';
import SettingsNav from '../../user_profile/components/SettingsNav.jsx'
import RowBackground from '../../shared/components/RowBackground.jsx';
import RequestsStore from '../stores/RequestsStore';
import RequestsActions from '../actions/RequestsActions';
import EditRequestForm from './EditRequestForm.jsx';

const propTypes = {
  requests: PropTypes.array,
  showModal: PropTypes.bool
};

export default class Payment extends Component {
  static getStores() {
    return [RequestsStore];
  }

  static getPropsFromStores() {
    return RequestsStore.getState();
  }
  
  handleClickClose() {
    RequestActions.showModal(false);
  }

  handleClickOpen() {
    RequestsActions.showModal(true);
  }

  render() {
    return (
      <div>
        <SubNav activeIndex={3} />
        <SettingsNav />
        <RowBackground>
        <div className="text-center space-top-4 space-4">
          <button
              className="btn btn-primary btn-lg add-payment-btn"
              onClick={this.handleClickOpen}>
            Add a payment method
          </button>
        </div>
        <Modal
            handleClickClose={this.handleClickClose}
            show={this.props.showModal}
            title="Create / Edit Request"
        >
          <EditRequestForm
              {...this.props}
          />
        </Modal>

        </RowBackground>
      </div>
    )
  }
}

Payment.propTypes = propTypes;
