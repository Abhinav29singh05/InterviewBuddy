import React from "react";
import Navbar from "../navbar";
import Footer from "../footer";

const JobRoles = () => {
  // Array of popular job roles with descriptions
  const popularRoles = [
    {
      id: 1,
      title: "Software Engineer",
      description: "Designs, develops, and maintains software systems and applications. Requires proficiency in programming languages like JavaScript, Python, Java, or C++.",
      skills: ["Problem-solving", "Programming", "Data structures", "Algorithms", "Software design patterns"]
    },
    {
      id: 2,
      title: "Data Scientist",
      description: "Analyzes and interprets complex data to help organizations make better decisions. Combines statistics, mathematics, and programming skills.",
      skills: ["Statistical analysis", "Machine learning", "Python/R", "Data visualization", "SQL"]
    },
    {
      id: 3,
      title: "Product Manager",
      description: "Oversees product development from conception to launch. Bridges technical and business aspects to create successful products.",
      skills: ["Strategic thinking", "User experience", "Project management", "Market research", "Communication"]
    },
    {
      id: 4,
      title: "UX/UI Designer",
      description: "Creates intuitive, accessible, and visually appealing interfaces for websites and applications to enhance user experience.",
      skills: ["User research", "Wireframing", "Prototyping", "Visual design", "User testing"]
    },
    {
      id: 5,
      title: "DevOps Engineer",
      description: "Combines development and IT operations to shorten development cycles and ensure continuous delivery with high quality.",
      skills: ["Cloud platforms", "CI/CD", "Containerization", "Infrastructure as code", "Monitoring tools"]
    },
    {
      id: 6,
      title: "Frontend Developer",
      description: "Implements visual elements that users interact with in a web application. Specializes in HTML, CSS, and JavaScript frameworks.",
      skills: ["HTML/CSS", "JavaScript/TypeScript", "React/Angular/Vue", "Responsive design", "Web accessibility"]
    },
    {
      id: 7,
      title: "Backend Developer",
      description: "Builds and maintains the server-side of web applications, focusing on databases, APIs, and server logic.",
      skills: ["Server-side languages", "Database management", "API development", "Authentication", "Performance optimization"]
    },
    {
      id: 8,
      title: "Machine Learning Engineer",
      description: "Develops AI systems that can learn and improve from experience without being explicitly programmed.",
      skills: ["Deep learning", "Neural networks", "Natural language processing", "Computer vision", "Model deployment"]
    }
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-3xl font-bold text-[#34495E] mb-8 text-center">Popular Job Roles in Tech</h1>
        <p className="text-[#34495E] mb-10 text-center max-w-3xl mx-auto">
          Prepare for your interviews with our comprehensive guide to in-demand tech roles. 
          Learn about key responsibilities and essential skills to highlight in your next interview.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {popularRoles.map((role) => (
            <div key={role.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-[#34495E] p-4">
                <h2 className="text-xl font-bold text-white">{role.title}</h2>
              </div>
              <div className="p-6">
                <p className="text-[#34495E] mb-4">{role.description}</p>
                <h3 className="font-semibold text-[#34495E] mb-2">Key Skills:</h3>
                <div className="flex flex-wrap gap-2">
                  {role.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-100 text-[#34495E] px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-[#34495E] mb-4">
            Ready to practice for these roles? Start an interview simulation now!
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-[#34495E] hover:bg-[#2C3E50] text-white font-bold py-2 px-6 rounded transition duration-300"
          >
            Start Practicing
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JobRoles; 