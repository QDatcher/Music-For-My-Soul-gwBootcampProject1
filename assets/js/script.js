// const FMkey = '454e25c0ad504f5f95f870a78830824c';
// const sharesSecret = 'c7b73866d4588addbb675a95ce264480';
var generateColor = document.querySelector('#generate-color')
var trackBox = document.querySelector('#trackBox')
var genre = 'country';
var ourTracks;
function getTracksAPI(url) {
  return fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
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
  getTracksFromApi: function (randomWord, color) {
    var topTracksUrl = 'http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=' + randomWord + '&api_key=454e25c0ad504f5f95f870a78830824c&format=json';

    getTracksAPI(topTracksUrl)
        .then(function (trackList) {
          console.log(trackList);
          if(trackList.length < 10){
            getColor()
          } else {
            for(let i = 0; i < trackBox.children.length; i++){
              var track = trackList[i]
              var colorBoxDiv = trackBox.children[i].querySelector('div')
              var h4Div = trackBox.children[i].querySelector('h4')
              var artistDiv = trackBox.children[i].querySelector('h5')
              var trackNameDiv = trackBox.children[i].querySelector('p')

              var artistName = track.artist.name;
              var trackName = track.name;
              
              
              artistDiv.textContent = artistName;
              trackNameDiv.textContent = trackName;
              h4Div.textContent = randomWord;
              colorBoxDiv.style.backgroundColor = '#' + color;
            }
          }
        });
  },

  generateArtistBox: function (){
    
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
    fmAPI.getTracksFromApi(colorName, randomColor)
  });
    
}



function generateArtists(){
  
}


generateColor.addEventListener('click', getColor)
console.log(trackBox.children)








// console.log(fmAPI.getTracksFromApi('Stromboli'))
// // console.log(track)
// // getAPI(fmAPI.topTracksUrl)
// console.log(ourTracks)