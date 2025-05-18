 Interview Buddy

 System Workflow
Step-by-Step Guide to Run the Project

 HOW TO RUN:

 1. Prerequisites:
Ensure that you have the following installed on your system:
- Node.js and npm: Node.js is required to run the backend server and manage dependencies. npm (Node Package Manager) comes with Node.js and is used to install project dependencies.
- MongoDB: A MongoDB instance should be set up and running. You can use a local MongoDB installation or a cloud-based MongoDB service like MongoDB Atlas.

 2. Clone the Repository
Open a terminal or command prompt.
Navigate to the directory where you want to clone the project.
Clone the repository using Git:
bash
git clone https://github.com/Abhinav29singh05/InterviewBuddy

Navigate into the project directory:
bash
cd Interview Buddy


 3. Set Up Environment Variables
Create a `.env` file in the root of the backend directory.
Add the necessary environment variables to the `.env` file. Example:

MONGODB_URI=mongodb+srv://ProdMang:Product123@atlascluster.mrgi2.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster
SERVER_PORT=5000
CORS_ORIGIN=http://localhost:3000


 4. Install Dependencies
Navigate to the backend directory:
bash
cd backend

Install backend dependencies using:
bash
npm install

Navigate to the frontend directory:
bash
cd ../frontend

Install frontend dependencies using:
bash
npm install


 5. Start the Backend Server
Navigate to the backend directory (if not already there):
bash
cd backend

Start the server using Nodemon:
bash
node server.js

This command will start the backend server and automatically restart it upon detecting changes in the source code.

 6. Start the Frontend Application
Navigate to the frontend directory (if not already there):
bash
cd ../frontend

Start the React development server:
bash
npm run dev

This will start the frontend development server, typically accessible at http://localhost:5173.

 7. Access the Application
Open a web browser.
Navigate to the frontend URL, usually http://localhost:5173.
You should see the Interview Buddy Application running and ready for use.

 Error Handling:
If you encounter any issues, check the terminal for error messages and ensure that all environment variables are correctly configured.

Website link--https://interview-buddy-frontend.vercel.app/
