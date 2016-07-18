import React, { Component } from 'react';
import SubNav from '../../navigation/components/SubNav.jsx';
import MyOffer from '../../shared/components/MyOffer.jsx';

export default class Offers extends Component {
  render() {
    return (
      <div>
        <SubNav activeIndex={2} />
        <div className="row row-gray">
          <div className="container">
            <div className="row row-houses-bg">
              <div className="text-center">
                <h2 className="text-gray visible-md-block visible-lg-block">Manage your offers to help a neighbor</h2>
                <h4 className="text-gray visible-xs-block visible-sm-block">Manage your offers to help a neighbor</h4>
              </div>
                <div className="request">
                  <MyOffer
                      className="visible-md-block visible-lg-block"
                      amount={this.props.request.amount}
                      date={this.props.request.date}
                      details={this.props.request.details}
                      firstName={this.props.request.firstName}
                      imgPath={this.props.request.imgPath}
                      location={this.props.request.city}
                      title={this.props.request.title}
                      userId={this.props.request.userId}
                      requestId={this.props.request.request_id}
                      offerstatus={this.props.request.offerstatus}
                      myoffer={this.props.request.myoffer}
                      lmessagetime={this.props.request.lmessagetime}
                  />
                </div>
              <div className="text-center space-top-8 space-8">
                <div className="text-center button-container">
                  <a href="/dashboard/browse" className="btn btn-primary btn-lg">
                    Lend a Hand
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
