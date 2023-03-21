// const FMkey = '454e25c0ad504f5f95f870a78830824c';
// const sharesSecret = 'c7b73866d4588addbb675a95ce264480';
var genre = 'country';
var ourTracks;
function getAPI(url) {
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
    // var tracks = 
	getAPI(topTracksUrl)
      .then(function (trackList) {
        console.log(trackList);
        ourTracks = trackList;
      });
	// return tracks
  },
  getGenreTracksFromApi: function (genre) {
    var genreSearch = 'http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=' + genre + '&api_key=454e25c0ad504f5f95f870a78830824c&format=json';
    getAPI(genreSearch);
  }
};

console.log(fmAPI.getTracksFromApi('rap'))
// console.log(track)
// getAPI(fmAPI.topTracksUrl)
console.log(ourTracks)