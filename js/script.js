////////////// The face detection section ///////////////


const video = document.querySelector("#video")

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
