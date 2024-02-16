import Meyda from 'meyda';

let audioContext, source, meydaAnalyzer;

async function getAudioStream() {
    try {
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        return audioStream;
    } catch (err) {
        console.error('Error accessing the microphone:', err);
    }
}

function setupAudioAnalysis(audioStream) {
    audioContext = new AudioContext();
    source = audioContext.createMediaStreamSource(audioStream);

    meydaAnalyzer = Meyda.createMeydaAnalyzer({
        audioContext: audioContext,
        source: source,
        bufferSize: 512, // Size of the FFT, affects frequency granularity
        featureExtractors: ['energy', 'spectralSlope', 'beat'], // Specify the features you need
        callback: (features) => {
            // Process features to detect beats or other characteristics
            console.log(features);
            // You can use 'features.energy' or other features for visualization or further analysis
        }
    });

    meydaAnalyzer.start();
}

function analyzeRhythm() {
    // The analysis is now handled by Meyda in real-time through the callback provided in setupAudioAnalysis
    // You might use this function to trigger or stop the analysis, or adjust parameters dynamically
}

export { getAudioStream, setupAudioAnalysis, analyzeRhythm };
