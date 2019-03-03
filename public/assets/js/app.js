// Listener event for the scrape button
$(document).on("click", ".scrape", function() {
  $.get( "/scrape", function (req, res) { // Load the scrape page
    console.log(res);
  }).then(function(data) {
    window.location.href = "/";
  });
});


// Listener event for the home link
$(document).on("click", ".home", function() {
  $.get( "/", function (req, res) { // Load the home page
    console.log(res);
  }).then(function(data) {
    window.location.href = "/";
  });
});


// Listener event for the saved articles link
$(document).on("click", ".saved", function() {
  $.get( "/saved", function (req, res) { // Load the saved articles page
    console.log(res);
  }).then(function(data) {
    window.location.href = "/saved";
  });
});


// Listener event for the save article button
$(document).on("click", ".save", function(a) {
  //The article is removed from the page
  $(this).parent().remove();
  var articleId = $(this).attr("data-id");// The id is saved in a variable
  $.ajax({ // Post request to change the value of the save variable
    url: '/save/' + articleId,
    type: "POST"
  }).done(function(data) {
    $(".article").filter("[data-id='" + articleId + "']").remove();// Remove the article from the homepage
  });
});


// Event listener to unsave a saved article
$(document).on("click", ".deleteFromSaved", function(){
  $(this).parent().remove();
  var articleId = $(this).attr("data-id");
  $.ajax({ // Post request to change the value of the save variable
      url: '/deletesaved/' + articleId,
      type: "POST"
  }).done(function(data) {
      $(".article").filter("[data-id='" + articleId + "']").remove();// Remove the article from the saved page
  });
})


// When you click the delete button
$(document).on("click", ".deletebtn", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "DELETE",
    url: "/delete/" + thisId
  })
    // With that done
    .then(function (data) {
      location.reload();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#note-input").val("");
});


// Event listenerer for opening the note modal
$(document).on("click", ".addNote", function () {
  // $("#notes").empty();
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
  .then(function(data){
      console.log(data)
      if (data.note) {
        $("#notestitle").val(data.note.title);
        $("#notesbody").val(data.note.body);
      }
  });
  //$('#noteModal').modal();
});

// Event listener for the save note button
$(document).on("click", "#saveNote", function () {
  var thisId = $(this).attr("data-id"); // Get the id of the article
  // Post request wih the value entered by the user
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#title-input").val(),
      body: $("#note-input").val()
    }
  }).then(function(data) {
      console.log(data);
      //$("#notes").empty();
    });

  // Remove the values previously entered
  $("#title-input").val("");
  $("#note-input").val("");
  $('#noteModal').modal('hide');
});