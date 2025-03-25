import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faClipboardCheck, faFileLines, faChartLine } from '@fortawesome/free-solid-svg-icons';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const GetSetUpskill = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const stepsRef = useRef([]);

    const steps = [
        { icon: faRightToBracket, text: "Register for the Test" },
        { icon: faClipboardCheck, text: "Give the Assessment" },
        { icon: faFileLines, text: "Get Personalised Reports" },
        { icon: faChartLine, text: "Get a Learning Path" }
    ];

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
            }
        });

        // Set initial states
        gsap.set(titleRef.current, { opacity: 0, y: -50 });
        stepsRef.current.forEach((step) => {
            gsap.set(step, { opacity: 0, x: -50 });
        });
        document.querySelectorAll('.connector-line').forEach(line => {
            gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
        });

        // Animate title
        // Title animation - currently 0.6 seconds
        tl.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.4,    // Increase for slower title animation, decrease for faster
            ease: "power3.out"
        });

        // Animate each step and its connector line sequentially
        stepsRef.current.forEach((step, index) => {
            // Step animation - currently 0.5 seconds
            tl.to(step, {
                opacity: 1,
                x: 0,
                duration: 0.35,    // Increase for slower step animation, decrease for faster
                ease: "power3.out"
            });

            // Connector line animation - currently 0.4 seconds
            if (index < stepsRef.current.length - 1) {
                tl.to(step.querySelector('.connector-line'), {
                    scaleX: 1,
                    duration: 0.3,    // Increase for slower line animation, decrease for faster
                    ease: "none"
                }, "-=0.2");          // Overlap timing - adjust for more/less overlap with previous animation
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 ref={titleRef} className="text-4xl font-bold text-center mb-16 text-[#4A3D2A]">
                    Get! Set! Upskill!
                </h2>

                <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-8 relative max-w-7xl mx-auto">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center relative w-full md:w-auto px-4" 
                             ref={el => stepsRef.current[index] = el}>
                            <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mb-4">
                                <FontAwesomeIcon 
                                    icon={step.icon} 
                                    className="text-3xl text-[#16A085]"
                                />
                            </div>
                            <p className="text-center font-medium text-gray-700 max-w-[120px] text-sm">
                                {step.text}
                            </p>
                            {index < steps.length - 1 && (
                                <div 
                                    className="connector-line hidden md:block absolute top-10 -right-1/2 bg-[#16A085]" 
                                    style={{
                                        height: '2px',
                                        width: '100%',
                                        transform: 'translateY(-50%)',
                                        zIndex: -1
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default GetSetUpskill;