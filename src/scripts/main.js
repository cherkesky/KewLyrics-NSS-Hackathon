const url = "https://api.musixmatch.com/ws/1.1"


APIManager = {
    getArtist(textValue) {
return fetchJsonp (`${url}/track.search?format=jsonp&q_lyrics=${textValue}&quorum_factor=1&apikey=${apiKey}`)
.then(res => res.json())
// .then(res =>console.log(res))
.then (resjson=> jsonIterator(resjson, "tracks"))
}
}

APIManager.getArtist("don't stop")

//***************************************************************************************************** 
// a helper function that iterates through the json response and return the relavant items as an array
//***************************************************************************************************** 

//initializing empty arrays
trackArray=[]
lyricsArray=[]

jsonIterator=(jsonfiedResponse, trackOrLyricsJSON)=>{
console.log(jsonfiedResponse)
if (trackOrLyricsJSON==="tracks"){   // we`re processing a response from the "tracks" endpoint
  for (let i=0; i<jsonfiedResponse.message.body.track_list.length; i++){
    trackArray.push(jsonfiedResponse.message.body.track_list[i].track.track_id)
  }  
  console.log(trackArray)
  return trackArray
}else{ // we`re processing a response from the "lyrics" endpoint
  lyricsArray.push(jsonfiedResponse.body.lyrics.lyrics_body)
  console.log(lyricsArray)
  return lyricsArray
}}

