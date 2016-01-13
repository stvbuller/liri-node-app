var twitterKeys = require("./keys.js");

var parameters = process.argv.slice(3);  //check that this is slicing in the proper position

switch(process.argv[2]) {       //check to see which argv index this should be
  case "my-tweets":
    //code to be executed for my-tweets goes here
    break;
  case "spotify-this-song":
    //code for spotify-this-song
    //if no song is providied default to “what’s my age again” by blink 182
  case "movie-this":
    //code for movie-this goes 
    //if no movie is provided default to ‘Mr. Nobody’
    break;
  case "do-what-it-says"
    //code for do-what-it says
    break;

  default:
    console.log("a command was not entered")  
}