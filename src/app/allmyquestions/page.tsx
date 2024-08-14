"use client"
import React ,{useEffect,useState} from 'react'
import { useUser } from '@clerk/clerk-react';
import IndQuestion from '@/webcomponents/Questions/IndQuestion';
const Page = () => {
    const { user } = useUser();

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

    const [questions, setQuestions] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
          try {
    
            const response = await fetch("https://dsa-backend-lr95.onrender.com/alladdedquestions", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "clerkUserId":user.id 
                }
              });
            const data = await response.json();
            console.log(data);
            setQuestions(data);
          } catch (err) {
            setError('Failed to fetch questions');
          } finally {
            setLoading(false);
          }
        };
    
        fetchQuestions();
      }, [user]);
  return (
    <div className='bg-black min-h-screen'>
    <div className='flex flex-col gap-5 pt-10'>
    {questions.map((question) => (
        <IndQuestion key={question.id} id={question.id} name={question.name} link={question.link}  />
      ))}
    </div>
 
  </div>
  )
}

export default Page
