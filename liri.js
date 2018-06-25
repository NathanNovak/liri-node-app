require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
console.log(client);
console.log('----------------------');
console.log(spotify);

// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }
   
//   console.log(data); 
//   });
