import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import currentUser from '../../shared/models/User';

const propTypes = {
  amount: PropTypes.number,
  date: PropTypes.string,
  details: PropTypes.string,
  firstName: PropTypes.string,
  imgPath: PropTypes.string,
  title: PropTypes.string,
};

export default class MyOffer extends Component {
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
          <a href="/dashboard/browse" className="btn btn-primary btn-lg">
            Lend a Hand
          </a>
        </div>
      );
    }
    if(!this.props.title){
      return(
          <div className={cx(['panel', 'panel-default', this.props.className])}>
          </div>
        )
    }
    else{
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
              <input type="hidden" id="myname" value={currentUser.firstName}/>
              <input type="hidden" id="clientname" value={this.props.firstName}/>
              <input type="hidden" id="mypictureUrl" name="mypictureUrl" value={currentUser.profilePictureUrl}/>
              <div className="col-xs-8">
                <h3>{this.props.title}</h3>
                <h3>Last message {this.props.lmessagetime}</h3>
                <p>{this.props.myoffer}</p>
              </div>
              <div className="col-xs-2">
                <div>
                  <h3 className="p1">{this.props.offerstatus}</h3>
                  <h3>{this.props.date}</h3>
                  <h3>${this.props.amount}</h3>
                </div>
              </div>
            </div>
            <hr width="100%" size="3" noshade></hr>
            <div id="messagediv" name="messagediv" className="hiddendiv">
            </div>

            <div className="chat-input">
              <textarea
                className="chat-input-text__field"
                name="chat_input_textarea"
                placeholder="Write a chat"
              >
              </textarea>
            </div>
            <div>
              <label className="chat-input-typing">
              </label>
            </div>

          </div>
        </div>
      )
    }
  }
}

MyOffer.propTypes = propTypes;
