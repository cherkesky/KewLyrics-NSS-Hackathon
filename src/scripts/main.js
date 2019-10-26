console.log("KewLyrics");
trackArray=[]
lyricsArray=[]

dummyApiFetch=()=>{
  console.log("dummyFetch API been called")
fetch ("http://localhost:8088/message")
.then(response=>response.json())
.then(jsonfiedResponse=>jsonIterator(jsonfiedResponse))
}

jsonIterator=(jsonfiedResponse)=>{
console.log(jsonfiedResponse)
for (let i=0; i<jsonfiedResponse.body.track_list.length; i++){
  trackArray.push(jsonfiedResponse.body.track_list[i].track.commontrack_id)
}  
console.log(trackArray)
return trackArray
}

dummyApiFetch();