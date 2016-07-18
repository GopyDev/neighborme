$("form").submit(function(e) {
  e.preventDefault();

  $(".error").removeClass("error");

  var data = {
    title : $(".title").val(),
    description : $(".description").val(),
    amount : $(".amount").val(),
    address : {
      street : $(".street").val(),
      apartment : $(".apartment").val(),
      zipcode : $(".zip").val()
    }
  };

  if (!data.title) {
    $(".title").addClass("error");
  }

  if (data.description.length < 30) {
    $(".description").addClass("error");
    if (data.description.length > 0) {
      alert("Please enter a more detailed description.");
    }
  }

  if (data.amount == "" || data.amount < 0) {
    $(".amount").addClass("error");
  }

  if (!data.address.street) {
    $(".street").addClass("error");
  }
  if (!data.address.zipcode) {
    $(".zip").addClass("error");
  }

  if ($(".error").length > 0) {
    return;
  }

  $.post("/requestHelp", JSON.stringify(data)).done(function() {
    location = "/";
  }).fail(fail);
});