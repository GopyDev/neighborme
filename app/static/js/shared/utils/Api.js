import $ from 'jquery';

const API_PREFIX = '/api/v1';

export default {
  completeSignup(userId) {
    return Promise.resolve(
      $.ajax(`${API_PREFIX}/users/${userId}`, {
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({signupCompleted: true}),
        method: 'PUT'
      })
    );
  },

  addRequest(params) {
    return Promise.resolve(
      $.ajax(`${API_PREFIX}/requests`, {
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(params),
        method: 'POST'
      })
    );
  },

  AddOffer(requestId, params){
    return Promise.resolve($.ajax(`${API_PREFIX}/requests/${requestId}`, {
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(params),
      method: 'POST'
    }));
  },

  updateProfile(userId, params) {
    return Promise.resolve($.ajax(`${API_PREFIX}/users/${userId}`, {
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(params),
      method: 'PUT'
    }));
  },

  uploadPhoto(userId, formData) {
    return Promise.resolve(
      $.ajax(`${API_PREFIX}/users/${userId}/photos`, {
        contentType: false,
        data: formData,
        method: 'POST',
        mimeType: 'multipart/form-data',
        processData: false
      })
    );
  }
}
