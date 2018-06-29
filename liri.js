require("dotenv").config();

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var keys = require("./keys.js");

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
console.log(client);
console.log("----------------------");
console.log(spotify);


// spotify.search({ type: 'track', query: 'friends in low places' }, function(err, data, response) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }

//   console.log("Here's a preview: " + data.tracks.items[0].preview_url);
//   console.log("Here's the album name: " + data.tracks.items[0].album.name);
//   console.log("Here's the song name: " + data.tracks.items[0].name);
//   console.log("Popularity score " + data.tracks.items[0].popularity);
//   });

// spotify
//   .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
//   .then(function(data) {
//     console.log(data); 
//   })
//   .catch(function(err) {
//     console.error('Error occurred: ' + err); 
//   });

var params = {
  q: 'NathanNovak16'
};

client.get("search/tweets", params, function(error, tweets, response){
  if (!error){
    console.log(tweets);
  }
}); 
// get is the function to search the tweet which three paramaters 'search/tweets'
// ,params and a callback function.

// function searchedData(err, data, response) {
  
//   }
//   console.log("TWEETS", data);
// } // searchedData function is a callback function which
// // returns the data when we make a search
