
var generateColor = document.querySelector('#generate-color')
var trackBox = document.querySelector('#trackBox')
var playlistBox = document.getElementById('playlistBox')
var showPlaylistButton = document.querySelector('#saved-playlists')
var hidePlaylistsButton = document.querySelector('#hide-playlists')
var localStorageTracks = JSON.parse(localStorage.getItem('savedPlaylist'))



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


var fmAPI = {
  savedPlaylist: [],
  getTracksFromApi: function (randomWord, color, index) {
    var topTracksUrl = 'http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=' + randomWord + '&api_key=454e25c0ad504f5f95f870a78830824c&format=json';


    getTracksAPI(topTracksUrl)
        .then(function (trackList) {
          console.log(trackList);
          if(trackList.length < 10){
            getColor().then(function(colorInfo){
              console.log(colorInfo)
              var {colorName, hexVal} = colorInfo;
              fmAPI.getTracksFromApi(colorName, hexVal, index)
            })
          } else {
              var randomTrackNum = Math.floor(Math.random()*trackList.length)
              var track = trackList[randomTrackNum]
              var colorBoxDiv = trackBox.children[index].querySelector('div')
              var colorName = trackBox.children[index].querySelector('h4')
              var artistElement = trackBox.children[index].querySelector('h5')
              var trackNameElement = trackBox.children[index].querySelector('p')
              var saveTrackButton = trackBox.children[index].querySelector('button')

              var artistName = track.artist.name;
              var trackName = track.name;
              
              saveTrackButton.addEventListener('click', saveTrack)
              artistElement.textContent = artistName;
              trackNameElement.textContent = trackName;
              colorName.textContent = randomWord;
              colorBoxDiv.style.backgroundColor = '#' + color;
            
          }
        });
  },

  generateArtistBox: function (){
    var container = document.querySelector('<div>');
    var colorName = document.querySelector('<h4>');
    var colorBox = document.querySelector('<div>');
    var artistName = document.querySelector('<h5>');
    // var trackName
    
  }
};
// This is the beginning of the color Api

function generateHexVal() {
  var randomColor = Math.floor(Math.random()*16777215).toString(16);
  if(randomColor.length == 6){
    return randomColor
  } else {
    return '000000';
  }

}
function getColor() {
  var randomColor = generateHexVal()

      //Our json fetch url.
  return fetch(`https://www.thecolorapi.com/id?hex=${randomColor}&format=json`)
    .then(function(response) {
       return response.json()
     })
    .then(function(data) {
    var colorName = data.name.value;
    var colorInfo = {colorName:colorName, hexVal:randomColor}
      console.log(randomColor)
      return colorInfo;
  });
  
}


function saveTrack(e) {
  var container = e.target.parentElement
  var colorName = container.querySelector('h4').textContent;
  var artistName = container.querySelector('h5').textContent;
  var trackName = container.querySelector('p').textContent;
  var colorValue = container.querySelector('div').style.backgroundColor;
  var artistBoxInfo = {
    colorName: colorName,
    artistName: artistName,
    trackName: trackName,
    colorValue: colorValue
  }


  if(fmAPI.savedPlaylist.length == 0 && localStorageTracks !== null){
    fmAPI.savedPlaylist = fmAPI.savedPlaylist.concat(localStorageTracks)
    
  } 

  fmAPI.savedPlaylist.unshift(artistBoxInfo)
  console.log(fmAPI.savedPlaylist)

  localStorage.setItem('savedSongs', JSON.stringify(fmAPI.savedPlaylist))
  
}

function loadSavedPlaylist () {
  var savedArtistBoxes = JSON.parse(localStorage.getItem('savedSongs'));
  console.log(savedArtistBoxes.length)
  for(let i = 0; i < playlistBox.children.length; i++){

    console.log(savedArtistBoxes)
    console.log(savedArtistBoxes[0])
    console.log(i)
    console.log(savedArtistBoxes[i])
    if(savedArtistBoxes[i]){
      playlistBox.children[i].style.display = 'block';
      var {colorName, artistName, trackName, colorValue} = savedArtistBoxes;
      var savedColorBoxDiv = playlistBox.children[i].querySelector('div')
      var savedColorName = playlistBox.children[i].querySelector('h4')
      var savedArtist = playlistBox.children[i].querySelector('h5')
      var savedTrackName = playlistBox.children[i].querySelector('p')

      savedColorBoxDiv.style.backgroundColor = colorValue;
      savedColorName.textContent = colorName;
      savedArtist.textContent = artistName;
      savedTrackName.textContent = trackName
    } else {
      playlistBox.children[i].style.display = 'none'
    }
  }
}



 function generateArtists(){
  hidePlaylists();
  
  for(let i = 0; i < trackBox.children.length; i++){
    
    getColor().then(function(colorInfo){

      var {colorName, hexVal} = colorInfo;
      fmAPI.getTracksFromApi(colorName, hexVal, i)
    })
  }
  
}





function showPlaylists() {
  document.getElementById("saved-playlist-container").style.display = "block";
  document.getElementById("results-container").style.display = "none";
  showPlaylistButton.style.display = 'none';
  hidePlaylistsButton.style.display = 'block';
  loadSavedPlaylist()
}

function hidePlaylists() {
  document.getElementById("saved-playlist-container").style.display = "none";
  document.getElementById("results-container").style.display = "block";
  showPlaylistButton.style.display = 'block';
  hidePlaylistsButton.style.display = 'none';
}

showPlaylistButton.addEventListener('click', showPlaylists)
hidePlaylistsButton.addEventListener('click', hidePlaylists)
generateColor.addEventListener('click', generateArtists)