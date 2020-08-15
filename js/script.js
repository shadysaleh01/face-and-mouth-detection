////////////// The face detection section ///////////////

function startVideo() {
  const constraints = {
    video: true,
  };
  const video = document.querySelector('#video');
  navigator.mediaDevices.getUserMedia(constraints).then(function (stream, err) {
    video.srcObject = stream;
    console.log(err);
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
