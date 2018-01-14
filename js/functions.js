jQuery(document).ready(function($){
	var	scrolling = false;
	var contentSections = $('.cd-section'),
		verticalNavigation = $('.cd-vertical-nav'),
		navigationItems = verticalNavigation.find('a'),
		navTrigger = $('.cd-nav-trigger'),
		scrollArrow = $('.scrolldown');

	$(window).on('scroll', checkScroll);

	//smooth scroll to the selected section
	verticalNavigation.on('click', 'a', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
        verticalNavigation.removeClass('open');
    });

    //smooth scroll to the second section
    $('scrollArrow').on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });

	// open navigation if user clicks the .cd-nav-trigger - small devices only
    navTrigger.on('click', function(event){
    	event.preventDefault();
    	verticalNavigation.toggleClass('open');
    });

	function checkScroll() {
		if( !scrolling ) {
			scrolling = true;
			(!window.requestAnimationFrame) ? setTimeout(updateSections, 300) : window.requestAnimationFrame(updateSections);
		}
	}

	function updateSections() {
		var halfWindowHeight = $(window).height()/2,
			scrollTop = $(window).scrollTop();
		contentSections.each(function(){
			var section = $(this),
				sectionId = section.attr('id'),
				navigationItem = navigationItems.filter('[href^="#'+ sectionId +'"]');
			( (section.offset().top - halfWindowHeight < scrollTop ) && ( section.offset().top + section.height() - halfWindowHeight > scrollTop) )
				? navigationItem.addClass('active')
				: navigationItem.removeClass('active');
		});
		scrolling = false;
	}

	function smoothScroll(target) {
        $('body,html').animate(
        	{'scrollTop':target.offset().top},
        	300
        );
	}
	


	
	//owlCarousel
  $("#text-demo").owlCarousel({
    autoPlay : 2000,
    stopOnHover : true,
    navigation:true,
    paginationSpeed : 1000,
    singleItem : true,

  });
  
 	//Animate
		jQuery('.animate').appear();
			jQuery(document.body).on('appear', '.animate', function(e, $affected) {
				var fadeDelayAttr;
				var fadeDelay;
				jQuery(this).each(function(){
				
	
					if (jQuery(this).data("delay")) {
						fadeDelayAttr = jQuery(this).data("delay")
						fadeDelay = fadeDelayAttr;				
					} else {
						fadeDelay = 0;
					}			
					jQuery(this).delay(fadeDelay).queue(function(){
						jQuery(this).addClass('animated').clearQueue();
					});			
				})			

			});
			
	// Main-Slider
  jQuery('.fullscreenbanner').revolution({
			delay:15000,
			startwidth:1170,
			startheight:500,
			hideThumbs:10,
			fullWidth:"off",
			fullScreen:"on",
			shadow:0,
			dottedOverlay:"none",
			fullScreenOffsetContainer: ""      
	 });
  
	//counter
	$('.count').each(function () {
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: 4000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
  
});

// Contact Form

$("#btn-submit").click(function() {
        //get input field values
        var user_name       = $('input[name=name]').val();
        var user_email      = $('input[name=email]').val();
		var user_message    = $('textarea[name=message]').val();

        //simple validation at client's end
        var proceed = true;
        if(user_name==""){
            proceed = false;
        }
        if(user_email==""){
            proceed = false;
        }
		if(user_message=="") {
            proceed = false;
        }

		var post_data, output;

        //everything looks good! proceed...
        if(proceed)
        {
            //data to be sent to server
            post_data = {'userName':user_name, 'userEmail':user_email, 'userMessage':user_message};

            //Ajax post data to server
            $.post('contact.php', post_data, function(response){

                //load json data from server and output message
				if(response.type == 'error')
				{
					output = '<div class="alert-danger" style="background:transparent; margin-bottom:10px;"><p>'+response.text+'</p></div>';
				}else{
				    output = '<div class="alert-success" style="background:transparent; margin-bottom:10px;"><p>'+response.text+'</p></div>';

					//reset values in all input fields
					$('#contact-form input').val('');
					$('#contact-form textarea').val('');
					$('#btn-submit').val('Submit Now');

				}

				$("#result").hide().html(output).slideDown();
            }, 'json');

        }
    });

    //reset previously set border colors and hide all message on .keyup()
    $(".form-inline input, .form-inline textarea").keyup(function() {
        $("#result").slideUp();
    });


});

// to remove transition
if(screen.width <720 ){
 $('div, img, input, textarea, button, a').removeClass('animate'); 
 }
