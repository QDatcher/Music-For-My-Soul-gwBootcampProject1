// const FMkey = '454e25c0ad504f5f95f870a78830824c';
// const sharesSecret = 'c7b73866d4588addbb675a95ce264480';

var genre = 'country'


const getAPI = (url) => {

    fetch(url)

	.then((response) => {
		console.log(response)
		const results = response.json()
		return results
	})
	.then(response => console.log(response))
	.catch(err => console.error(err));
}



const fmAPI = {
	getTracksFromApi: (randomWord) =>{
		var topTracksUrl = `http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${randomWord}&api_key=454e25c0ad504f5f95f870a78830824c&format=json`;
		getAPI(topTracksUrl)
	},
	getGenreTracksFromApi: (genre) =>{
		var genreSearch = `http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${genre}&api_key=454e25c0ad504f5f95f870a78830824c&format=json`;
		getAPI(genreSearch)
	}
}



fmAPI.getTracksFromApi('grey')

// getAPI(fmAPI.topTracksUrl)