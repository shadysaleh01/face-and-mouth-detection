/*------ The face detection section-----*/

/*Create video to render our webcam*/
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
/*------ End of the detection section-----*/
