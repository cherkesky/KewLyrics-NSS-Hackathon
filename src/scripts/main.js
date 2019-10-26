const url = "https://api.musixmatch.com/ws/1.1"
const textValue = "don't stop"

APIManager = {
    getArtist() {
return fetchJsonp (`https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&q_lyrics=baby&quorum_factor=1&apikey=4cc92c98b858367876ca9869d3895f76`)
.then(res => res.json())
.then(res =>console.log(res))
}
}

//.then(res => jsonIterator(jsonfiedResponse))

APIManager.getArtist()

