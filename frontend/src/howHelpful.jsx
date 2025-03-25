import HelpCard from "./helpCard";
// import './howHelpful.css';
import book from "./assets/book.png";
import feedback from "./assets/feedback.svg";
import graph from "./assets/graph.svg";
import education from "./assets/education.svg";

const HowHelpful = () =>{
    return(
        <div className="p-[2rem]">
            <h2 className="text-4xl font-semibold mb-4 pb-[1rem] text-[#4A3D2A]" align="center">How helpful is this tool?</h2>
            <div className="cardContainer flex justify-evenly items-center flex-wrap">
                <HelpCard img={book} heading="Work on Real World Problems" 
                content="Practise Interview Questions from top tech companies & take your preparation to the next level"/>
                <HelpCard img={feedback} heading="Get Instant Feedback"
                content="Analyse your performance with personalised feedback that will help evaluate your strength and weaknesses"/>
                <HelpCard img={graph} heading="Overcome Your Shortcomings" content="Stay on track always as we will help you highlight your pain points & prepare you for the real-world"/>
                <HelpCard img ={education} heading="Be a Fast Learner" content="Prepare with a structured, comprehensive & guided approach towards learning and expertise from the industry"/>
            </div>
        </div>
    )
}

export default HowHelpful;