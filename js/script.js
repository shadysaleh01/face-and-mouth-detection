$('#banner a').on('click', function (e) {

   // Run a scroll animation to the position of the element which has the same id like the href value.
   $('html, body').animate({
      scrollTop: $("#wal-tar").offset().top
   }, '300')

   // Prevent the browser from showing the attribute name of the clicked link in the address bar
   e.preventDefault()
})

$('footer a').on('click', function (e) {

   // Run a scroll animation to the position of the element which has the same id like the href value.
   $('html, body').animate({
      scrollTop: $("#header").offset().top
   }, '300')

   // Prevent the browser from showing the attribute name of the clicked link in the address bar
   e.preventDefault()

})