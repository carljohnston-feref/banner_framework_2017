
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