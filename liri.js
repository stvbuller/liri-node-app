var keys = require("./keys.js");

var parameters = process.argv.slice(3);  //check that this is slicing in the proper position
var consumer_key;
var consumer_secret;
var access_token_key;
var access_token_secret;

var test;

switch(process.argv[2]) {       //check to see that this is the proper argv
  case "my-tweets":
    //code to be executed for my-tweets goes here
    test = "tweets works";
    consumer_key = keys.consumer_key;
    consumer_secret = keys.consumer_secret;
    access_token_key = keys.access_token_key;
    access_token_secret = keys.access_token_secret;
    break;
  case "spotify-this-song":
    //code for spotify-this-song
    //if no song is providied default to “what’s my age again” by blink 182
    test = "the song is " + parameters;
    break;
  case "movie-this":
    //code for movie-this goes 
    //if no movie is provided default to ‘Mr. Nobody’
    test = "the movie is " + parameters;
    break;
  case "do-what-it-says":
    //code for do-what-it-says
    test = "what it says is " + parameters;
    break;

  default:
    test = "a command was not entered"; 
    break;
}

console.log(test);
console.log(consumer_key);