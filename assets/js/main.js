// Called when we update the stream button
function change_stream() {
  // Get data
  var stream_input= document.getElementById('stream_input');
  // Update data
  var data = {"stream_input": stream_input.value};
  gapi.hangout.onApiReady.add(function(eventObj){
    gapi.hangout.data.submitDelta(data);
  });
  return false;
}

// Handle data uploads
gapi.hangout.data.onStateChanged.add(function(event) {
  // Get data we need
  var stream_input= document.getElementById('stream_input');
  // Get old stream object and delete
  var stream_obj = document.getElementById('live_player');
  // Create our player
  var options = {
      width: '100%',
      height: '100%',
      channel: event.state["stream_input"], 
      //video: "{VIDEO_ID}" 
  };
  // Check to see if div is empty, if so we need to create the player
  console.log(stream_obj.innerHtml)
  if(stream_obj.innerHtml === "") {
    // Create new
    var player = new Twitch.Player("live_player", options);
    // Set nice volume
    player.setVolume(0.5);
  } else {
    // Else just change the channel
    stream_obj.setChannel(event.state["stream_input"])
    stream_obj.play()
  }
  // Update document
  stream_input.value = event.state["stream_input"];
});

// Called on chat open button
function stream_chat() {
  // Get data
  var stream_input= document.getElementById('stream_input');
  // Open our chat window
  newwindow=window.open('http://www.twitch.tv/'+stream_input.value+'/chat?popout=','name','height=600,width=400');
  // Focus on it
  if (window.focus) {newwindow.focus()}
  return false;
}