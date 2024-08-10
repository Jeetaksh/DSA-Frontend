"use client";
import React from 'react';
import { FaLinkedin } from 'react-icons/fa'; // Import LinkedIn icon

const DeveloperPage = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center text-white">
      <header className="py-8">
        <h1 className="text-4xl font-bold">Meet Our Developers</h1>
      </header>
      <main className="flex flex-wrap justify-center gap-8 p-8">
        <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg max-w-xs">
          <img
            src="https://media.licdn.com/dms/image/D5603AQEEFRrkCm2i4w/profile-displayphoto-shrink_200_200/0/1720115222864?e=1728518400&v=beta&t=MmNRx1T9U3a-W0VUfgRuriJOo8QiHh5vu9VSrczEPxs"
            alt="Jeetaksh Gandhi"
            className="w-32 h-32 rounded-full mb-4 border-4 border-purple-500"
          />
          <h2 className="text-xl font-semibold">Jeetaksh Gandhi</h2>
          <p className="text-gray-400 mt-2">Full Stack Developer</p>
          <p className="text-gray-300 mt-2">
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
            src="https://media.licdn.com/dms/image/D4D35AQGa_N9tJ2kYiw/profile-framedphoto-shrink_200_200/0/1698174262688?e=1723359600&v=beta&t=AS8VqbfSSwwFVuMV5QqT20sIqMCnXwGzU4NvRypMzvE"
            alt="Vishal Aggarwal"
            className="w-32 h-32 rounded-full mb-4 border-4 border-blue-500"
          />
          <h2 className="text-xl font-semibold">Vishal Aggarwal</h2>
          <p className="text-gray-400 mt-2">Full Stack Developer</p>
          <p className="text-gray-300 mt-2">
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
      <footer className="py-4">
        <p className="text-gray-500">© 2024 Your Company</p>
      </footer>
    </div>
  );
};

export default DeveloperPage;
