////////////// The face detection section ///////////////

const video2 = document.querySelector('#video2');

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri(
    'https://moelak.oudemo.com/_resources/models'
  ),
  faceapi.nets.faceLandmark68Net.loadFromUri(
    'https://moelak.oudemo.com/_resources/models'
  ),
  faceapi.nets.faceRecognitionNet.loadFromUri(
    'https://moelak.oudemo.com/_resources/models'
  ),
  faceapi.nets.faceExpressionNet.loadFromUri(
    'https://moelak.oudemo.com/_resources/models'
  ),
]).then(
  $('.turnOnCamera2').click(function () {
    console.log('start');
    $('.camera-image2').fadeOut();
    $('.turnOnCamera2').attr('style', 'box-shadow: 1px 3px 12px yellow;');
    startVideo2();
  })
);

function startVideo2() {
  navigator.getUserMedia(
    { video: {} },
    stream => (video2.srcObject = stream),
    err => console.error(err)
  );
}

video2.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video2);
  document.querySelector('#mouthDetection').appendChild(canvas);
  const displaySize = { width: video2.width, height: video2.height };
  faceapi.matchDimensions(canvas, displaySize);

  $('#startBtn2').click(function () {
    console.log('click....asf');
    $('#startBtn2').hide();
    $('#pauseBtn2').show();
     $('canvas').show();
    run2();
  });

  // setTimeout(run, 2000);
  var emptyArr = [];

  function run2() {
    $('#pauseBtn2').click(function () {
      console.log('click....');
      $('#pauseBtn2').hide();
      $('#startBtn2').show();
       $('canvas').hide();
      clearInterval(interval);
    });
    var timesRun = 0;
    emptyArr.length = 0;
    var interval = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video2, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      console.log(detections);

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      let num =
        detections[0].landmarks._positions[66]._y -
        detections[0].landmarks._positions[62]._y;
      var posNum = num < 0 ? num * -1 : num;
      console.log('test=> ' + posNum);

      emptyArr.push(posNum);

      timesRun += 1;
      console.log('timesRun: ' + timesRun);
      if (timesRun === 10) {
        clearInterval(interval);
        console.log('ARRRRRR: ' + JSON.stringify(emptyArr));
        var maxNum = JSON.stringify(Math.max.apply(null, emptyArr));
        console.log(' hahahah-> ' + maxNum);

        if (maxNum > 2.7) {
          $('.talking').attr('style', 'display: block;');
          $('.silent').attr('style', 'display: none;');
        } else {
          $('.talking').attr('style', 'display: none;');
          $('.silent').attr('style', 'display: block;');
        }
        setTimeout(run2, 100);
      }
    }, 100);
  }
});

////////////// End of the detection section ////////////////
