const url = "https://api.musixmatch.com/ws/1.1"


APIManager = {
    getArtist(textValue) {
return fetchJsonp (`${url}/track.search?format=jsonp&q_lyrics=${textValue}&quorum_factor=1&apikey=${apiKey}`)
.then(res => res.json())
.then (resjson=> jsonIterator(resjson, "tracks"))
}
}

APIManager.getArtist("don't stop")

//***************************************************************************************************** 
// a helper function that iterates through the json response and return the relavant items as an array
//***************************************************************************************************** 

//initializing empty arrays
let lyricsArray=[]
let tracksArray=[]


jsonIterator=(jsonfiedResponse, trackOrLyricsJSON)=>{
console.log(jsonfiedResponse)
if (trackOrLyricsJSON==="tracks"){   // we`re processing a response from the "tracks" endpoint
  for (let i=0; i<jsonfiedResponse.message.body.track_list.length; i++){
    const tracksObject = {
      track: jsonfiedResponse.message.body.track_list[i].track.track_id,
      artist: jsonfiedResponse.message.body.track_list[i].track.artist_name,
      song: jsonfiedResponse.message.body.track_list[i].track.track_name
    }
    tracksArray.push(tracksObject)
  }  
  console.log(tracksArray)
  domPrinter (tracksArray)
}else{ // we`re processing a response from the "lyrics" endpoint
  lyricsArray.push(jsonfiedResponse.body.lyrics.lyrics_body)
  console.log(lyricsArray)
  return lyricsArray
}}

//***************************************************************************************************** 
// DOMprinter - A factory function to dynamically populate the DOM with the passed through data
//***************************************************************************************************** 
let card_counter=0;

domPrinter=(arrayOfSomeKind)=>{

card_counter++

//Creating the DOM elements
songsResultsContainer = document.querySelector("#songsContainer")
songsCardContainer= document.createElement("div") 

songCardHeader = document.createElement("div")   
songCardHeaderArtist = document.createElement("h3") 

songsCardBody = document.createElement("div")    
songsCardBodySongTitle = document.createElement("p")
songsCardBodyButton = document.createElement("a")

// Adding content to the elements
songCardHeaderArtist.textContent = `Artist: ${artist}`
songsCardBodySongTitle.textContent= `Song: ${song}`
songsCardBodyButton.textContent= "Get Lyrics"

// Adding styling and classes to the elements
songCardBody.classList.add("card bg-light")
songCardBody.style.add("width: 18rem;")
songCardBody.classList.add("btn btn-primary")
songsCardBodyButton.id= `get-lyrics-${card_counter}`

// Appending all the child elements to their parent containers
songsCardBody.appendChild(songsCardBodySongTitle)
songsCardBody.appendChild(songsCardBodyButton)

songCardHeader.appendChild(songCardHeaderArtist)

songsCardContainer.appendChild(songCardHeader)
songsCardContainer.appendChild(songCardBody)




}