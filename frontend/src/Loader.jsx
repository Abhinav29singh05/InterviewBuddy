import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import animationData from "./assets/Loader.json";

const Loader = () => {
    const container = useRef(null);
    const [animationLoaded, setAnimationLoaded] = useState(false);

    useEffect(() => {
        if (container.current) {
            try {
                const anim = lottie.loadAnimation({
                    container: container.current,
                    renderer: "svg",
                    loop: true,
                    autoplay: true,
                    animationData: animationData,
                });
                
                // Set animation as loaded once it's initialized
                anim.addEventListener('DOMLoaded', () => {
                    setAnimationLoaded(true);
                });
                
                return () => {
                    anim.removeEventListener('DOMLoaded', () => {});
                    anim.destroy();
                };
            } catch (error) {
                console.error("Error loading animation:", error);
            }
        }
    }, [container]);

    return(
        <div className="fixed top-0 left-0 w-full h-screen bg-white flex items-center justify-center z-[9999]">
            <div className={`w-80 h-80 flex items-center justify-center ${!animationLoaded ? 'animate-pulse' : ''}`}>
                <div ref={container} className="w-full h-full" />
                {!animationLoaded && (
                    <div className="absolute">Loading...</div>
                )}
            </div>
        </div>
    );
}

export default Loader;