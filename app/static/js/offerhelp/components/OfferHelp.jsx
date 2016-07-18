import React, { Component } from 'react';
import SubNav from '../../navigation/components/SubNav.jsx';
import Makeoffer from '../../shared/components/Makeoffer.jsx';

export default class OfferHelp extends Component {
  render() {
    return (
      <div>
        <SubNav activeIndex={0} />
        <div className="row row-gray">
          <div className="container">
            <div className="row row-houses-bg">
              <div className="text-center">
                <h2 className="text-gray visible-md-block visible-lg-block"></h2>
                <h4 className="text-gray visible-xs-block visible-sm-block"></h4>
              </div>
              
              <div className="request">
                <Makeoffer
                    className="visible-md-block visible-lg-block"
                    amount={this.props.requestinfo.amount}
                    date={this.props.requestinfo.date}
                    details={this.props.requestinfo.details}
                    firstName={this.props.requestinfo.firstName}
                    imgPath={this.props.requestinfo.imgPath}
                    location={this.props.requestinfo.city}
                    title={this.props.requestinfo.title}
                    userId={this.props.requestinfo.userId}
                    requestId={this.props.requestinfo.id}
                    myoffer={this.props.requestinfo.myoffer}
                    helpuser_id={this.props.requestinfo.helpuserId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
