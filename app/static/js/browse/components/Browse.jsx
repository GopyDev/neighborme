import React, { Component } from 'react';
import SubNav from '../../navigation/components/SubNav.jsx';
import Request from '../../shared/components/Request.jsx';

export default class Browse extends Component {
  render() {
    return (
      <div>
        <SubNav activeIndex={0} />
        <div className="row row-gray">
          <div className="container">
            <div className="row row-houses-bg">
              <div className="text-center">
                <h2 className="text-gray visible-md-block visible-lg-block">Browse your neighbors’ latest requests</h2>
                <h4 className="text-gray visible-xs-block visible-sm-block">Browse your neighbors’ latest requests</h4>
              </div>
              {this.props.requests.map((request, i) => {
                return (
                  <div className="request">
                    <Request
                        key={`request_${i}`}
                        className="visible-md-block visible-lg-block"
                        amount={request.amount}
                        date={request.date}
                        details={request.details}
                        firstName={request.firstName}
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
          </div>
        </div>
      </div>
    )
  }
}
