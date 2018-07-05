require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
var fs = require("fs");

// console.log(client);
// console.log("----------------------");
// console.log(spotify);

var action = process.argv[2];
var input = process.argv;
var inputs = "";

//Action calls from terminal
switch (action) {
  case "my-tweets":
    console.log("TWEETS");
    tweetResults();
    break;

  case "spotify-this-song":
    multipleArgs();
    console.log("Song", inputs);
    if (inputs != "") {
      spotifyResults(inputs);
    } else {
      spotifyResults("The Sign");
    }
    break;

  case "movie-this":
    multipleArgs();
    console.log("Movie", inputs);
    if (inputs != "") {
      omdbResults(inputs);
    } else {
      omdbResults("Mr. Nobody");
    }

    break;

  case "do-what-it-says":
    doWhatItSays();
    break;

  default:
    console.log(
      "{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}"
    );
    break;
}

//Used for multiple word searches
function multipleArgs() {
  for (var i = 3; i < input.length; i++) {
    if (i > 3 && input.length) {
      inputs = inputs + "+" + input[i];
    } else {
      inputs = inputs + input[i];
    }
  }
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(err, data) {
     console.log(data);

      var text = data.split(",");
      console.log(text[1]);
    
      spotifyResults(text[1]);
    

  });
  
}

function omdbResults(movie) {
  var queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie;
  console.log(queryUrl);
  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // console.log(JSON.parse(body));
      console.log("\nTitle of the movie: " + JSON.parse(body).Title);
      console.log("\nYear the movie came out: " + JSON.parse(body).Year);
      console.log(
        "\nIMDB Rating of the movie: " + JSON.parse(body).Ratings[0].Value
      );
      console.log(
        "\nRotton Tomatos rating of the movie: " +
          JSON.parse(body).Ratings[1].Value
      );
      console.log(
        "\nCountry where the movie was produced: " + JSON.parse(body).Country
      );
      console.log("\nLanguage of movie: " + JSON.parse(body).Language);
      console.log("\nPlot of the movie: " + JSON.parse(body).Plot);
      console.log("\nActors in the movie: " + JSON.parse(body).Actors);
    } else {
      console.log("Error....Try again.");
    }
    if (movie === "Mr. Nobody") {
      console.log(
        "\nIf you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/"
      );
      console.log("\nIt's on Netflix!");
    }
  });
}

function spotifyResults(song) {
  //Spotify API request
  console.log(song);
  // if (err) {
  //   return console.log("Error occurred: " + err);
  // }
  spotify.search({ type: "track", query: song, limit: 20 }, function(
    err, data, response){
  if (song != "The Sign") {
 
      for (var j = 0; j < data.tracks.items.length; j++) {
        var songResults = data.tracks.items[j];

        // console.log(data);
        console.log("----------------------------------------------------");
        console.log("Artist: " + songResults.artists[0].name);
        console.log("Song title: " + songResults.name);
        console.log("Preview: " + songResults.preview_url);
        console.log("Album name: " + songResults.album.name);
        console.log("----------------------------------------------------");
      }
   
  } else{
    spotify.search({ type: "track", query: "The Sign" }, function(
      err,
      data,
      response
    ) {
      var songResults = data.tracks.items[5];

      // console.log(songResults);
      console.log("----------------------------------------------------");
      console.log("Artist: " + songResults.artists[0].name);
      console.log("Song title: " + songResults.name);
      console.log("Preview: " + songResults.preview_url);
      console.log("Album name: " + songResults.album.name);
      console.log("----------------------------------------------------");
    });
  }
});
}

function tweetResults(inputs) {
  //Twitter API request
  var username = process.argv[3];
  var params = {
    screen_name: username,
    count: 20
  };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log("Done at " + tweets[i].created_at + ".");
        console.log("My tweet: " + tweets[i].text + ".");
        console.log("");
      }
    } else {
      console.log(error);
    }
  });
}
