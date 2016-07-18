var requestId;
var userId;

$(".request button").click(
    function() {
      requestId = $(this).data("requestId");
      userId = $(this).data("userId");
      var name = $(this).data("name");
      $(".modal textarea").text(
          "Hey " + name + ",\n\nI'd be interested in helping you with this."
              + " Let me know!\n\nBest,\n$$(user.firstName)");
      $(".modal").modal();
    });

$(".offer").click(function() {
  $.post("/sendMessage", {
    requestId: requestId,
    toId: userId,
    message: $(".modal textarea").val()
  }).done(function() {
    window.location = "/";
  }).fail(fail);
});