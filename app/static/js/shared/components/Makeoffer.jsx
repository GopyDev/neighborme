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
  onConfirmMessage(){
    var controlButton = document.getElementById('offerhelpbtn');
    if(controlButton.innerHTML == "Send") {
      var myoffer=document.getElementById('doneoffer').innerHTML;
      var currentdate = new Date();
      var datetime =  currentdate.getFullYear() + "-"
                      + (currentdate.getMonth()+1)  + "-" 
                      + currentdate.getDate() + " "
                      + currentdate.getHours() + ":"  
                      + currentdate.getMinutes() + ":" 
                      + currentdate.getSeconds();
      var str=window.location.href;
      var length=str.split("/").length;
      var requestId=str.split("/")[length-1];

      var offerData={
        offer: myoffer,
        helpuser_id: currentUser.id,
        offer_status: "Pending",
        lmessage_at: datetime,
        request_id: requestId
      };

      RequestsActions.addOffer({requestId: requestId, params: offerData});
      document.getElementById("myform").action="/dashboard/offers";
      document.getElementById("myform").submit();
    }
    else {
      var chatmessage=$('#editoffer').val();
      document.getElementById('doneoffer').innerHTML=chatmessage;
      document.getElementById('offerdiv').style.display='block';
      document.getElementById('editdiv').style.display='none';
      controlButton.innerHTML="Send";
    }
  }

  render() {
    var offerHelpContainer;
    if (!this.props.hideOfferHelp && this.props.helpuser_id == 1) {
      offerHelpContainer = (
        <div className="text-center button-container">
          <button
            type="button"
            className="btn btn-lg btn-blk"
            onClick={this.onConfirmMessage}
            id="offerhelpbtn"
            name="offerhelpbtn"
          >
          Offer Help
          </button>
        </div>
      );
    }
    return (
        <form name="myform" id="myform">
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
                  <div className="text-center"><span>Posted {this.props.date}</span></div>
                  <div className="div-padding">
                    <h3 className="pull-left text-success">{this.props.title}</h3>  
                    <h3 className="pull-right text-success">${this.props.amount}</h3>
                  </div>
                  <div><p>{this.props.details}</p></div>
                  <div className="browse-location">{this.props.location}</div>
                </div>
              </div>

              <hr width="100%" size="3" noshade></hr>

                <div className="row hiddendiv" id="offerdiv">
                  <div className="col-xs-2">
                  </div>
                  <div className="col-xs-8">
                    <label
                      className="form-control offer-detail"
                      id="doneoffer"
                      name="doneoffer"
                    >
                    </label>
                  </div>
               
                  <div className="col-xs-2">
                  <a href={`/users/${currentUser.id}`}>
                    <img
                      className="browse-user-image"
                      src={this.props.imgPath}
                      height={55}
                      width={55}
                    />
                  </a>
                  </div>
                </div>

                <div className="form-group row" id="editdiv">
                  <div className="col-md-12">
                    <label className="lbl-req">MESSAGE TO {this.props.firstName}</label>
                    <textarea
                      className="form-control textarea-req-detail"
                      id="editoffer"
                      name="editoffer"
                      placeholder="Write a offer"
                      rows="5"
                    >
                    </textarea>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-12">
                    <div>{offerHelpContainer}</div>
                  </div>
                </div>
            </div>
          </div>
        </form>
    )
  }
}

Makeoffer.propTypes = propTypes;