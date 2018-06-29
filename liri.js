require("dotenv").config();

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var keys = require("./keys.js");

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
console.log(client);
console.log("----------------------");
console.log(spotify);


// spotify.search({ type: 'artist', query: 'Garth Brooks' }, function(err, data, response) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }

//   console.log(data);
//   });

// spotify
//   .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
//   .then(function(data) {
//     console.log(data); 
//   })
//   .catch(function(err) {
//     console.error('Error occurred: ' + err); 
//   });

// var params = {
//   q: "#my-tweets",
//   count: 2,
//   result_type: "recent",
//   lang: "en"
// };

// client.get("search/tweets", params, searchedData); // get is the
// // function to search the tweet which three paramaters 'search/tweets'
// // ,params and a callback function.

// function searchedData(err, data, response) {
//   console.log("TWEETS", data);
// } // searchedData function is a callback function which
// // returns the data when we make a search
