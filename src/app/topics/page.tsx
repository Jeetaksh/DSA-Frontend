"use client";

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import TopicInd from '@/webcomponents/Navbar/Topic/TopicInd';
import Ripple from "@/components/magicui/ripple";

const Page = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const { user } = useUser();
  const [solved, setSolved] = useState(100); // Example solved questions
  const total = 1000; 


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




        console.log("called .....");
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
    // Fetch topics from the backend
    const fetchTopics = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await fetch('https://dsa-backend-lr95.onrender.com/topics/', {
          headers: {
            'Content-Type': 'application/json',
            'userId': user!.id
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch topics');
        }
        const data = await response.json();
        console.log(data);
        setTopics(data);
      } catch (error) {
        console.error('Failed to fetch topics:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchTopics();
  }, [user]);

  return (
    <div className='min-h-screen bg-black flex flex-row flex-wrap justify-evenly'>
      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <div className="text-white">Loading...</div> {/* Your loading indicator */}
        </div>
      ) : (
        <div className='flex flex-col gap-4 mt-9 text-white'>
          <div className='flex flex-row justify-evenly'>
          <div>
          Name
            </div> 
            <div >
            Day
            </div>
          </div>
         
            
          {topics.map((topic: any) => (
            <TopicInd key={topic.id} day={topic.Day} name={topic.name} id={topic.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
