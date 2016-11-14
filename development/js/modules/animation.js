
// Run IE specific Animation
function enablerInitHandler() {
	if (isIeLessThan9) {
		anim1Ie();
	} else {
		anim1();
	}
}

// Timelines
var _tl = new TimelineLite();										// Timeline for element initial state
var tl1 = new TimelineMax({repeat:0, ease:Expo.easeOut});			// Frame 1 timeline
var tl2 = new TimelineMax({repeat:0, ease:Expo.easeOut});			// Frame 2 timeline
var tl3 = new TimelineMax({repeat:0, ease:Expo.easeOut});			// Frame 3 timeline

// Fallback Animation funtion for IE
function anim1Ie() {
	var messages = El("messages");
	var border = El("border");
	var tl = new TimelineMax({repeat:1});
	var tween = tl.to(border, 30, {css:{backgroundPosition: "0 100%"}, ease: Expo.easeInOut});
}

// Frame 1 Animation
function anim1() {

	// Element initial state
	_tl.set(animation, {autoAlpha:0});								// Hide animation
	_tl.set(bgExit, {autoAlpha:0});									// Hide bgExit
	_tl.set(frame1, {autoAlpha:1});									// Hide frame1
	_tl.set(frame1Example, {autoAlpha:0});							// Hide frame1Example
	_tl.set(frame2, {autoAlpha:0});									// Hide frame2
	_tl.set(trailerContainer, {autoAlpha:0});						// Hide trailerContainer
	_tl.set(trailer, {autoAlpha:0});								// Hide trailer
	_tl.set(frame2Example, {autoAlpha:0});							// Hide frame2Example
	_tl.set(cta, {autoAlpha:0});									// Hide cta

	// Tween
	tl1.to(animation, 0.25, {autoAlpha:1});							// Show animation
	tl1.to(bgExit, 0, {autoAlpha:1});								// Show bgExit
	tl1.to(frame1, 0.25, {autoAlpha:1});							// Show frame1
	tl1.to(frame1Example, 0.25, {autoAlpha:1});						// Show frame1Example
	tl1.to(frame1Example, 0, {delay:2});							// Show frame1Example
	tl1.call(anim2);												// Play anim2
}

// Frame 2 Animation
function anim2() {

	// Tween
	tl2.to(frame2, 0.25, {autoAlpha:1});							// Show frame2
	tl2.to(trailerContainer, 0.25, {autoAlpha:1}, "-=0.25");		// Show trailerContainer
	tl2.to(trailer, 0.25, {autoAlpha:1}, "-=0.25");					// Show video element
	tl2.call(playTrailer);											// Run playTrailer
	tl2.to(frame1, 0, {autoAlpha:0});								// Hide frame1
	tl2.to(frame2Example, 0.25, {autoAlpha:1}, "+=0.5");			// Hide frame2Example
	tl2.to(cta, 0.25, {autoAlpha:1});								// Hide cta
}

// Exit Animation
function exit() {

	// Element initial state
	_tl.set(frame1, {autoAlpha:0});									// Hide frame1
	_tl.set(frame1Example, {autoAlpha:0});							// Hide frame1Example
	_tl.set(frame2, {autoAlpha:0});									// Hide frame2
	_tl.set(trailerContainer, {autoAlpha:0});						// Hide trailerContainer
	_tl.set(trailer, {autoAlpha:0});								// Hide trailer
	_tl.set(frame2Example, {autoAlpha:0});							// Hide frame2Example
	_tl.set(cta, {autoAlpha:0});									// Hide cta

	// Tween
	tl3.play();
	trailer.pause();
	tl3.to(frame2, 0.25, {autoAlpha:1});							// Hide frame2
	tl3.to(trailerContainer, 0.25, {autoAlpha:1}, "-=0.25");		// Hide trailerContainer
	tl3.to(trailer, 0, {autoAlpha:0});								// Hide trailer
	tl3.to(frame2Example, 0.25, {autoAlpha:1}, "-=0.25");			// Hide frame2Example
	tl3.to(cta, 0.25, {autoAlpha:1}, "-=0.25");						// Hide cta
}

// playTrailer
function playTrailer() {

	Enabler.loadModule(studio.module.ModuleId.VIDEO, function() {	// Load video module
		studio.video.Reporter.attach('video', trailer);				// Enable local video metrics
		tl2.to(trailer, 0.5, {autoAlpha:1});						// Show frame 2 video element
		tl3.to(trailer, 0.5, {autoAlpha:1});						// Show farme 3 video element
		trailer.play();												// Play video
		trailer.muted = true;										// Mute video
	});

	trailer.addEventListener('ended', videoEnd, false);				// Run videoEnd when video has ended

	function videoEnd(e) {											// videoEnd function
		tl2.to(trailer, 0.5, {autoAlpha:0});						// Hide frame2 video element
		tl3.to(trailer, 0.5, {autoAlpha:0});						// Hide frame3 video element
		studio.video.Reporter.detach('trailer');					// Remove local video metrics
	}
}
document.getElementById('trailerContainer').addEventListener('click', playTrailer, false);