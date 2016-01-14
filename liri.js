var keys = require("./keys.js");
var request = require('request');     //requires the npm require package


var parameters = process.argv.slice(3);  //check that this is slicing in the proper position
var twit_consumer_key;
var twit_consumer_secret;
var twit_access_token_key;
var twit_access_token_secret;
var titleString = "";
var movieTitle;

var result;

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
        result = "what's my age again";
    } else {
      //code for spotify-this-song
      result = "the song is " + titleString;
    }
    break;
  case "movie-this":
    //code for movie-this 
    if (parameters == "") {
        //if no movie is provided default to ‘Mr. Nobody’
        movieTitle = "Mr. Nobody";
    }
    else {
        //result = "the movie is " + titleString;
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
            console.log(body);
            console.log(JSON.parse(body)["Title"])
            console.log(JSON.parse(body)["Year"])
            console.log(JSON.parse(body)["imdbRating"])
            console.log(JSON.parse(body)["Country"])
            console.log(JSON.parse(body)["Language"])
            console.log(JSON.parse(body)["Plot"])
            console.log(JSON.parse(body)["Actors"])
            console.log(JSON.parse(body)["tomatoRating"])
            console.log(JSON.parse(body)["tomatoURL"])
          }
        });
    break;
  case "do-what-it-says":
    //code for do-what-it-says
    result = "what it says is " + parameters;
    break;

  default:
    result = "a command was not entered"; 
    break;
}

console.log(result);
//console.log(twit_access_token_key);
// console.log(parameters);
// console.log(titleString);
//console.log(parameters[0]);
