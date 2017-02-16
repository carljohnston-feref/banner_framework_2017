
// Engages Strict Mode for faster performance
"use strict";

// Get element by ID shortcut
var el = function(e){
	return document.getElementById(e);
}

// DoubleClick specific scripts
window.onload = function() {
	
	if (Enabler.isInitialized()) {															// If Enabler has loaded
		init();																				// Fire Initializer
	} else {
		Enabler.addEventListener(studio.events.StudioEvent.INIT, init);						// Wait for Enabler event
	}

	function init() {																		// Initialiser Event
		if (Enabler.isPageLoaded()) {														// If page has loaded
			politeInit();																	// Run polite load
		} else {
			Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, politeInit);	// Wait for page load
		}
	}

	// Polite load event
	function politeInit() {
		el('loading').style.opacity = 0;
		// document.getElementById("frame1").style.opacity = 1;
		anim();
	}
}

// Log release dates in console
var logDateSwitch = true;

// dateSwitch
var dateSwitch = function(releaseDate, preRelease) {			// Define "dateSwitch" function

	var today = new Date();										// Store todays date in full
	var releaseDate = new Date(releaseDate);					// Set releaseDate
	if(preRelease) var preRelease = new Date(preRelease);		// If today is within "preRelease" store todays date as n
	today.getFullYear();										// Get current year

	// Date format for console log
	var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var logToday = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + today.getDate() + " [" + days[today.getDay()] + "]";
	var logPreRelease = preRelease.getFullYear() + "-" + ("0" + (preRelease.getMonth() + 1)).slice(-2) + "-" + preRelease.getDate() + " [" + days[preRelease.getDay()] + "]";
	var logRelease = releaseDate.getFullYear() + "-" + ("0" + (releaseDate.getMonth() + 1)).slice(-2) + "-" + releaseDate.getDate() + " [" + days[releaseDate.getDay()] + "]";
	
	// Log date switch dates
	if (logDateSwitch == true) {
		console.log(
			" // -- Release Dates -- //", "\n",
			"Todays Date:      ", logToday, "\n",
			"Pre Release Date: ", logPreRelease, "\n",
			"Release Date:     ", logRelease
			||
			"Not set"
		);
	}

	if(preRelease) {																	// If "preRelease" is defined

		if(releaseDate < preRelease) {													// If "releaseDate" is before "preRelease"
			throw new Error("releaseDate is before preRelease. Reverse their order");	// Throw error message
		}
		if(today < preRelease) {														// If today is before "preRelease"
			return "Release 1";															// Return "Release 1"
		}
		if(today < releaseDate) {														// If today is after "preRelease" and before "releaseDate"
			return "Release 2";															// Return "Release 2"
		}
	}

	if( today < releaseDate ) {															// If today is before "releaseDate"
		return "Release 3";																// Return "Release 3"
	} else {																			// If today is after "releasDate"
		return "Release 4";																// Return "Release 4"
	}
}

// Set Date Variables
var date = dateSwitch(
	"2016-04-29", 																	// releaseDate
	"2016-04-28"																	// preRelease
);
var ctaRelease = el('frame4CtaRelease');

// Switch Statement
switch (date) {

	case "Release 1":																// Release 1
		ctaRelease.innerHTML = 'Release 1';
		break;

	case "Release 2": 																// Release 2
		ctaRelease.innerHTML = 'Release 2';
		break;

	case "Release 3": 																// Release 3
		ctaRelease.innerHTML = 'Release 3';
		break;

	case "Release 4": 																// Release 4
		ctaRelease.innerHTML = 'Release 4';
		break;

	default:
		// Do nothing
}

// Timelines
var _tl = new TimelineLite();						// Timeline for element initial state
var tl = new TimelineLite({paused:true});			// Frame 1 timeline

// Frame 1 Animation
function anim() {

	// Call Animation Sequence
	tl.totalDuration(30);
	tl.play();
	tl.call(anim1);

	// Define Animation Sequence
	function anim1(){
		Enabler.loadModule(studio.module.ModuleId.VIDEO, function() {
			studio.video.Reporter.attach('frame1Video', frame1Video);
			frame1Video.muted = true;
			frame1Video.play();
		});
		tl.to(frame1, 0.5, {autoAlpha:1, zIndex:1});

		function videoEnd() {
			studio.video.Reporter.detach('frame1Video');
			tl.play();
			frame1Video.pause();
			tl.call(anim2);
		}
		el('frame1Video').addEventListener('ended', videoEnd);
		el('frame1Video').addEventListener('click', videoEnd);
	}

	function anim2() {
		_tl.set(['.frame3Quote#quote1', '.frame3Quote#quote2', '.frame3Quote#quote3', '.frame3Reference#reference1', '.frame3Reference#reference2', '.frame3Reference#reference3', '#frame4Logo', '#frame4Title', '#frame4Release', '#frame4Cta'], {autoAlpha:0});

		tl.to('#frame1', 0.5, {autoAlpha:0, zIndex:0})

		  // Frame 2
		  .from('#frame2', 0, {autoAlpha:0})
		  .to('#frame2', 1, {autoAlpha:1, zIndex:1})
		  .to('#frame2', 1, {autoAlpha:0, zIndex:0, delay:2})

		  // Frame 3 Fade
		  .from('#frame3', 0, {autoAlpha:0, zIndex:0})
		  .to('#frame3', 1, {autoAlpha:1, zIndex:1})

		  // Frame 3 (Review 1)
		  .to('.frame3Quote#quote1', 1.5, {autoAlpha:1, ease: Power2.easeOut}, "-=0.5")
		  .to('.frame3Reference#reference1', 1.5, {autoAlpha:1, ease: Power2.easeOut}, "-=1.25")

		  // Frame 3 (Review 2)
		  .to('.frame3Quote#quote2', 1.5, {autoAlpha:1, ease: Power2.easeOut}, "-=1.25")
		  .to('.frame3Reference#reference2', 1.5, {autoAlpha:1, ease: Power2.easeOut}, "-=1.25")

		  // Frame 3 (Review 3)
		  .to('.frame3Quote#quote3', 1.5, {autoAlpha:1, ease: Power2.easeOut}, "-=1.25")
		  .to('.frame3Reference#reference3', 1.5, {autoAlpha:1, ease: Power2.easeOut}, "-=1.25")

		  // Frame 3 Fade
		  .to('#frame3', 1, {autoAlpha:0, zIndex:0, delay:2})

		  // Frame 4 Fade
		  .from('#frame4', 0, {autoAlpha:0, zIndex:0})
		  .to('#frame4', 1, {autoAlpha:1, zIndex:1})

		  // Frame 4 Animations
		  .to('#frame4Logo', 1.5, {autoAlpha:1})
		  .to('#frame4Title', 1.5, {autoAlpha:1}, "-=1.25")
		  .to('#frame4Release', 1.5, {autoAlpha:1}, "-=1.25")
		  .to('#frame4Cta', 1.5, {autoAlpha:1}, "-=1.25");
	}
}

// Main Exit
function mainExit(event) {
	Enabler.exit('Main Exit');	
	tl.totalProgress(1);
}

// ctaExit
function ctaExit(event) {
	Enabler.exit('CTA Exit');
}

// Listen for exits
el('frame4Cta').addEventListener('click', ctaExit);