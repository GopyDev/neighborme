var appId = '375BFF8E-7C72-4680-97E9-27ED4937AF4C';
var nickname = null;
var imageUrl = null;

function startSendBird(guestId, nickName) {
  sendbird.init({
    "app_id": appId,
    "guest_id": guestId,
    "user_name": nickName,
    "image_url": imageUrl,
    "access_token": 'b97c4d179d1c6591dfe4b216c0ccfb37ee3009ec',
    "successFunc": function(data) {
      sendbird.connect();
    },
    "errorFunc": function(status, error) {
      console.log(status, error);

      if (error == 'Request Domain is not authentication.') {
        alert(error);
      } else {
        alert('please check your access code');
      }
      window.location.href = '/';
    }
  });
  sendbird.events.onMessageDelivery = function(obj) {
    console.log(obj);
  };

  sendbird.setDebugMessage(false);
};

function init() {
  guestId = checkGuestId();
  nickname=$('#myname').val();
  imageUrl=$('#mypictureUrl').val();
  startSendBird(guestId, nickname);
}

$(document).ready(function() {
  init();
});