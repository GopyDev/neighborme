import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

const propTypes = {
  amount: PropTypes.number,
  date: PropTypes.string,
  details: PropTypes.string,
  firstName: PropTypes.string,
  imgPath: PropTypes.string,
  title: PropTypes.string,
};

export default class Request extends Component {
  constructor(props) {
    super(props);
    this.sendEmail = this.sendEmail.bind(this);
  }

  sendEmail() {
    window.location.href = `mailto:lisamar@neighborme.co?subject=${this.props.title}`;
  }

  render() {
    var offerHelpContainer;
    if (!this.props.hideOfferHelp) {
      offerHelpContainer = (
        <div className="text-center button-container">
          <a href={`/dashboard/offerhelp/${this.props.requestId}`} className="btn btn-primary btn-lg btn-block">
            Offer Help
          </a>
        </div>
      );
    }

    return (
      <div className={cx(['panel', 'panel-default', this.props.className])}>
        <div className="panel-body panel-body-browse">
          <div className="row">
            <div className="col-xs-2 text-center">
              <a href={`/users/${this.props.userId}`}>
                <img
                  className="browse-user-image"
                  src={this.props.imgPath}
                  height={110}
                  width={110}
                />
              </a>
              <a href={`/users/${this.props.userId}`}>
                <h4>{this.props.firstName}</h4>
              </a>
            </div>
            <div className="col-xs-8">
              <h3>{this.props.title}</h3>
              <p>{this.props.details}</p>
              <div className="browse-location">{this.props.location}</div>
            </div>
            <div className="col-xs-2">
              <div>
                <span className="pull-left text-success">${this.props.amount}</span>
                <span className="pull-right">{this.props.date}</span>
              </div>
              {offerHelpContainer}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Request.propTypes = propTypes;