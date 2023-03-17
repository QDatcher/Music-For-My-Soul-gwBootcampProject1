
const urlRoot = 'http://ws.audioscrobbler.com/2.0/'
const FMkey = '454e25c0ad504f5f95f870a78830824c';
const genreSearch = `?method=tag.getinfo&tag=disco&api_key=${FMkey}&format=json`

// /2.0/?method=tag.gettoptracks&tag=disco&api_key=454e25c0ad504f5f95f870a78830824c&format=json


const sharesSecret = 'c7b73866d4588addbb675a95ce264480'
const url = urlRoot + genreSearch;
const getAPI = (url) => {

    fetch(url)

	.then((response) => {
		console.log(response)
		console.log(response.json())})
	.then(response => console.log(response))
	.catch(err => console.error(err));
}

getAPI(url)