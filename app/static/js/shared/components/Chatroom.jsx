import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import { capitalize } from '../../shared/utils/StringUtils';
import currentUser from '../../shared/models/User';
import RequestsActions from '../../requests/actions/RequestsActions';

const propTypes = {
  amount: PropTypes.number,
  date: PropTypes.string,
  details: PropTypes.string,
  firstName: PropTypes.string,
  imgPath: PropTypes.string,
  title: PropTypes.string,
};

export default class Makeoffer extends Component {
  constructor(props) {
    super(props);
    this.sendEmail = this.sendEmail.bind(this);
  }

  sendEmail() {
    window.location.href = `mailto:lisamar@neighborme.co?subject=${this.props.title}`;
  }

  saveField(event) {
    /* const key = camelCase(event.target.name);
       const value = event.target.value;
       RequestsActions.saveField({key, value});
     */
  }
  render() {
    if(!this.props.myoffer){
      return(
        <div className={cx(['panel', 'panel-default', this.props.className])}>
        </div>
      )
    } 
    return (
      <div className={cx(['panel', 'panel-default', this.props.className])}>
        <div className="panel-body panel-body-browse">
          <div className="row">
            <div className="col-xs-6 text-center">
              <h3 className="pull-left text-success">{this.props.title}</h3>
            </div>
            <div className="col-xs-2">
              <h3 className="pull-right text-success">${this.props.amount}</h3>
            </div>
            <div className="col-xs-2">
              <h3 className="pull-right text-success">{this.props.date}</h3>
            </div>
            <div className="col-xs-2">
              <h3 className="pull-right p1" id="offer_status" name="offer_status">{this.props.offer_status}</h3>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <p>{this.props.details}</p>
            </div>
          </div>

          <hr width="100%" size="3" noshade></hr>
          {/* <div id="messagediv" name="messagediv" className="hiddendiv"> */}
          <div id="messagediv" name="messagediv">
          </div>
          <input type="hidden" id="myname" value={currentUser.firstName}/>
          <input type="hidden" id="mypictureUrl" name="mypictureUrl" value={currentUser.profilePictureUrl}/>
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

          <div className="chat-buttons">
            <button className="btn btn-lg btn-pink"
                    id="replybtn" name="replybtn">Reply</button>
            <button className="btn btn-lg btn-green"
                    id="acceptbtn" name="acceptbtn">Accept</button>
            <button className="btn btn-lg btn-blk"
                    id="declinebtn" name="declinebtn">Decline</button>
          </div>
          
        </div>
      </div>
    )
  }
}

Makeoffer.propTypes = propTypes;
