function fail(e) {
  var text = e.responseText;
  if (!text) {
    text = "There was an error.";
  }
  alert(text);
}

function reload() {
  location.reload();
}