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
      zipcode: this.props.zipcode
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
            <label>Title</label>
            <input
              className="form-control"
              name="title"
              onChange={this.saveField}
              type="text"
              value={this.props.title}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-12">
            <label>My Request Details</label>
            <textarea
              className="form-control"
              name="details"
              onChange={this.saveField}
              rows="5"
              value={this.props.details}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-6">
            <label>I’m willing to pay ($)</label>
            <input
              className="form-control"
              name="amount"
              onChange={this.saveField}
              type="text"
              value={this.props.amount}
            />
          </div>

          <div className="col-md-6">
            <label>Date</label>
            <DatePicker
              className="form-control"
              dateFormat="MM/DD/YYYY"
              onChange={this.saveDate}
              selected={this.props.date}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-8">
            <label>Location</label>
            <input
              className="form-control"
              name="city"
              onChange={this.saveField}
              placeholder="City"
              type="text"
              value={this.props.city}
            />
          </div>

          <div className="col-md-4">
            <label>&nbsp;</label>
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
            <input
              className="form-control"
              name="street"
              onChange={this.saveField}
              placeholder="Cross street (optional)"
              type="text"
              value={this.props.street}
            />
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
