// Listener event for the scrape button
$(document).on("click", ".scrape", function() {
  $.get( "/scrape", function (req, res) {
    console.log(res);
  }).then(function(data) {
    window.location.href = "/";
  });
});


// Listener event for the home link
$(document).on("click", ".home", function() {
  $.get( "/", function (req, res) {
    console.log(res);
  }).then(function(data) {
    window.location.href = "/";
  });
});


// Listener event for the saved articles link
$(document).on("click", ".saved", function() {
  $.get( "/saved", function (req, res) {
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
  $.ajax({ 
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


// // Event listener to add a note
// $(document).on("click", ".addNote", function(a) {
//   // Empty the notes from the note section
//   //$("#notes").empty();
//   // Save the id from the p tag
//   var thisId = $(this).attr("data-id");
//   $("#article-id").text(thisId);
//   $("#saveNote").attr("data", thisId);
//   // Now make an ajax call for the Article
//   $.ajax({
//     method: "GET",
//     url: "/getNotes/" + thisId
//   })
//     // With that done, add the note information to the page
//     .then(function(data) {
//       console.log(data);
//       // The title of the article
//       // $("#notes").append("<h2>" + data.title + "</h2>");
//       // // An input to enter a new title
//       // $("#notes").append("<input id='titleinput' name='title' >");
//       // // A textarea to add a new note body
//       // $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
//       // // A button to submit a new note, with the id of the article saved to it
//       // $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

//       // // If there's a note in the article
//       // if (data.note) {
//       //   // Place the title of the note in the title input
//       //   $("#titleinput").val(data.note.title);
//       //   // Place the body of the note in the body textarea
//       //   $("#bodyinput").val(data.note.body);
//       //}
//       $('.listArticles').empty();
//             if (data[0].note.length > 0){
//                 data[0].note.forEach(v => {
//                     $('.listArticles').append($(`<li class='list-group-item'>${v.text}<button type='button' class='btn btn-danger btn-sm float-right btn-deletenote' data='${v._id}'>X</button></li>`));
//                 })
//             }
//             else {
//                 $('.listArticles').append($(`<li class='list-group-item'>No notes for this article yet</li>`));
//                 console.log("Second ran!")
//             }
//     })
//     $('#noteModal').modal('toggle');
// });


// Event listener for the savenote button - to save a note
$(document).on("click", "#saveNote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/createNote/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
  $('#noteModal').modal('hide');
});



// Event listener to unsave a saved article
$(document).on("click", ".deleteFromSaved", function(){
  $(this).parent().remove();
  var articleId = $(this).attr("data-id");
  $.ajax({
      url: '/deletesaved/' + articleId,
      type: "POST"
  }).done(function(data) {
      $(".article").filter("[data-id='" + articleId + "']").remove();
  });
})


$(document).on('click', '.addNote', function (e){
    $("#notes").empty();
    var thisId = $(this).attr("data-id");

    $.ajax({
      method: "GET",
      url: "/getNotes/" + thisId
    }).then(function(data){
        console.log(data);
          $("#notes").append("<h2>" + data.title + "</h2>");
          $("#notes").append("<h3 id='notestitle'></h3>");
          $("#notes").append("<p id='notesbody'></p>");
          $("#notes").append("<div class='form-group'><label for='title'>Title: </label><input id='titleinput' class='form-control' name='title'></div>");
          $("#notes").append("<div class='form-group'><label for='body'>Note: </label><input id='bodyinput' class='form-control' name='body'></div>");
          $("#notes").append("<button class='btn btn-default' data-id='" + data._id + "' id='savenote'>Save Note</button>");

          if (data.note) {
            $("#notestitle").text(data.note.title);
            $("#notesbody").text(data.note.body);
          }
      });
      //$('#noteModal').modal();
  });


// When you click the delete button
$(document).on("click", ".deletebtn", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "DELETE",
    url: "/articles/" + thisId

  })
    // With that done
    .then(function (data) {
      location.reload();

      
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});