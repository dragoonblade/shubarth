/*
* Author:      Marco Kuiper (http://www.marcofolio.net/)
*/

// Speed of the automatic slideshow
var slideshowSpeed = 5500;

// Variable to store the images we need to set as background
// which also includes some text and url's.
var photos = [ {
		"title" : "Galvanized Pipes",
		"image" : "s1.jpg",
		"url" : "#",
		"firstline" : "Established in the year 1986,",
		"secondline" : "Goodluck India Limited is an ISO 9001:2008 certified organization"
	}, {
		"title" : "Square & Rectangular Pipes",
		"image" : "s2.jpg",
		"url" : "#",
		"firstline" : "Manufacturers and Exporters of",
		"secondline" : "Galvanized Sheets Coils & CR Coils"
	}, {
		"title" : "We also specialize in providing",
		"image" : "s3.jpg",
		"url" : "#",
		"firstline" : "We offers",
		"secondline" : "Forged Flanges, Gear Rings, Gear Shanks & Forged Shafts"
	}, {
		"title" : "Cold Drawn Welded Tubes",
		"image" : "s4.jpg",
		"url" : "#",
		"firstline" : "We also specialize in providing",
		"secondline" : "Telecommunication & Telecom Structures"
	}, {
		"title" : "Cold Drawn Welded Tubes",
		"image" : "s5.jpg",
		"url" : "#",
		"firstline" : "We Offer Custom-designed & Workshop Fabricated",
		"secondline" : "Fabricated Steel Structure"
	}
	
];



$(document).ready(function() {
		
	// Backwards navigation
	$("#back").click(function() {
		stopAnimation();
		navigate("back");
	});
	
	// Forward navigation
	$("#next").click(function() {
		stopAnimation();
		navigate("next");
	});
	
	var interval;
	$("#control").toggle(function(){
		stopAnimation();
	}, function() {
		// Change the background image to "pause"
		$(this).css({ "background-image" : "url(gifs/btn_pause.png)" });
		
		// Show the next image
		navigate("next");
		
		// Start playing the animation
		interval = setInterval(function() {
			navigate("next");
		}, slideshowSpeed);
	});
	
	
	var activeContainer = 1;	
	var currentImg = 0;
	var animating = false;
	var navigate = function(direction) {
		// Check if no animation is running. If it is, prevent the action
		if(animating) {
			return;
		}
		
		// Check which current image we need to show
		if(direction == "next") {
			currentImg++;
			if(currentImg == photos.length + 1) {
				currentImg = 1;
			}
		} else {
			currentImg--;
			if(currentImg == 0) {
				currentImg = photos.length;
			}
		}
		
		// Check which container we need to use
		var currentContainer = activeContainer;
		if(activeContainer == 1) {
			activeContainer = 2;
		} else {
			activeContainer = 1;
		}
		
		showImage(photos[currentImg - 1], currentContainer, activeContainer);
		
	};
	
	var currentZindex = -1;
	var showImage = function(photoObject, currentContainer, activeContainer) {
		animating = true;
		
		// Make sure the new container is always on the background
		currentZindex--;
		
		// Set the background image of the new active container
		$("#headerimg" + activeContainer).css({
			"background-image" : "url(gifs/" + photoObject.image + ")",
			"display" : "block",
			"z-index" : currentZindex
		});
		
		// Hide the header text
		$("#headertxt").css({"display" : "none"});
		
		// Set the new header text
		$("#firstline").html(photoObject.firstline);
		$("#secondline")
			.attr("href", photoObject.url)
			.html(photoObject.secondline);
		$("#pictureduri")
			.attr("href", photoObject.url)
			.html(photoObject.title);
		
		
		// Fade out the current container
		// and display the header text when animation is complete
		$("#headerimg" + currentContainer).fadeOut(function() {
			setTimeout(function() {
				$("#headertxt").css({"display" : "block"});
				animating = false;
			}, 500);
		});
	};
	
	var stopAnimation = function() {
		// Change the background image to "play"
		$("#control").css({ "background-image" : "url(gifs/btn_play.png)" });
		
		// Clear the interval
		clearInterval(interval);
	};
	
	// We should statically set the first image
	navigate("next");
	
	// Start playing the animation
	interval = setInterval(function() {
		navigate("next");
	}, slideshowSpeed);
	
});
