import React, { Component } from 'react';
import SubNav from '../../navigation/components/SubNav.jsx';
import Chatroom from '../../shared/components/Chatroom.jsx';

export default class ChatRoom extends Component {
  render() {
    return (
      <div>
        <SubNav activeIndex={1} />
        <div className="row row-gray">
          <div className="container">
            <div className="row row-houses-bg">
              <div className="text-center" id="helpuserinfo" name="helpuserinfo">
                <h2 className="text-gray visible-md-block visible-lg-block">Browse your neighbors’ latest requests</h2>
                <h4 className="text-gray visible-xs-block visible-sm-block">Browse your neighbors’ latest requests</h4>
              </div>
              {this.props.offerlists.map((offer, i) => {
                return (
                  <div className="request">
                    <Chatroom
                        key={`offer_${i}`}
                        className="visible-md-block visible-lg-block"
                        amount={this.props.requestinfo.amount}
                        date={this.props.requestinfo.date}
                        details={this.props.requestinfo.details}
                        firstName={this.props.requestinfo.firstName}
                        imgPath={this.props.requestinfo.imgPath}
                        location={this.props.requestinfo.city}
                        title={this.props.requestinfo.title}
                        requestId={offer.requestId}
                        myoffer={offer.myoffer}
                        helpuser_Id={offer.id}
                        offer_status={offer.offerstatus}
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
