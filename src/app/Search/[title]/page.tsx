"use client"
import IndQuestion from '@/webcomponents/Questions/IndQuestion'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

const SearchQuestionsPage = () => {
  const { title } = useParams();
  console.log(title);

  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`https://dsa-backend-lr95.onrender.com/questions/search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title })
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
  }, [title]);

  if (loading) return <div className="bg-black min-h-screen text-white flex justify-center items-center">Loading...</div>;
  if (error) return <div className="bg-black min-h-screen text-white flex justify-center items-center">{error}</div>;

  return (
    <div className='bg-black min-h-screen'>
      <div className='flex flex-col gap-5 pt-10'>
        {questions.length === 0 ? (
          <div className="text-center text-white">No questions found for the title &quot;{title}&quot;</div>
        ) : (
          questions.map((question) => (
            <IndQuestion key={question.id} id={question.id} name={question.name} link={question.link} />
          ))
        )}
      </div>
    </div>
  )
}

export default SearchQuestionsPage;
