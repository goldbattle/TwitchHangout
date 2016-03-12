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
  // Change channel
  Twitch.Player.setChannel(event.state["stream_input"])
  // Update document
  stream_input.value = event.state["stream_input"];
  chat_embed.setAttribute("src", "https://www.twitch.tv/"+event.state["stream_input"]+"/chat");
  console.log("TWITCH PLUGIN SWITCHING - " + event.state["stream_input"])
});

// Called on chat open button
function stream_chat() {
  // Get data
  var stream_input = document.getElementById('stream_input');
  // Open our chat window
  newwindow=window.open('https://www.twitch.tv/'+stream_input.value+'/chat?popout=','name','height=600,width=400');
  // Focus on it
  if (window.focus) {newwindow.focus()}
  return false;
}

// On load, create new player
function run_startup() {
  // Create our player
  var options = {
      width: '100%',
      height: '100%',
      channel: gapi.hangout.data.getValue('stream_input'), 
      //video: "{VIDEO_ID}"
  };
  // Insert
  Twitch.Player = new Twitch.Player("live_player", options);
  console.log("TWITCH PLUGIN HAS BEEN LOADED - " + gapi.hangout.data.getValue('stream_input'))
} 