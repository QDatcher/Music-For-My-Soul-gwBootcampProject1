// const FMkey = '454e25c0ad504f5f95f870a78830824c';
// const sharesSecret = 'c7b73866d4588addbb675a95ce264480';
var genre = 'country';
var ourTracks;
function getTracksAPI(url) {
  return fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data.tracks.track;
    })
    .catch(function (err) {
      console.error(err);
    });
}

// getAPI(
//   'http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=grey&api_key=454e25c0ad504f5f95f870a78830824c&format=json'
// )
//   .then(function (trackList) {
//     console.log(trackList);
//   });

var fmAPI = {
  getTracksFromApi: function (randomWord) {
    var topTracksUrl = 'http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=' + randomWord + '&api_key=454e25c0ad504f5f95f870a78830824c&format=json';

	getTracksAPI(topTracksUrl)
      .then(function (trackList) {
        console.log(trackList);
        ourTracks = trackList;
      });
  }
};
// This is the beginning of the color Api
function getColor() {
  var randomColor = Math.floor(Math.random()*16777215).toString(16);
  console.log(randomColor)
      //Our json fetch url.
  fetch(`https://www.thecolorapi.com/id?hex=${randomColor}&format=json`)
    .then(function(response) {
       return response.json()
     })
    .then(function(data) {
    console.log(data.name.value)
    var colorName = data.name.value;
    fmAPI.getTracksFromApi(colorName)
  });
    
}
getColor()
















console.log(fmAPI.getTracksFromApi('Stromboli'))
// // console.log(track)
// // getAPI(fmAPI.topTracksUrl)
// console.log(ourTracks)