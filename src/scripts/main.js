const url = "https://api.musixmatch.com/ws/1.1"


APIManager = {
    getArtist(textValue) {
return fetchJsonp (`${url}/track.search?format=jsonp&q_lyrics=${textValue}&quorum_factor=1&apikey=4cc92c98b858367876ca9869d3895f76`)
.then(res => res.json())
//.then(res =>console.log(res))
.then(res2 => jsonIterator(res2, "tracks"))
}
}

//.then(res => jsonIterator(jsonfiedResponse))
//.then(res => jsonIterator(jsonfiedResponse))
let search = document.getElementById("btnSearch");
let inputValue = document.getElementById("lyricSearch").value;

const getInputValue = ()=> {
    let inputValue = document.getElementById("lyricSearch").value;
      APIManager.getArtist(inputValue);

   };

search.addEventListener("click", getInputValue)


//initializing empty arrays
trackArray=[]
lyricsArray=[]


//***************************************************************************************************** 
// a helper function that iterates through the json response and return the relavant items as an array
//***************************************************************************************************** 

jsonIterator=(jsonfiedResponse, trackOrLyricsJSON)=>{
console.log(jsonfiedResponse)

if (trackOrLyricsJSON==="tracks"){   // we`re processing a response from the Track endpoint

  for (let i=0; i<jsonfiedResponse.message.body.track_list.length; i++){
    trackArray.push(jsonfiedResponse.message.body.track_list[i].track.track_id)
  }  
  console.log(trackArray)
  return trackArray
}else{ // we`re processing a response from the Lyrics endpoint

// write code here

console.log(lyricsArray)
  return lyricsArray
}
}

