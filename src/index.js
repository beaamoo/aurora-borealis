import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import ConnectButton from './components/ConnectButton';
import Visualizer from './components/Visualizer';

const App = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [audioStream, setAudioStream] = useState(null);
    const [analyser, setAnalyser] = useState(null);

    // Handler to manage the audio stream connection
    const toggleConnection = async () => {
        if (!isConnected) {
            try {
                // Request access to the audio stream from the user's microphone
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
                setAudioStream(stream);

                // Create a new AudioContext and connect the stream to the analyser
                const audioContext = new AudioContext();
                const source = audioContext.createMediaStreamSource(stream);
                const newAnalyser = audioContext.createAnalyser();
                source.connect(newAnalyser);
                setAnalyser(newAnalyser);

                // Update the connected state
                setIsConnected(true);
            } catch (err) {
                console.error('Error accessing the microphone:', err);
                // Handle the error - for example, alert the user
            }
        } else {
            // Disconnect the audio stream and reset state
            if (audioStream) {
                const tracks = audioStream.getTracks();
                tracks.forEach(track => track.stop()); // Stop each track to close the stream
            }
            setAudioStream(null);
            setAnalyser(null);
            setIsConnected(false);
        }
    };

    // Effect for cleanup on component unmount
    useEffect(() => {
        return () => {
            if (audioStream) {
                const tracks = audioStream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, [audioStream]);

    return (
        <React.StrictMode>
            <Visualizer analyser={analyser} isConnected={isConnected} />
            <ConnectButton isConnected={isConnected} toggleConnection={toggleConnection} />
        </React.StrictMode>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
