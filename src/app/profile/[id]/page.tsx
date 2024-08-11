"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { AnimatedCircularProgressBarDemo } from '@/webcomponents/User/CircularProgress';
import IndQuestion from '@/webcomponents/Questions/IndQuestion';

const Page = () => {
  const { user } = useUser();
  const [solved, setSolved] = useState(0); // Example solved questions
  const [total, setTotal] = useState(1225); // Example total questions
  const [solvedQuestions, setSolvedQuestions] = useState<any[]>([]);
  const [revisionQuestions, setRevisionQuestions] = useState<any[]>([]);

  function checkUserTimestamp() {
    const currentTime = Date.now();
    const userItem = localStorage.getItem("user");
    
    if (userItem) {
      const { timestamp } = JSON.parse(userItem);
  
      // Check if the user item was created within the last minute (60000 milliseconds)
      if (currentTime - timestamp < 60000) {
        return true;
      } else {
        localStorage.setItem("user", JSON.stringify({ message: "userCreated succ", timestamp: currentTime }));
        return false;
      }
    } else {
      // If no user item exists, create it with the current timestamp

      localStorage.setItem("user", JSON.stringify({ message: "userCreated succ", timestamp: currentTime }));
      return false;
    }
  }
  
  useEffect(() => {
    const createUser = async () => {
      if (user) {

        if(checkUserTimestamp()){
          return ;
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
              clerkUserId:user.id
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
          console.log("******");
          console.log(data);
          setSolvedQuestions(data);
          setSolved(data.length); // Update the solved count based on the fetched data
          localStorage.setItem("totalQuestion",data.length);
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
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-16">
      <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <img 
          src={user.imageUrl} 
          alt={`${user.firstName} ${user.lastName}`} 
          className="w-24 h-24 rounded-full shadow-md mb-4"
        />
        <div className="text-xl font-semibold">{user.fullName}</div>
        <div className="text-sm text-gray-400">{user.emailAddresses[0]?.emailAddress}</div>
      </div>
      
      <div className="flex justify-center w-full mb-8">
        <AnimatedCircularProgressBarDemo 
          size={200} 
          solved={solved} 
          total={total} 
          strokeWidth={10}
        />
      </div>

<div className='flex flex-row justify-evenly gap-6 flex-wrap'>



      <div className="flex flex-col w-full items-center justify-evenly">
        {solvedQuestions.length === 0 ? (
          <p className="text-lg text-gray-400">No questions have been solved yet.</p>
        ) : (
        <>
          <h1 className="text-2xl font-semibold mb-4">Solved Questions</h1>
        <div className=' gap-4 flex flex-row flex-wrap align-middle'>
       {   solvedQuestions.map((question) => (
            <IndQuestion 
            isProfile={true}
              key={question.id}
              name={question.name}
              link={question.link}
              id={question.id}
            />
          ))}</div>
       </> )}
      </div>
      <h1 className="text-2xl font-semibold mb-4">Revision Questions</h1>
      <div className="flex flex-row w-full flex-wrap items-center justify-evenly mt-8 gap-4">
        {revisionQuestions.length === 0 ? (
          <p className="text-lg text-gray-400">No revision questions yet.</p>
        ) : (
          revisionQuestions.map((question) => (
            <IndQuestion 
            isProfile={true}
              key={question.id}
              name={question.question.name}
              link={question.question.link}
              id={question.id}
            />
          ))
        )}
      </div>
    </div></div>
  );
};

export default Page;
