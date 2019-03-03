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
    $(".article").filter("[data-id='" + articleId + "']").remove();
  });
});


// Grab the articles as a json
// $.getJSON("/articles", function(data) {
//   // For each one
//   for (var i = 0; i < data.length; i++) {
//     // Display the apropos information on the page
//     $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//   }
// });



// // Event listener for the savenote button - to save a note
$(document).on("click", ".saveNote", function() {
  console.log("in savenote on click")
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  var noteText = $(".note-input").val().trim();
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      note: noteText
      // Value taken from note textarea
      //body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log("data in saveNote" + data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $(".note-input").val("");
  $('#noteModal').modal('hide');
  window.location = "/saved";
});



// Event listener to unsave a saved article
$(document).on("click", ".deleteFromSaved", function(){
  $(this).parent().remove();
  var articleId = $(this).attr("data-id");
  $.ajax({ // Post request to change the value of the save variable
      url: '/deletesaved/' + articleId,
      type: "POST"
  }).done(function(data) {
      $(".article").filter("[data-id='" + articleId + "']").remove();
  });
})


// $(document).on("click", "#saveNote", function () {
//   var thisId = $(this).attr("data-id");
//   var noteText = $("#note-input").val().trim();
//   // if (!$("#noteText" + thisId).val()) {
//   //     alert("please enter a note to save")
//   // }else {
//     $.ajax({
//           method: "POST",
//           url: "/articles/" + thisId,
//           data: {
//             text: noteText
//           }
//         }).done(function(data) {
//             // Log the response
//             console.log(data);
//             // Empty the notes section
//             $("#note-input" + thisId).val("");
//             $("#noteModal").modal("hide");
//             window.location = "/saved"
//         });
//   // }
// });


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
  $(".note-input").val("");
});