//These are some beginning variables needed to manipulate the dom
var generateColor = document.querySelector('#generate-color')
var trackBox = document.querySelector('#trackBox')
var playlistBox = document.getElementById('playlistBox')
var showPlaylistButton = document.querySelector('#saved-playlists')
var hidePlaylistsButton = document.querySelector('#hide-playlists')
var localStorageTracks = JSON.parse(localStorage.getItem('savedPlaylist'))

//The fucntions in this object are used to call tracks fromthe last FM api with a randomly generated color name
var fmAPI = {
  //This function is used to call the last FM api and returns a promise with data that we extract a tracklist from
  getTracksAPI: function (url) {
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
  },
  //This function takes the name and value or the color verifies if the tracklist we recieve has enough data
  //The function then takes the info and uses the index parameter to update the a specific artistBox with the correlated data
  getTracksFromApi: function (randomWord, color, index) {
    var topTracksUrl = 'https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=' + randomWord + '&api_key=454e25c0ad504f5f95f870a78830824c&format=json';


    fmAPI.getTracksAPI(topTracksUrl)
        .then(function (trackList) {
          if(trackList.length < 1){
            colorsApi.getColor().then(function(colorInfo){
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
              
              saveTrackButton.addEventListener('click', localStorageInfo.saveTrack)
              artistElement.textContent = artistName;
              trackNameElement.textContent = trackName;
              colorName.textContent = randomWord;
              colorBoxDiv.style.backgroundColor = '#' + color;
            
          }
        });
  }
};


//This is where we get the color value and name
var colorsApi = {
  //This function is used to generate a hex code and returns 'black' hex code '000000' if the result is not equal to 6
  generateHexVal: function () {
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    if(randomColor.length == 6){
      return randomColor
    } else {
      return '000000';
    }
  
  },
  //This allows us to get the name of the hex value that by using the colorAPi and returns a promise with the name and hex val as data
  getColor: function () {
    var randomColor = colorsApi.generateHexVal()
  

    return fetch(`https://www.thecolorapi.com/id?hex=${randomColor}&format=json`)
      .then(function(response) {
         return response.json()
       })
      .then(function(data) {
      var colorName = data.name.value;
      var colorInfo = {colorName:colorName, hexVal:randomColor}
        return colorInfo;
    });
    
  }
}


//This object contains functions for updating our local storage
var localStorageInfo = {
  //We need this savedPlaylist array to temporarily store and push new artistBox objects into the localStorage
  savedPlaylist: [],

  //This function takes all the relevant info from a an ArtistBox we want to save and pushes it to the localStorage
  saveTrack: function (e) {
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
  
  
    if(localStorageInfo.savedPlaylist.length < 1 && localStorageTracks != null){
      localStorageInfo.savedPlaylist = localStorageInfo.savedPlaylist.concat(localStorageTracks)
      
    } 
  
    localStorageInfo.savedPlaylist.unshift(artistBoxInfo)
    
  
    localStorage.setItem('savedPlaylist', JSON.stringify(localStorageInfo.savedPlaylist))
    
  },
  //This function takes the ArtistBoxInfo Boxes in the localStorage and loads up the the latest saved to the savedPlaylist section
  loadSavedPlaylist: function  () {
    var savedArtistBoxes = JSON.parse(localStorage.getItem('savedPlaylist'));
  
    for(let i = 0; i < playlistBox.children.length; i++){
      if(savedArtistBoxes[i]){
        playlistBox.children[i].style.display = 'block';
        var {colorName, artistName, trackName, colorValue} = savedArtistBoxes[i];
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
}

//This object contains functions that manipulate the dom through button clicks
var track2DomFunctions = {
  //when the button this function is assigned to is clicked, it will generate our artistBoxes inside the results container
  generateArtists: function (){
    track2DomFunctions.hidePlaylists();
    
    for(let i = 0; i < trackBox.children.length; i++){
      
      colorsApi.getColor().then(function(colorInfo){
  
        var {colorName, hexVal} = colorInfo;
        fmAPI.getTracksFromApi(colorName, hexVal, i)
      })
    }
    
  },
  //To see the playList section this will call the loadSavedPlaylist function and will hide the results container while displaying the playList container
  showPlaylists: function () {
    document.getElementById("saved-playlist-container").style.display = "block";
    document.getElementById("results-container").style.display = "none";
    showPlaylistButton.style.display = 'none';
    hidePlaylistsButton.style.display = 'block';
    localStorageInfo.loadSavedPlaylist()
  },
  //This will hide our playList section while showing the results container 
  hidePlaylists: function () {
    document.getElementById("saved-playlist-container").style.display = "none";
    document.getElementById("results-container").style.display = "block";
    showPlaylistButton.style.display = 'block';
    hidePlaylistsButton.style.display = 'none';
  }
}

 

//Here we just attached event listeners to the appropriate buttons
showPlaylistButton.addEventListener('click', track2DomFunctions.showPlaylists)
hidePlaylistsButton.addEventListener('click', track2DomFunctions.hidePlaylists)
generateColor.addEventListener('click', track2DomFunctions.generateArtists)