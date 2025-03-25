import magzine from "./assets/magzine.png"
import Button from "./button"
import { useNavigate } from "react-router-dom"

const firstStep = () => {
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
        <div className="flex justify-center items-center flex-wrap py-[7rem] px-[]">
            <div>
                <h3 className="text-5xl font-semibold max-w-2xl mb-4 pb-[1rem] text-[#4A3D2A]">Take the first step towards your dream job</h3>
                <p className="text-lg max-w-[35rem] text-[#4A3D2A]">Join our platform for free today. With our freemium plan, you can start practicing and improving your skills immediately.</p>
                <Button children={"Give your First Interview"} 
                onClick={scrollToJobDescription}
                className={"mt-4 rounded-lg"}/>
            </div>
            <div>
                <img src={magzine} alt="magzine" className="w-[35rem] h-[25rem] ml-[-2rem] shadow-xl shadow-black/35 rounded-lg" />
            </div>
        </div>

    );
}
export default firstStep