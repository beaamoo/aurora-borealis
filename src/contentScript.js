// contentScript.js
(function() {
    // This function will be called when the user clicks the browser action.
    function toggleVisualization() {
        // Check if the visualization is already initialized
        const existingVisualization = document.getElementById('music-visualization');
        if (existingVisualization) {
            // If it exists, remove it or update it
            existingVisualization.remove(); // or you could hide it
        } else {
            // If it doesn't exist, create and inject the visualization into the page
            const visualizationDiv = document.createElement('div');
            visualizationDiv.id = 'music-visualization';
            visualizationDiv.textContent = 'Music Visualization Placeholder';
            visualizationDiv.style.position = 'fixed';
            visualizationDiv.style.bottom = '0';
            visualizationDiv.style.right = '0';
            visualizationDiv.style.width = '100px';
            visualizationDiv.style.height = '100px';
            visualizationDiv.style.backgroundColor = 'rgba(0,0,0,0.5)';
            visualizationDiv.style.color = 'white';
            visualizationDiv.style.zIndex = '1000';
            document.body.appendChild(visualizationDiv);

            // Add logic here to start visualizing music, such as creating a canvas
            // and drawing on it in response to the audio.
        }
    }

    // Listen for messages from the background script or popup script
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.action === "toggleVisualization") {
                toggleVisualization();
                sendResponse({status: 'Visualization toggled'});
            }
        }
    );

    // You can also directly invoke toggleVisualization here if you want to
    // automatically start the visualization when the page loads, but this
    // may not be desired behavior for all users.
})();
