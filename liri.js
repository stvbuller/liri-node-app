
var parameters = process.argv.slice(3);  //check that this is slicing in the proper position
var commandName = process.argv[2];      //check that this is the proper argv
var titleStringOne = "";

//creates a string from the command line parameters
for (i = 0; i < parameters.length; i++){
  titleStringOne += parameters[i] + " ";
}

function liriApp(appName, titleString) {

  var keys = require("./keys.js");
  var request = require('request');     //requires the npm request package
  var Twitter = require('twitter');     //requires the npm twitter package
  var spotify = require('spotify');     //requires the npm spotify package
  var fs = require('fs'); //reads and writes files using the builtin fs package

  var movieTitle;
  var movieUrl;
  var movieSearchResult;
  var songTitle;
  //var songUrl;         //this is used in the spotify search that uses the npm package

  switch (appName){       
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
          //create a blank line
          fs.appendFile("log.txt", "\n");
          for (var i = 0; i < 20; i++) {
            console.log(tweets[i].text);
            fs.appendFile("log.txt", tweets[i].text + "\n");
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
      spotify.search ({type: 'track', query: songTitle}, function(err, data) {
          if ( err ) {
              console.log('Error occurred: ' + err);
              return;
          }
          //console.log(data);
          fs.appendFile("log.txt", "\n");
          for (var i = 0; i < 5; i++) {
            console.log("The artist is: " + data.tracks.items[i].artists[0].name);
            console.log("The track name is: " + data.tracks.items[i].name);
            console.log("The album name is: " + data.tracks.items[i].album.name);
            console.log("The Spotfiy preview is: " + data.tracks.items[i].external_urls.spotify);
            fs.appendFile("log.txt",  "The artist is: " + data.tracks.items[i].artists[0].name + "\n");
            fs.appendFile("log.txt",  "The track name is: " + data.tracks.items[i].name + "\n");
            fs.appendFile("log.txt",  "The album name is: " + data.tracks.items[i].album.name + "\n");
            fs.appendFile("log.txt",  "The Spotfiy preview is: " + data.tracks.items[i].external_urls.spotify + "\n");
          } 
      });
      //this uses the request npm package to get info from spotify
      // songUrl = "http://ws.spotify.com/search/1/track.json?q=" + songTitle;
      // request(songUrl, function (error, response, body) {
      //   if (!error && response.statusCode == 200) {
      //     var songInfo = JSON.parse(body);
      //     console.log(JSON.parse(body)["info"]);
      //     for (var i = 0; i < 5; i++) {
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
      movieUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&tomatoes=true&y=&plot=short&r=json";
      request(movieUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              //console.log(body);
              //console.log("The Title is: " + JSON.parse(body)["Title"]);
              movieSearchResult = JSON.parse(body);
              console.log("The Title is: " + movieSearchResult.Title);
              console.log("The imdbRating is: " + movieSearchResult.imdbRating);
              console.log("The Country is: " + movieSearchResult.Country);
              console.log("The Language is: " + movieSearchResult.Language);
              console.log("The Plot is: " + movieSearchResult.Plot);
              console.log("The Actors are: " + movieSearchResult.Actors);
              console.log("The Rotton Tomatoes Rating is: " + movieSearchResult.tomatoRating);
              console.log("The Rotton Tomatoes url is: " + movieSearchResult.tomatoURL);
              // console.log("The Year is: " + JSON.parse(body)["Year"]);
              // console.log("The imdbRating is: " + JSON.parse(body)["imdbRating"]);
              // console.log("The Country is: " + JSON.parse(body)["Country"]);
              // console.log("The Language is: " + JSON.parse(body)["Language"]);
              // console.log("The Plot is: " + JSON.parse(body)["Plot"]);
              // console.log("The Actors are: " + JSON.parse(body)["Actors"]);
              // console.log("The Rotton Tomatoes Rating is: " + JSON.parse(body)["tomatoRating"]);
              // console.log("The Rotton Tomatoes url is: " + JSON.parse(body)["tomatoURL"]);
            }
          });
      break;
    case "do-what-it-says":
      
      fs.readFile("random.txt", "utf8", function(error, commandData) {
          //console.log(commandData);
          var commandArr = commandData.split(',');
          var commandLiri = commandArr[0];
          var commandParameter = commandArr[1];
          //console.log(commandArr);
          liriApp(commandLiri, commandParameter);
      });  
      break;

    default:
      console.log("a command was not entered"); 
      break;
  }
}

liriApp(commandName, titleStringOne);
