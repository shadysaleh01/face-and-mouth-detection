////////////// The face detection section /////////////

const video = document.querySelector('#video');
const startBtn = document.querySelector('#startBtn');
const pauseBtn = document.querySelector('#pauseBtn');

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
  $('#startBtn').click(function () {
    console.log('start');
    $('.camera-image').remove();
    $('#startBtn').hide();
    $('#pauseBtn').show();
    startVideo();
  })
);

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => (video.srcObject = stream),
    err => console.error(err)
  );
}

/*------ End of the detection section-----*/
var canvas;
var setVal;

video.addEventListener('play', () => {
  canvas = faceapi.createCanvasFromMedia(video);
  document.querySelector('#videoDiv').appendChild(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  run();

  pauseBtn.addEventListener('click', function () {
    $('#pauseBtn').hide();
    $('#startBtn').show();
    clearInterval(setVal);
  });

  function run() {
    var counter = 0;
    var emptyArr = [];

    setVal = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      console.log(detections);
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

      var expresion = detections[0].expressions;
      console.log('expresion:');
      console.log(
        Object.keys(expresion).reduce((a, b) =>
          expresion[a] > expresion[b] ? a : b
        )
      );
      var mostExpresion = Object.keys(expresion).reduce((a, b) =>
        expresion[a] > expresion[b] ? a : b
      );

      emptyArr.push(mostExpresion);

      counter += 1;
      console.log(counter);

      if (counter === 20) {
        clearInterval(setVal);
        console.log('emptyArr: ' + emptyArr);
        // var arr = JSON.stringify(emptyArr);

        let counts = emptyArr.reduce((a, c) => {
          a[c] = (a[c] || 0) + 1;
          return a;
        }, {});
        let maxCount = Math.max(...Object.values(counts));
        let mostFrequent = Object.keys(counts).filter(
          k => counts[k] === maxCount
        );

        console.log('mostFrequent: ' + mostFrequent);
        $('.emotion').append(mostFrequent);

        if ('sad' == mostFrequent) {
          var settings = {
            async: true,
            crossDomain: true,
            url: 'https://dad-jokes.p.rapidapi.com/random/jokes',
            method: 'GET',
            headers: {
              'x-rapidapi-host': 'dad-jokes.p.rapidapi.com',
              'x-rapidapi-key':
                'a53c3d1b8dmsh1b5a043b6a1b729p12a02cjsncc53fe89ef2d',
            },
          };
          $.ajax(settings).then(function (response) {
            console.log(response);
            var questions = response.setup;
            // console.log(questions);
            var answers = response.punchline;
            // console.log(answers);

            $('.question').append(questions);
            $('.answer').append(answers);

            /*----- appended the question and answer to the <p> tags in the model section-----*/
          });
        }
      }
    }, 100);
  }
});

////////////// End of the detection section ///////////////

/*----------- Added joke-api and ajax call------------*/
