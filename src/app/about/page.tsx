"use client" 
import React from 'react';
import { FaLinkedin } from 'react-icons/fa'; 
const DeveloperPage = ()=> {
  return (
     <div className="bg-black min-h-screen flex flex-col items-center text-white">
      <section className="  mt-10 align-middle justify-center py-8 px-4  rounded-lg ">
        <h2 className="text-3xl  font-semibold text-yellow-400">Unlock Your Coding Potential</h2>  
         <p className="text-lg text-gray-300 mt-4">
           100-Day DSA Mastery: Follow our structured day-wise plan to master data structures and algorithms in just 100 days.
        </p>

        <p className="text-lg text-gray-300 mt-2">
          Top Company Questions: Access top SQL and interview questions from leading tech companies.
        </p>

        <p className="text-lg text-gray-300 mt-2">
          Track Your Progress: Mark problems as solved, schedule revisions, and add notes with our intuitive UI.
        </p>
        <p className="text-lg text-gray-300 mt-2">
          Efficient Search: Find questions quickly with our keyword search functionality.
        </p>
      </section>
      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Meet Our Developers</h1>

      </header>
      
      {/* Developers Section */}
      <main className="flex flex-wrap justify-center gap-8 p-8">
        <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg max-w-xs">
          <img
            src="https://media.licdn.com/dms/image/D5603AQEEFRrkCm2i4w/profile-displayphoto-shrink_200_200/0/1720115222864?e=1728518400&v=beta&t=MmNRx1T9U3a-W0VUfgRuriJOo8QiHh5vu9VSrczEPxs"
            alt="Jeetaksh Gandhi"
            className="w-32 h-32 rounded-full mb-4 border-4 border-purple-500"
          />
          <h2 className="text-xl font-semibold">Jeetaksh Gandhi</h2>
          <p className="text-gray-400 mt-2">Full Stack Developer</p>
          <p className="text-gray-300 mt-2 text-center">
            Focused on solving technical challenges and creating efficient software solutions.
          </p>
          <a
            href="https://www.linkedin.com/in/jeetaksh/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-blue-500 hover:text-blue-400"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
        <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg max-w-xs">
          <img
            src="https://media.licdn.com/dms/image/v2/D4D35AQGa_N9tJ2kYiw/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1698174262688?e=1724778000&v=beta&t=BzYESW3MKWzn5PW12_mko1lYv2zr-TAgvC2oxnYpuKY"
            alt="Vishal Aggarwal"
            className="w-32 h-32 rounded-full mb-4 border-4 border-blue-500"
          />
          <h2 className="text-xl font-semibold">Vishal Aggarwal</h2>
          <p className="text-gray-400 mt-2">Full Stack Developer</p>
          <p className="text-gray-300 mt-2 text-center">
            Dedicated to building reliable software and enhancing user experiences.
          </p>
          <a
            href="https://www.linkedin.com/in/vishal-aggarwal-414730248/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-blue-500 hover:text-blue-400"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </main>

       {/* Coding Potential Section */}
    
    </div>
  );
};

export default  DeveloperPage;