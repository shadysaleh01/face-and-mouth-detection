////////////// The face detection section ///////////////


const video = document.querySelector("#video")
const startBtn = document.querySelector("#startBtn")
const pauseBtn = document.querySelector("#pauseBtn")

Promise.all([
   faceapi.nets.tinyFaceDetector.loadFromUri('https://moelak.oudemo.com/_resources/models'),
   faceapi.nets.faceLandmark68Net.loadFromUri('https://moelak.oudemo.com/_resources/models'),
   faceapi.nets.faceRecognitionNet.loadFromUri('https://moelak.oudemo.com/_resources/models'),
   faceapi.nets.faceExpressionNet.loadFromUri('https://moelak.oudemo.com/_resources/models'),
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
var canvas;
var setVal;
startBtn.addEventListener('click', () => {
   canvas = faceapi.createCanvasFromMedia(video)
   document.querySelector("#faceDetection").appendChild(canvas)
   const displaySize = { width: video.width, height: video.height }
   setVal = setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new
         faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      console.log(detections)
      const resizedDetections = faceapi.resizeResults(detections, displaySize)
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
      faceapi.draw.drawDetections(canvas, resizedDetections)
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
   } ,100)
})
pauseBtn.addEventListener('click', function () {
   clearInterval(setVal)
   canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
})

////////////// End of the detection section ///////////////

