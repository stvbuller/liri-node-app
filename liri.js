var keys = require("./keys.js");
var request = require('request');     //requires the npm request package

var parameters = process.argv.slice(3);  //check that this is slicing in the proper position
var twit_consumer_key;
var twit_consumer_secret;
var twit_access_token_key;
var twit_access_token_secret;
var titleString = "";
var movieTitle;
var movieUrl;
var songTitle;
var songUrl;


var result;

//creates a string from the command line parameters
for (i = 0; i < parameters.length; i++){
  titleString += parameters[i] + " ";
}

switch(process.argv[2]) {       //check that this is the proper argv
  case "my-tweets":
    //code to be executed for my-tweets goes here
    result = "tweets works";
    twit_consumer_key = keys.twitterKeys.consumer_key;
    twit_consumer_secret = keys.twitterKeys.consumer_secret;
    twit_access_token_key = keys.twitterKeys.access_token_key;
    twit_access_token_secret = keys.twitterKeys.access_token_secret;
    break;
  case "spotify-this-song":
    if (parameters == "") {
        //if no song is providied default to “what’s my age again” by blink 182
        songTitle = "what's my age again";
    } else {
      //result = "the song is " + titleString;
      songTitle = titleString;
    }
    songUrl = "http://ws.spotify.com/search/1/track.json?q=" + songTitle;
    request(songUrl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var songInfo = JSON.parse(body);
        console.log(JSON.parse(body)["info"]);
        for (i = 0; i < 5; i++) {
          console.log("The album name is: " + songInfo.tracks[i].album.name);
          console.log("The artist is: " + songInfo.tracks[i].artists[0].name);
          //console.log("The artist is: " + songInfo.tracks[0].artists[1].name);
          console.log("The name of the track is: " + songInfo.tracks[i].name);
          console.log("The spotify preview is: " + songInfo.tracks[i].href);
        }
      }
    });
    break;
  case "movie-this":
    if (parameters == "") {
        //if no movie is provided default to ‘Mr. Nobody’
        movieTitle = "Mr. Nobody";
    }
    else {
        movieTitle = titleString;
    }
    movieUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&tomatoes=true&y=&plot=short&r=json"
    // request('http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&r=json', function (error, response, body) {
    //       if (!error && response.statusCode == 200) {
    //         console.log(JSON.parse(body)["imdbRating"])
    //       }
    //     });
    request(movieUrl, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            //console.log(body);
            console.log("The Title is: " + JSON.parse(body)["Title"])
            console.log("The Year is: " + JSON.parse(body)["Year"])
            console.log("The imdbRating is: " + JSON.parse(body)["imdbRating"])
            console.log("The Country is: " + JSON.parse(body)["Country"])
            console.log("The Language is: " + JSON.parse(body)["Language"])
            console.log("The Plot is: " + JSON.parse(body)["Plot"])
            console.log("The Actors are: " + JSON.parse(body)["Actors"])
            console.log("The Rotton Tomatoes Rating is: " + JSON.parse(body)["tomatoRating"])
            console.log("The Rotton Tomatoes url is: " + JSON.parse(body)["tomatoURL"])
          }
        });
    break;
  case "do-what-it-says":
    //result = "what it says is " + parameters;
    var fs = require('fs'); //reads and writes files using the builtin fs package

    fs.readFile("random.txt", "utf8", function(error, commandData) {
        //console.log(commandData);
        var commandArr = commandData.split(',');
        var command = commandArr[0];
        var commandParameter = commandArr[1];
        //console.log(commandArr);
        console.log(command);
        console.log(commandParameter);
    });    
    break;

  default:
    result = "a command was not entered"; 
    break;
}

console.log("The song title is " + songTitle);
//console.log(result);
//console.log(twit_access_token_key);
//console.log(titleString);
