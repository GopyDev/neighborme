var redirectLocation = "/";
var loginPath = "/login";

function statusChangeCallback(response) {
  console.log(response);
  var status = response.status;

  if (status == "connected") {
    $.post(loginPath, response.authResponse).done(function() {
      location = redirectLocation;
    });
  }
}

function checkLoginState() {
  FB.getLoginStatus(statusChangeCallback);
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '433143790222883',
    xfbml      : true,
    version    : 'v2.4'
  });
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   /*js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";*/
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
