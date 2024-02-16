// useMouseActivity.js
import { useState, useEffect } from 'react';

const useMouseActivity = (delay = 2000) => {
    const [isButtonVisible, setIsButtonVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = () => {
            setIsButtonVisible(true);
            clearTimeout(window.mouseMoveTimeout);
            window.mouseMoveTimeout = setTimeout(() => setIsButtonVisible(false), delay);
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(window.mouseMoveTimeout);
        };
    }, [delay]);

    return isButtonVisible;
};

export default useMouseActivity;
