$(function(){
 var shrinkHeader =10;
  $(window).scroll(function() {
    var scroll = getCurrentScroll();
      if ( scroll >= shrinkHeader ) {
           $('header').addClass('nav-up');
		   $('#textBody').css('marginTop','190px')
		   
        }
        else {
            $('header').removeClass('nav-up');
			$('#textBody').css('marginTop','0px')
			
        }
  });
function getCurrentScroll() {
    return window.pageYOffset;
    }
});



