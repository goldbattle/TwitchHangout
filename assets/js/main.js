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
  var stream_url= document.getElementById('stream_url');
  var stream_input= document.getElementById('stream_input');
  var stream_obj= document.getElementById('live_embed_player_flash');
  //document.getElementById('FrameID').contentWindow.location.reload(true);
  stream_obj.data = "https://twitch.tv/widgets/live_embed_player.swf?channel="+event.state["stream_input"];
  stream_url.value = "hostname=www.twitch.tv&auto_play=true&start_volume=25&channel="+event.state["stream_input"];
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