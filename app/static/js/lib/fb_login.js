function loggedIn() {
  const userBootstrap = document.getElementById('_bootstrap_user');
  if (userBootstrap === null) return false;

  const user = JSON.parse(userBootstrap.getAttribute('content'));
  return user.id !== 'undefined';
}

function statusChangeCallback(response) {
  if (response.status === 'connected' && !loggedIn()) {
    $.post('/fb_login', response.authResponse).done(function() {
      window.location = '/';
    });
  }
}

function checkLoginState() {
  FB.getLoginStatus(statusChangeCallback);
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '1675203376031640',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.4'
  });
};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  /*js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";*/
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
