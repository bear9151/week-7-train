//Declaring initial Topics array

var topics = [
	"Devil Wears Prada",
	"Mean Girls",
	"Pitch Perfect",
	"Bridesmaids",
	"Frozen",
	"Anchorman",
	"The Notebook",
	"Step Brothers",
	"Elf",
	]

//Function for actually displaying the resulted giphys

function displayGiphys() {
	var movie = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";

	//Empty Giphys-view div

	$("#giphys-view").empty();

	// Ajax call for specific button

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		var results = response.data;
		for (var i = 0; i < results.length; i++) {
            var rating = results[i].rating;
			var ratingColor;
				if (rating === "y") {
					ratingColor = "label label-success";
				} else if (rating === "g") {
					ratingColor = "label label-info";
				} else if (rating === "pg") {
					ratingColor = "label label-primary";
				} else if (rating === "pg-13") {
					ratingColor = "label label-warning";
				} else if (rating === "r") {
					ratingColor = "label label-danger";
				} else {
					ratingColor = "label label-default";
				};

			var gifDiv = $('<div class="inlineDiv">');
            
            var span = $("<span>")
            	.addClass(ratingColor)
            	.text(rating.toUpperCase());
            
            var image = $("<img>");
            image.attr("src", results[i].images.fixed_height_still.url)
            	.attr("alt", results[i].slug)
            	.attr("data-still", results[i].images.fixed_height_still.url)
            	.attr("data-animate", results[i].images.fixed_height.url)
            	.attr("data-state", "still")
            	.addClass("gifff");

        	gifDiv.append(span).append(image).appendTo("#giphys-view");
		};
	});
};


//Function for displaying the buttons on the page

function renderButtons() {
	$("#buttons-view").empty();
	$.each(topics, function(x, y) {
		var a = $("<button>");
		a.addClass("movie-button btn btn-primary");
		a.attr("data-name", y);
		a.text(y);
		$("#buttons-view").append(a);
	});
};

// Event listener for when add button is clicked, new button is created and all buttons are rendered over again

$("#add-button").on("click", function(event) {
	event.preventDefault();
	var newButton = $("#button-input").val().trim();
	topics.push(newButton);
	renderButtons();
})

// Setting on event click function for any .gifff class to run animate state on/off function

$(document).on("click", ".gifff", function() {

var state = $(this).attr("data-state");

      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value

	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

// Adding click event listeners to all elements with a class of "movie"

$(document).on("click", ".movie-button", displayGiphys);

// Calling the renderButtons function to display the initial buttons from the array

renderButtons();