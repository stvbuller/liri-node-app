var keys = require("./keys.js");
var request = require('request');     //requires the npm request package
var Twitter = require('twitter');     //requires the npm twitter package
var spotify = require('spotify');     //requires the npm spotify package
 
var parameters = process.argv.slice(3);  //check that this is slicing in the proper position
var titleString = "";
var movieTitle;
var movieUrl;
var songTitle;
var songUrl;

//creates a string from the command line parameters
for (i = 0; i < parameters.length; i++){
  titleString += parameters[i] + " ";
}

switch(process.argv[2]) {       //check that this is the proper argv
  case "my-tweets":
    var client = new Twitter({
      consumer_key: keys.twitterKeys.consumer_key,
      consumer_secret: keys.twitterKeys.consumer_secret,
      access_token_key: keys.twitterKeys.access_token_key,
      access_token_secret: keys.twitterKeys.access_token_secret
    });
    var params = {screen_name: 'stvbuller'};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
      if (!error) {
        //console.log(tweets);
        for (i = 0; i < 20; i++){
        console.log(tweets[i].text)
        }
      }
    });
    break;
  case "spotify-this-song":
    if (parameters == "") {
        //if no song is providied default to “what’s my age again” by blink 182
        songTitle = "what's my age again";
    } else {
      songTitle = titleString;
    }
    //this uses the npm spotify package to get info from spotify
    spotify.search({ type: 'track', query: songTitle }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
        //console.log(data);
        for (i = 0; i < 5; i++) {
          console.log("The artist is: " + data.tracks.items[i].artists[0].name);
          console.log("The track name is: " + data.tracks.items[i].name);
          console.log("The album name is: " + data.tracks.items[i].album.name);
          console.log("The Spotfiy preview is: " + data.tracks.items[i].external_urls.spotify);
        } 
    });
    //this uses the request npm package to get info from spotify
    // songUrl = "http://ws.spotify.com/search/1/track.json?q=" + songTitle;
    // request(songUrl, function (error, response, body) {
    //   if (!error && response.statusCode == 200) {
    //     var songInfo = JSON.parse(body);
    //     console.log(JSON.parse(body)["info"]);
    //     for (i = 0; i < 5; i++) {
    //       console.log("The album name is: " + songInfo.tracks[i].album.name);
    //       console.log("The artist is: " + songInfo.tracks[i].artists[0].name);
    //       console.log("The name of the track is: " + songInfo.tracks[i].name);
    //       console.log("The spotify preview is: " + songInfo.tracks[i].href);
    //     }
    //   }
    // });
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
    var fs = require('fs'); //reads and writes files using the builtin fs package

    fs.readFile("random.txt", "utf8", function(error, commandData) {
        //console.log(commandData);
        var commandArr = commandData.split(',');
        var commandOne = commandArr[0];
        var commandParameter = commandArr[1];
        //console.log(commandArr);
        console.log(commandOne);
        console.log(commandParameter);
    });    
    break;

  default:
    console.log("a command was not entered"); 
    break;
}


