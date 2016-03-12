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
  var stream_input = document.getElementById('stream_input');
  // Get old stream object and delete
  var stream_obj = document.getElementById('live_player');
  // Get chat enbed
  var chat_embed = document.getElementById('chat_embed');
  // Create our player
  var options = {
      width: '100%',
      height: '100%',
      channel: event.state["stream_input"], 
      //video: "{VIDEO_ID}" 
  };
  // Check to see if div is empty, if so we need to create the player
  if(stream_obj.innerHTML.trim() === "") {
    Twitch.Player = new Twitch.Player("live_player", options);
    player.setVolume(0.5);
  } else {
    // Else just change the channel
    Twitch.Player.setChannel(event.state["stream_input"])
    Twitch.Player.play()
  }
  // If stream input is empty, remove the player
  if(event.state["stream_input"].trim() === "") {
    Twitch.Player.destroy()
    return;
  }
  // Update document
  stream_input.value = event.state["stream_input"];
  chat_embed.setAttribute("src", "http://www.twitch.tv/"+event.state["stream_input"]+"/chat");
});

// Called on chat open button
function stream_chat() {
  // Get data
  var stream_input= document.getElementById('stream_input');
  // Open our chat window
  newwindow=window.open('https://www.twitch.tv/'+stream_input.value+'/chat?popout=','name','height=600,width=400');
  // Focus on it
  if (window.focus) {newwindow.focus()}
  return false;
}