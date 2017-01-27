
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