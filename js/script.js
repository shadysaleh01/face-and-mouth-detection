////////////// The face detection section ///////////////
const video = document.getElementById("video")
function startVideo() {
   navigator.getUserMedia(
      { video: {} },
      stream => (video.srcObject) = stream,
      err => console.error(err)
   )
}
startVideo()
////////////// End of the detection section ////////////////
// const constraints = {
//    video: true,
//  };
//  const video = document.querySelector('#video');
//  navigator.mediaDevices.getUserMedia(constraints).then(stream => {
//    video.srcObject = stream;
//  });