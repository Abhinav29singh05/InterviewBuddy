import magzine from "./assets/magzine.png"
import Button from "./button.jsx"
import { useNavigate } from "react-router-dom"

const FirstStep = () => {
    const navigate = useNavigate();
    const scrollToJobDescription = () => {
        // Find the job description element
        const jobDescriptionElement = document.getElementById('job-description-section');
        if (jobDescriptionElement) {
            // Smooth scroll to the element
            jobDescriptionElement.scrollIntoView({ behavior: 'smooth' });
            
            // Add a highlight effect
            jobDescriptionElement.classList.add('highlight-section');
            
            // Remove the highlight effect after animation completes
            setTimeout(() => {
                jobDescriptionElement.classList.remove('highlight-section');
            }, 1500);
        }
    };
    return (
        <div className="w-full px-4 sm:px-6 py-12 sm:py-16 lg:py-20 ">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 ">
                <div className="w-full md:w-1/2 text-center md:text-left ">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6 text-[#4A3D2A]">
                        Take the first step towards your dream job
                    </h3>
                    <p className="text-base sm:text-lg text-[#4A3D2A] mb-6 sm:mb-8">
                        Join our platform for free today. With our freemium plan, you can start practicing and improving your skills immediately.
                    </p>
                    <Button 
                        onClick={scrollToJobDescription}
                        className="text-base sm:text-lg font-medium rounded-lg"
                    >
                        Give your First Interview
                    </Button>
                </div>
                <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
                    <img 
                        src={magzine} 
                        alt="Magazine" 
                        className="w-full max-w-[400px] lg:max-w-[500px] h-auto rounded-lg shadow-lg" 
                    />
                </div>
            </div>
        </div>
    );
}

export default FirstStep
