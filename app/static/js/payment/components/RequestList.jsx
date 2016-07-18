import React, { Component, PropTypes } from 'react';
import RequestSmall from '../../shared/components/RequestSmall.jsx';

const propTypes = {
  requests: PropTypes.array
};

export default class RequestList extends Component {
  render() {
    return (
      <div>
        <div className="text-center">
          <h2 className="text-gray visible-md-block visible-lg-block">Manage your requests for help</h2>
          <h4 className="text-gray visible-xs-block visible-sm-block">Manage your requests for help</h4>
        </div>
        {this.props.requests.map((request, i) => {
          return (
            <div className="request">
              <RequestSmall
                  key={`request_${i}`}
                  className="visible-md-block visible-lg-block"
                  amount={request.amount}
                  date={request.date}
                  details={request.details}
                  firstName={request.firstName}
                  hideOfferHelp
                  imgPath={request.imgPath}
                  location={request.city}
                  title={request.title}
                  userId={request.userId}
                  requestId={request.id}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

RequestList.propTypes = propTypes;
