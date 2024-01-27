import React, { useRef, useEffect } from 'react';

const Visualizer = ({ active }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let animationFrameId;

        // Visualization setup code here
        const renderFrame = () => {
            // Clear the canvas
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Visualization drawing code here
            if (active) {
                // Draw something different when the visualization is active
            } else {
                // Draw idle state visualization
            }

            // Loop the animation
            animationFrameId = window.requestAnimationFrame(renderFrame);
        };

        // Start the animation loop
        renderFrame();

        // Cleanup function to cancel the animation frame
        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [active]);

    return <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />;
};

export default Visualizer;
