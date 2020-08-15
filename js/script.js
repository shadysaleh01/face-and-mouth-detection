////////////// The face detection section ///////////////

function startVideo() {
  const constraints = {
    video: true,
  };
  const video = document.querySelector('#video');
  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    video.srcObject = stream;
  });
}

startVideo();
////////////// End of the detection section ////////////////
// const constraints = {
//    video: true,
//  };
//  const video = document.querySelector('#video');
//  navigator.mediaDevices.getUserMedia(constraints).then(stream => {
//    video.srcObject = stream;
//  });
