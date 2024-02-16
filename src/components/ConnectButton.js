// ConnectButton.js
import React from 'react';
import { getAudioStream, setupAudioAnalysis } from '../audio/AudioProcessor';
import useMouseActivity from '../hooks/useMouseActivity'; // Adjust path as necessary

const ConnectButton = ({ onAnalysisReady }) => {
    const isButtonVisible = useMouseActivity(2000);

    const handleConnect = async () => {
        try {
            const stream = await getAudioStream();
            const analyser = setupAudioAnalysis(stream);
            onAnalysisReady(analyser);
        } catch (error) {
            console.error('Error connecting to audio:', error);
        }
    };

    // Use inline styling or className to toggle visibility
    const buttonStyle = {
        opacity: isButtonVisible ? 1 : 0,
        visibility: isButtonVisible ? 'visible' : 'hidden',
        transition: 'opacity 0.5s ease, visibility 0.5s ease',
    };

    return (
        <button className="connect-button" style={buttonStyle} onClick={handleConnect}>
            Connect to Audio
        </button>
    );
};

export default ConnectButton;
