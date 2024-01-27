import React, { useState } from 'react';
import './App.css';

// Assuming Visualizer is a component you've created for handling the visualization
import Visualizer from './Visualizer';

function App() {
    const [isVisualizing, setIsVisualizing] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleVisualizeClick = () => {
        setIsVisualizing(!isVisualizing);
    };

    const handleFullScreenClick = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullScreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullScreen(false);
            }
        }
    };

    return (
        <div className="App">
            <div className="visualizer-container">
                {/* Pass isVisualizing state to Visualizer component to start/stop visualization */}
                <Visualizer active={isVisualizing} />
            </div>
            <button className="button" onClick={handleVisualizeClick}>
                {isVisualizing ? 'Stop Visualizing' : 'Start Visualizing'}
            </button>
            <button className="fullscreen-toggle" onClick={handleFullScreenClick}>
                {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
            </button>
        </div>
    );
}

export default App;
