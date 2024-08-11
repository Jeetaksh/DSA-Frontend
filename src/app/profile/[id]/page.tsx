"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { AnimatedCircularProgressBarDemo } from '@/webcomponents/User/CircularProgress';
import IndQuestion from '@/webcomponents/Questions/IndQuestion';

const Page = () => {
  const { user } = useUser();
  const [solved, setSolved] = useState(0);
  const [total, setTotal] = useState(1225);
  const [solvedQuestions, setSolvedQuestions] = useState<any[]>([]);
  const [revisionQuestions, setRevisionQuestions] = useState<any[]>([]);

  function checkUserTimestamp() {
    const currentTime = Date.now();
    const userItem = localStorage.getItem("user");
    
    if (userItem) {
      const { timestamp } = JSON.parse(userItem);
      if (currentTime - timestamp < 60000) {
        return true;
      } else {
        localStorage.setItem("user", JSON.stringify({ message: "userCreated succ", timestamp: currentTime }));
        return false;
      }
    } else {
      localStorage.setItem("user", JSON.stringify({ message: "userCreated succ", timestamp: currentTime }));
      return false;
    }
  }
  
  useEffect(() => {
    const createUser = async () => {
      if (user) {
        if (checkUserTimestamp()) {
          return;
        }

        try {
          const response = await fetch('https://dsa-backend-lr95.onrender.com/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: user.fullName,
              email: user.emailAddresses[0]?.emailAddress,
              clerkUserId: user.id
            }),
          });

          if (!response.ok) {
            throw new Error('User creation failed');
          }

          const data = await response.json();
          console.log('User created:', data);
        } catch (error) {
          console.error('Error creating user:', error);
        }
      }
    };

    createUser();
  }, [user]);

  useEffect(() => {
    const fetchSolvedQuestions = async () => {
      if (user) {
        try {
          const response = await fetch(`https://dsa-backend-lr95.onrender.com/users/${user.emailAddresses[0]?.emailAddress}/solved-questions/details`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch solved questions');
          }
          
          const data = await response.json();
          setSolvedQuestions(data);
          setSolved(data.length);
          localStorage.setItem("totalQuestion", data.length);
        } catch (error) {
          console.error('Error fetching solved questions:', error);
        }
      }
    };

    fetchSolvedQuestions();
  }, [user]);

  useEffect(() => {
    const fetchRevisionQuestions = async () => {
      if (user) {
        try {
          const response = await fetch(`https://dsa-backend-lr95.onrender.com/revision-questions/${user.emailAddresses[0]?.emailAddress}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch revision questions');
          }
          
          const data = await response.json();
          setRevisionQuestions(data);
        } catch (error) {
          console.error('Error fetching revision questions:', error);
        }
      }
    };

    fetchRevisionQuestions();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-16 px-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 flex flex-col items-center w-full max-w-md">
        <img 
          src={user.imageUrl} 
          alt={`${user.firstName} ${user.lastName}`} 
          className="w-32 h-32 rounded-full shadow-md mb-4"
        />
        <div className="text-2xl font-bold">{user.fullName}</div>
        <div className="text-sm text-gray-400">{user.emailAddresses[0]?.emailAddress}</div>
      </div>
      
      <div className="flex justify-center w-full max-w-lg mb-8">
        <AnimatedCircularProgressBarDemo 
          size={200} 
          solved={solved} 
          total={total} 
          strokeWidth={10}
        />
      </div>

      <div className="w-full max-w-5xl">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h1 className="text-2xl font-semibold mb-4 text-center">Solved Questions</h1>
          {solvedQuestions.length === 0 ? (
            <p className="text-lg text-gray-400 text-center">No questions have been solved yet.</p>
          ) : (
            <div className='gap-4 flex flex-row flex-wrap'>
              {solvedQuestions.map((question) => (
                <IndQuestion 
                  isProfile={true}
                  key={question.id}
                  name={question.name}
                  link={question.link}
                  id={question.id}
                />
              ))}
            </div>
          )}
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h1 className="text-2xl font-semibold mb-4 text-center">Revision Questions</h1>
          {revisionQuestions.length === 0 ? (
            <p className="text-lg text-gray-400 text-center">No revision questions yet.</p>
          ) : (
            <div className="flex flex-row flex-wrap items-center justify-evenly gap-4">
              {revisionQuestions.map((question) => (
                <IndQuestion 
                  isProfile={true}
                  key={question.id}
                  name={question.question.name}
                  link={question.question.link}
                  id={question.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
