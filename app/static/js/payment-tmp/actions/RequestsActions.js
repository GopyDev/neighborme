import alt from '../alt';
import Api from '../../shared/utils/Api';

class RequestsActions {
  constructor() {
    this.generateActions(
      'saveField',
      'showModal'
    );
  }

  addRequest({params}) {
    return (dispatch) => {
      Api.addRequest(params).then(response => {
        dispatch({response});
      }, xhrObj => {
        dispatch({xhr: xhrObj});
      });
    };
  }

  addOffer({requestId, params}) {
    return (dispatch) => {
      Api.AddOffer(requestId, params).then(response => {
        dispatch({response});
      }, xhrObj => {
        dispatch({xhr: xhrObj});
      });
    };
  }
}

export default alt.createActions(RequestsActions);
