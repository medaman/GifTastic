$(document).ready(function() {
  var cars = ["Ferrari", "Lamborghini", "Maserati", "Rolls-Royce", "Bentley", "McLaren", "Bugatti", "Lexus", "Aston Martin", "Jaguar", "Audi", "Porsche"];
  var apiKey = "7cff67bd904b43f9a6c5efdfeb9cc9b6";

  renderButtons();

  $(document).on("click", ".car", function() {
    var car = $(this).attr("data-name");
    var gifRating = $("#child-friendly").attr("gif-rating");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + car + "&limit=10&offset=0&rating=" + gifRating + "&lang=en";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      $("#cars-view").html("");
      if(response.data.length === 0) {
        $("#cars-view").html("<h3>No Results</h3>");
      }
      for(var i=0; i<response.data.length; i++) {
        var newDiv = $("<div>");
        var newImg = $("<img>");
        var still = response.data[i].images.fixed_height_still.url;
        var animate = response.data[i].images.fixed_height.url;
        newDiv.css("float", "left");
        newImg.addClass("gif");
        newImg.attr("data-still", still);
        newImg.attr("data-animate", animate);
        newImg.attr("data-state", "still");
        newImg.attr("src", still);
        newDiv.append(newImg);
        newDiv.append("<p>Rating: " + response.data[i].rating.toUpperCase() + "</p>");
        $("#cars-view").prepend(newDiv);  
      }
    });
  });

  function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < cars.length; i++) {
      var newButton = $("<button>");
      newButton.addClass("car btn btn-default");
      newButton.attr("data-name", cars[i]);
      newButton.text(cars[i]);
      $("#buttons-view").append(newButton);
    }
  }

  $("#add-car").on("click", function(event) {
    event.preventDefault();

    var car = $("#car-input").val().trim();

    if (car === "") {
      alert("Search field cannot be blank")
    } else if (!cars.includes(car)) {
      cars.push(car);
    } else {
      alert("This search term already exists")
    }
    
    $("#car-input").val("");
    renderButtons();
  });
  
  $(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if(state === "still") {
      $(this).attr("src",$(this).attr("data-animate"));
      $(this).attr("data-state","animate");
    } else {
      $(this).attr("src",$(this).attr("data-still"));
      $(this).attr("data-state","still"); 
    }
  });

  $("#reset").on("click", function() {
    //I have to recreate the cars array from scratch, because I cannot clone the array. I tried creating an originalArray and a cars array that is a copy of the originalArray, but when I change the new cars array, the originalArray is also changed simultaneously.
    cars = ["Ferrari", "Lamborghini", "Maserati", "Rolls-Royce", "Bentley", "McLaren", "Bugatti", "Lexus", "Aston Martin", "Jaguar", "Audi", "Porsche"];
    renderButtons();
    $("#cars-view").empty();
    $("#car-input").val("");
  });

  $("#child-friendly").on("click", function() {
    if($("#child-friendly").attr("gif-rating") === "G") {
      if(prompt("Enter Your Age")>=18) {
        $("#child-friendly").attr("gif-rating", "")
      }
      else {
        alert("You are too young! Please ask an adult to change this setting.")
        $("#child-friendly").prop("checked", true);
      }
    }
    else {
        $("#child-friendly").attr("gif-rating", "G");
        $("#child-friendly").prop("checked", true);
    }
  });

});
