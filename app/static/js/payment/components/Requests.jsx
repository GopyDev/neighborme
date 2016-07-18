import React, { Component, PropTypes } from 'react';
import connectToStores from 'alt/utils/connectToStores';

import Modal from '../../shared/components/Modal.jsx';
import CurrentUser from '../../shared/models/User';
import SubNav from '../../navigation/components/SubNav.jsx';
import RequestsStore from '../stores/RequestsStore';
import RequestsActions from '../actions/RequestsActions';

import EditRequestForm from './EditRequestForm.jsx';
import RequestList from './RequestList.jsx';

import SettingsNav from '../../user_profile/components/SettingsNav.jsx'

const propTypes = {
  requests: PropTypes.array,
  showModal: PropTypes.bool
};

export default class Requests extends Component {
  static getStores() {
    return [RequestsStore];
  }

  static getPropsFromStores() {
    return RequestsStore.getState();
  }

  handleClickClose() {
    RequestsActions.showModal(false);
  }

  handleClickOpen() {
    RequestsActions.showModal(true);
  }

  render() {
    var requestList;
    if (this.props.requests.length > 0) {
      requestList = <RequestList requests={this.props.requests} />;
    }

    return (
      <div>
        <SubNav activeIndex={3} />
        <SettingsNav activeIndex={2}/>
        <div className="row row-gray">
          <div className="container"> 
            <div className="row row-houses-bg">
              {requestList}
              <div className="text-center space-top-4 space-4">
                <button
                  className="btn btn-primary btn-lg add-payment-btn"
                  onClick={this.handleClickOpen}
                >
                  Add payment method
                </button>
              </div>
            </div>
          </div>
        </div>

        <Modal
          handleClickClose={this.handleClickClose}
          show={this.props.showModal}
          title="Add Payment Method"
        >
          <EditRequestForm
            {...this.props}
          />
        </Modal>
      </div>
    )
  }
}

Requests.propTypes = propTypes;

export default connectToStores(Requests);
