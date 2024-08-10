"use client"
import IndQuestion from '@/webcomponents/Questions/IndQuestion'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

const Page = () => {
  const para = useParams();
  const topicId = para.id;
  console.log(topicId);

  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`https://dsa-backend-lr95.onrender.com/companies/${topicId}/questions`);
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
  }, [topicId]);

  if (loading) return <div className="bg-black min-h-screen text-white flex justify-center items-center">Loading...</div>;
  if (error) return <div className="bg-black min-h-screen text-white flex justify-center items-center">{error}</div>;

  return (
    <div className='bg-black min-h-screen'>
      <div className='flex flex-col gap-5 pt-10'>
        {questions.map((question) => (
          <IndQuestion key={question.id} id={question.id} name={question.name} link={question.link} />
        ))}
      </div>
    </div>
  );
}

export default Page;
