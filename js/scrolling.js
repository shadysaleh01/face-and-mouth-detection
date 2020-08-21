/////////////// The header ///////////////
// Select all »a« elements with a parent tag »nav« and add a function that is executed on click
$('nav a').on('click', function (e) {
  // Define variable of the clicked »a« element (»this«) and get its href value.
  var href = $(this).attr('href');

  // Run a scroll animation to the position of the element which has the same id like the href value.
  $('html, body').animate(
    {
      scrollTop: $(href).offset().top,
    },
    '300'
  );

  // Prevent the browser from showing the attribute name of the clicked link in the address bar
  e.preventDefault();
});
//////////////// End of header //////////////
/////////////// The banner section ////////////////
// the start scroll button
$('.scroll-icon').on('click', function (e) {
  // Run a scroll animation to the position of the element which has the same id like the href value.
  $('html, body').animate(
    {
      scrollTop: $('#faceDetection').offset().top,
    },
    '300'
  );

  // Prevent the browser from showing the attribute name of the clicked link in the address bar
  e.preventDefault();
});
/////////////// End of banner section ////////////////
///////////// The footer ///////////////
// go up scroll button
$('#go-up').on('click', function (e) {
  // Run a scroll animation to the position of the element which has the same id like the href value.
  $('html, body').animate(
    {
      scrollTop: $('#header').offset().top,
    },
    '300'
  );

  // Prevent the browser from showing the attribute name of the clicked link in the address bar
  e.preventDefault();
});
////////////// End of footer ////////////////
