import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { camelCase } from '../../shared/utils/StringUtils';
import User from '../../shared/models/User';

import RequestsActions from '../actions/RequestsActions';

export default class EditRequestForm extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  get formFields() {
    return {
      amount: this.props.amount,
      city: this.props.city,
      date: this.props.date.format('YYYY-MM-DD'),
      details: this.props.details,
      street: this.props.street,
      title: this.props.title,
      userId: User.id,
      zipcode: this.props.zipcode,
      creditcard: this.props.creditcard,
      cardnumber: this.props.cardnumber,
      expiration: this.props.expiration,
      cvc: this.props.cvc
    };
  }

  handleClick(event) {
    event.preventDefault();
    RequestsActions.addRequest({params: this.formFields});
    RequestsActions.showModal(false);
  }

  saveDate(date) {
    const key = "date";
    const value = date;
    RequestsActions.saveField({key, value});
  }

  saveField(event) {
    const key = camelCase(event.target.name);
    const value = event.target.value;
    RequestsActions.saveField({key, value});
  }

  render() {
    return (
      <form>
        <div className="form-group row">
          <div className="col-md-12">
            <select className="form-control">
              <option>Credit Card</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-12">
            <input
                className="form-control"
                name="title"
                onChange={this.saveField}
                type="text"
                placeholder="Card Number"
                value={this.props.cardnumber}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-8">
            <input
                className="form-control"
                name="title"
                onChange={this.saveField}
                type="text"
                placeholder="MM/YY"
                value={this.props.expiration}
            />
          </div>
          <div className="col-md-4">
            <input
                className="form-control"
                name="title"
                onChange={this.saveField}
                type="text"
                placeholder="CVC"
                value={this.props.cvc}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-4">
            <input
              className="form-control"
              name="zipcode"
              onChange={this.saveField}
              placeholder="Zipcode"
              type="text"
              value={this.props.zipcode}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-12">
            <div className="checkbox">
              <label><input type="checkbox">Remember my payment information</input></label>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <button
            className="btn btn-join"
            onClick={this.handleClick}
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    );
  }
}
