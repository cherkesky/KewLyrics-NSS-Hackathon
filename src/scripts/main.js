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
//initializing empty arrays
trackArray=[]
lyricsArray=[]

dummyApiFetch=()=>{
  console.log("dummyFetch API been called")
fetch ("http://localhost:8088/message")
.then(response=>response.json())
.then(jsonfiedResponse=>jsonIterator(jsonfiedResponse, "tracks"))
}

dummyApiFetch2=()=>{
  console.log("dummyFetch API been called")
fetch ("http://localhost:8088/message2")
.then(response=>response.json())
.then(jsonfiedResponse=>jsonIterator(jsonfiedResponse, "lyrics"))
}

//***************************************************************************************************** 
// a helper function that iterates through the json response and return the relavant items as an array
//***************************************************************************************************** 

jsonIterator=(jsonfiedResponse, trackOrLyricsJSON)=>{
console.log(jsonfiedResponse)

if (trackOrLyricsJSON==="tracks"){   // we`re processing a response from the Track endpoint

  for (let i=0; i<jsonfiedResponse.body.track_list.length; i++){
    trackArray.push(jsonfiedResponse.body.track_list[i].track.track_id)
  }  
  console.log(trackArray)
  return trackArray
}else{ // we`re processing a response from the Lyrics endpoint

// write code here

console.log(lyricsArray)
  return lyricsArray
}
}

dummyApiFetch();