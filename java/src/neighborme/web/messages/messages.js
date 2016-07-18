var requestId;
var userId;

$(".thread").click(function() {
  $(this).siblings().removeClass("selected");
  $(this).addClass("selected");
  $(this).find(".unread").hide();

  loadMessages($(this).data("requestid"), $(this).data("userid"));
});

function loadMessages(request, user) {
  requestId = request;
  userId = user;

  $.get("/thread", {
    requestId : requestId,
    userId : userId
  }).done(function(data) {
    var messages = $(".msg-container .messages").empty();
    for (var i = 0; i < data.length; i++) {
      var div = $("<div class='message'>");
      var from = $("<div class='from'>").text(data[i].from);
      var msg = $("<span class='body'>").text(data[i].text);
      div.append(from).append(msg);
      messages.append(div);
    }
    $(".msg-container").show();
  }).fail(fail);
}

$("button.send").click(function() {
  var msg = $("textarea.reply").val();
  if (!msg) {
    alert("You must enter a message!");
    return;
  }
  $.post("/sendMessage", {
    requestId : requestId,
    toId : userId,
    message : msg
  }).done(function() {
    $("textarea.reply").val("");
    loadMessages(requestId, userId);
  }).fail(fail);
});