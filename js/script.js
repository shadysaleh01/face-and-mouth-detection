////////////// The face detection section ///////////////


const video = document.querySelector("#video")

Promise.all([
   faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
   faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
   faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
   faceapi.nets.faceExpressionNet.loadFromUri('/models'),
]).then(startVideo)


function startVideo() {
   navigator.getUserMedia(
      { video: {} },
      stream => (video.srcObject) = stream,
      err => console.error(err)
   )
}

startVideo();
/*------ End of the detection section-----*/


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

video.addEventListener('play', () => {
   const canvas = faceapi.createCanvasFromMedia(video)
   document.querySelector("#faceDetection").appendChild(canvas)
   const displaySize = { width: video.width, height: video.height }
   setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new
         faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      console.log(detections)
      const resizedDetections = faceapi.resizeResults(detections, displaySize)
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
      faceapi.draw.drawDetections(canvas, resizedDetections)
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
   }, 100)
})

////////////// End of the detection section ////////////////
