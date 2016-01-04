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
  console.log("===============================")
  console.log(stream_input)
  var stream_obj= document.getElementById('live_player');
  console.log("===============================")
  console.log(stream_obj)
  // Create our Iframe object
  ifrm = document.createElement("iframe");
  ifrm.setAttribute("src", "http://player.twitch.tv/?channel="+event.state["stream_input"]);
  ifrm.style.width = "100%";
  ifrm.style.height = "100%";
  console.log("===============================")
  console.log(ifrm)
  // Update document
  stream_obj = ifrm;
  console.log("===============================")
  console.log(stream_obj)
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