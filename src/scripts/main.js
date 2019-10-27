const url = "https://api.musixmatch.com/ws/1.1"


APIManager = {
  getArtist(textValue) { // getArtist API call
    return fetchJsonp(`${url}/track.search?format=jsonp&q_lyrics=${textValue}&quorum_factor=1&apikey=4cc92c98b858367876ca9869d3895f76`)
      .then(res => res.json())
      .then(res2 => jsonIterator(res2, "tracks"))
  },
  getLyrics(trackId) {  // getLyrics API call
    return fetchJsonp(`${url}/track.lyrics.get?format=jsonp&track_id=${trackId}&apikey=4cc92c98b858367876ca9869d3895f76`)
      .then(res => res.json())
      .then(res2 => jsonIterator(res2, "lyrics"))
  }

}

const getMyLyrics = (getMyLyricsByTrackID) => {

  APIManager.getLyrics(getMyLyricsByTrackID);
  console.log("Track from getMyLyrics:", getMyLyricsByTrackID)
}


//*****************************************************************************************************
// Event Listener for Search Button 
//*****************************************************************************************************
let search = document.getElementById("btnSearch");
let inputValue = document.getElementById("lyricSearch").value;

const getInputValue = () => {
  let inputValue = document.getElementById("lyricSearch").value;
  APIManager.getArtist(inputValue);

};

search.addEventListener("click", getInputValue)


//***************************************************************************************************** 
// a helper function that iterates through the json response and return the relavant items as an array
//***************************************************************************************************** 

//initializing empty arrays
let lyricsArray = []
let tracksArray = []


jsonIterator = (jsonfiedResponse, trackOrLyricsJSON) => {
  console.log(jsonfiedResponse)
  if (trackOrLyricsJSON === "tracks") {   // we`re processing a response from the "tracks" endpoint
    for (let i = 0; i < jsonfiedResponse.message.body.track_list.length; i++) {
      const tracksObject = {
        track: jsonfiedResponse.message.body.track_list[i].track.track_id,
        artist: jsonfiedResponse.message.body.track_list[i].track.artist_name,
        song: jsonfiedResponse.message.body.track_list[i].track.track_name
      }
      tracksArray.push(tracksObject)
    }
    console.log(tracksArray)
    domPrinter(tracksArray, "Tracks")
  } else { // we`re processing a response from the "lyrics" endpoint
    lyricsArray.push(jsonfiedResponse.message.body.lyrics.lyrics_body)
    console.log(lyricsArray)
    domPrinter(lyricsArray, "Lyrics")
  }
}

//***************************************************************************************************** 
// DOMprinter - A factory function to dynamically populate the DOM with the passed through data
//***************************************************************************************************** 
let card_counter = 0;

domPrinter = (lyricsOrTracksArray, arrayIdentifier) => {
  if (arrayIdentifier === "Tracks") {  // checking what kind of array has passed through knowing that only the tracks array has the tracks property
    console.log("Tracks Array")

    for (let i = 0; i < lyricsOrTracksArray.length; i++) {
      card_counter++

      const fetchLyricsByTrack = lyricsOrTracksArray[i].track
      console.log(fetchLyricsByTrack)
      const byTrackArtist = lyricsOrTracksArray[i].artist
      const byTrackSong = lyricsOrTracksArray[i].song

      //Creating the DOM elements
      let songsResultsContainer = document.querySelector("#songsContainer")
      let songsCardContainer = document.createElement("div")

      let songsCardHeader = document.createElement("div")
      let songsCardHeaderArtist = document.createElement("h3")

      let songsCardBody = document.createElement("div")
      let songsCardBodySongTitle = document.createElement("p")
      let songsCardBodyButton = document.createElement("button")

      // Adding content to the elements
      songsCardHeaderArtist.textContent = `${byTrackArtist}`
      songsCardBodySongTitle.textContent = `${byTrackSong}`
      songsCardBodyButton.textContent = "Get Lyrics"

      // Adding styling and classes to the elements
      songsCardHeader.classList.add("card-header")
      songsCardBody.classList.add("card-body")
      songsCardContainer.classList.add("card")
      songsCardContainer.classList.add("bg-light")
      songsCardContainer.style.cssText = `width: 18rem;`
      songsCardBodyButton.classList.add("btn")
      songsCardBodyButton.classList.add("btn-primary")
      songsCardBodyButton.id = `get-lyrics-${card_counter}`
      songsCardBodyButton.addEventListener('click', getMyLyrics(fetchLyricsByTrack))

      // Appending all the child elements to their parent containers
      songsCardBody.appendChild(songsCardBodySongTitle)
      songsCardBody.appendChild(songsCardBodyButton)
      songsCardHeader.appendChild(songsCardHeaderArtist)
      songsCardContainer.appendChild(songsCardHeader)
      songsCardContainer.appendChild(songsCardBody)
      songsResultsContainer.appendChild(songsCardContainer)
    }

  } else {
    console.log("Lyrics Array")

for (let i=0; i<lyricsOrTracksArray.length; i++){
  //Creating the DOM elements
  let lyricsResultsContainer = document.querySelector("#lyricsContainer")

  let lyricsCardContainer = document.createElement("div")

  let lyricsCardHeader = document.createElement("div")
  let lyricsCardHeaderSongTitle = document.createElement("h3")

  let lyricsCardBody = document.createElement("div")
  let lyricsCardBodySongContainer = document.createElement("p")
  let lyricsCardBodySongLyrics = document.createElement("pre")

  // Adding content to the elements
  lyricsCardHeaderSongTitle.textContent = `Title`   // <-------- add code here
  lyricsCardBodySongLyrics.textContent = `La la la la`    // <-------- add code here

  // Adding styling and classes to the elements
  lyricsCardContainer.classList.add("card")
  lyricsCardContainer.classList.add("bg-light")
  lyricsCardContainer.style.cssText = `width: 18rem;`
  
  lyricsCardHeader.classList.add("card-header")
  lyricsCardBody.classList.add("card-body")

  // Appending all the child elements to their parent containers
  lyricsCardHeader.appendChild(lyricsCardHeaderSongTitle)
  lyricsCardBodySongContainer.appendChild(lyricsCardBodySongLyrics)
  lyricsCardBody.appendChild(lyricsCardBodySongContainer)

  lyricsCardContainer.appendChild(lyricsCardHeader)
  lyricsCardContainer.appendChild(lyricsCardBody)

  lyricsResultsContainer.appendChild(lyricsCardContainer)







}



    
  }
}
