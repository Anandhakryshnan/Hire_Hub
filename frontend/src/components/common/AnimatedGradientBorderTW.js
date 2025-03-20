import React, { useEffect, useRef } from 'react';

const AnimatedGradientBorderTW = ({ children }) => {
    const boxRef = useRef(null);
  
    useEffect(() => {
        const boxElement = boxRef.current;
    
        if (!boxElement) return;
    
        const updateAnimation = () => {
            const angle = (parseFloat(boxElement.style.getPropertyValue("--angle")) + 0.5) % 360;
            boxElement.style.setProperty("--angle", `${angle}deg`);
            requestAnimationFrame(updateAnimation);
        };
    
        requestAnimationFrame(updateAnimation);
    }, []);
  
    return (
        <div
        style={{
            "--angle": "0deg",
            "--border-color": "linear-gradient(var(--angle), #070707, #687aff)",
            "--bg-color": "linear-gradient(#131219, #131219)",
        }}
        className="flex items-center justify-center rounded-lg border-2 border-[#0000] p-3 [background:padding-box_var(--bg-color),border-box_var(--border-color)]"
        ref={boxRef}>
            {children}
        </div>
    );
};


export default AnimatedGradientBorderTW;