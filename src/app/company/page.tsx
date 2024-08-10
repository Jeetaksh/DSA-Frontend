"use client";

import React, { useEffect, useState } from 'react';
import CompanyInd from '@/webcomponents/company/CompanyInd';
import { useUser } from '@clerk/clerk-react';

const Page = () => {
  const [companies, setCompanies] = useState<any[]>([]);
  const { user } = useUser();

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
    // Fetch companies from the backend
    const fetchCompanies = async () => {
      try {
        const response = await fetch('https://dsa-backend-lr95.onrender.com/companies/');
        const data = await response.json();
        console.log(data);
        setCompanies(data);
      } catch (error) {
        console.error('Failed to fetch companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className='min-h-screen bg-black flex flex-col items-center py-8'>
      <h1 className='text-3xl text-white font-bold mb-6'>Companies</h1>
      {companies.length === 0 ? (
        <p className='text-white text-xl'>Loading...</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {companies.map((company: any) => (
             <CompanyInd key={company.id} name={company.name} id={company.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
