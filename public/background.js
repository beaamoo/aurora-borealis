// background.js

// This function could be triggered by a message from your popup or content script
function toggleMusicVisualization(tabId, shouldVisualize) {
    if (shouldVisualize) {
        console.log("Starting music visualization for tab:", tabId);
        // Logic to start music visualization
    } else {
        console.log("Stopping music visualization for tab:", tabId);
        // Logic to stop music visualization
    }
}

// Listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === "toggleVisualization") {
            toggleMusicVisualization(sender.tab.id, request.shouldVisualize);
            sendResponse({status: 'Visualization toggled'});
        }
    }
);

// Add any additional background tasks or event listeners here
