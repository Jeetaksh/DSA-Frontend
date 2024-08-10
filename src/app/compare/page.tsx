"use client";

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { AnimatedCircularProgressBarDemo } from '@/webcomponents/User/CircularProgress';

const Page = () => {
  const { user } = useUser();
  const [solved, setSolved] = useState<any>(localStorage.getItem("totalQuestion")||9); // Example solved questions
  const [total, setTotal] = useState(1225); // Example total questions
  const [comparedEmails, setComparedEmails] = useState<string>(""); // Comma-separated emails
  const [comparedUsers, setComparedUsers] = useState<any[]>([]); // List of compared users
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Error state

  const handleCompare = async () => {
    const emails = comparedEmails.split(',').map(email => email.trim()).filter(email => email);
    if (emails.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const userPromises = emails.map(async (email) => {
        const response = await fetch(`https://dsa-backend-lr95.onrender.com/users/${email}/solved-questions`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch compared user data');
        }

        return data;
      });

      const users = await Promise.all(userPromises);
      setComparedUsers(users);
    } catch (error) {
      console.error('Error fetching compared user data:', error);
      setError('Error fetching compared user data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-16 px-4 md:px-0">
      <div className="flex flex-col md:flex-row md:justify-evenly w-full mb-8">
        <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg mb-8 md:mb-0 md:mr-4 gap-5">
          <h1 className='text-3xl mb-2'>
            Your Profile
          </h1>
          <div className="text-xl font-semibold">{user.fullName}</div>
          <div className="text-sm text-gray-400">{user.emailAddresses[0]?.emailAddress}</div>
          <div className="flex justify-center w-full mb-8">
            <AnimatedCircularProgressBarDemo 
              size={200} 
              solved={solved} 
              total={total} 
              strokeWidth={10}
            />
          </div>
        </div>

        <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg mb-8 md:ml-4 gap-5 w-full md:w-1/2">
          <h1 className='text-3xl mb-2'>
            Compare Profiles
          </h1>
          <input
            type="text"
            value={comparedEmails}
            onChange={(e) => setComparedEmails(e.target.value)}
            placeholder="Enter emails to compare (comma-separated)"
            className="mb-4 p-2 rounded border border-gray-600 bg-gray-900 text-white w-full"
          />
          <button
            onClick={handleCompare}
            className={`bg-blue-500 text-white py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''} w-full`}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Compare'}
          </button>
          {error && (
            <div className="mt-4 text-red-500">
              {error}
            </div>
          )}
          <div className="mt-4 w-full">
            {comparedUsers.length === 0 ? (
              <div className="text-gray-400 text-center">No profiles to display</div>
            ) : (
              comparedUsers.map((user, index) => (
                <div key={index} className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-lg mb-8 gap-5">
                  <div className="text-xl font-semibold">{user.name}</div>
                  <div className="text-sm text-gray-400">{user.email}</div>
                  <div className="flex justify-center w-full mb-8">
                    <AnimatedCircularProgressBarDemo 
                      size={200} 
                      solved={user.totalSolvedQuestions} 
                      total={total} 
                      strokeWidth={10}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
