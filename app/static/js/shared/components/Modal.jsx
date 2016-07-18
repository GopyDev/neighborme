import React, { Component } from 'react';
import SubNav from '../../navigation/components/SubNav.jsx';
import { Modal } from 'react-bootstrap';

export default class NeighborMeModal extends Component {
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.handleClickClose}
        dialogClassName="modal-wide"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="text-center">
              {/* Create / Edit Request */}
              {this.props.title}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.children}
        </Modal.Body>
      </Modal>
    );
  }
}
