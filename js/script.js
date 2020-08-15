<<<<<<< HEAD
// Select all »a« elements with a parent tag »nav« and add a function that is executed on click
$('nav a').on('click', function (e) {

   // Define variable of the clicked »a« element (»this«) and get its href value.
   var href = $(this).attr('href')

   // Run a scroll animation to the position of the element which has the same id like the href value.
   $('html, body').animate({
      scrollTop: $(href).offset().top
   }, '300')

   // Prevent the browser from showing the attribute name of the clicked link in the address bar
   e.preventDefault()

})

// the start scroll button
$('#banner a').on('click', function (e) {

   // Run a scroll animation to the position of the element which has the same id like the href value.
   $('html, body').animate({
      scrollTop: $("#wal-tar").offset().top
   }, '300')

   // Prevent the browser from showing the attribute name of the clicked link in the address bar
   e.preventDefault()
})

// ajax request to joke api
$(document).ready(function() {
   $.ajax({
       type: "GET",
       url: "https://api.icndb.com/jokes/random",
     dataType: "json",
       success: function (msg) {
           $("#joke").html(msg.value.joke);
       },
       error: function (req, status, error) {
           alert(req + " " + status + " " + error);
           }
   });
});

=======
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
>>>>>>> 92a6e55c31d2ce16d49233ef2cb2f4959092a357
