// Remarketing Pixels
var loadPixel = function(url) {
	
	// Create a new image element.
	var imageElement = document.createElement('img');

	// Add the image to the DOM.
	document.body.appendChild(imageElement);

	// Set the src attribute of the image.
	imageElement.src = url;
	imageElement.style.borderStyle = 'none';
	imageElement.height = 1;
	imageElement.width = 1;
	imageElement.alt = '';
};

// The pixel URL to be loaded on exit. Replace with your corrected pixel URL:
var pixelUrlExit = '//googleads.g.doubleclick.net/pagead/viewthroughconversion/931677505/?value=1.00&currency_code=GBP&label=arcfCN-xqWoQwYqhvAM&guid=ON&script=0';

// The pixel URL to be loaded on impression.
var pixelUrlImpression = '//googleads.g.doubleclick.net/pagead/viewthroughconversion/931677505/?value=1.00&currency_code=GBP&label=STe2CIGnrWoQwYqhvAM&guid=ON&script=0';

// A Boolean flag to ensure the exit pixel loads only once per impression.
var exitPixelWasLoaded = false;

// Exit pixel will load only once.
var exitHandler = function() {
	if (!exitPixelWasLoaded) {
		loadPixel(pixelUrlExit);
		exitPixelWasLoaded = true;
	}
};

// Register for the EXIT event from Studio.
Enabler.addEventListener(studio.events.StudioEvent.EXIT, exitHandler);

// Load the impression pixel.
loadPixel(pixelUrlImpression);