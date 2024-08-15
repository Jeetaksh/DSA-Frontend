"use client";
import React, { use, useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import IndQuestion from '@/webcomponents/Questions/IndQuestion';

const Page = () => {
    const { user } = useUser();
    const [questions, setQuestions] = useState<any[]>([]); // Initialize as an array
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            if (!user) return; // Ensure user is available before making the request

            try {
                console.log(user.id);
                const response = await fetch("https://dsa-backend-lr95.onrender.com/alladdedquestions", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "clerkUserId": user.id,
                    },
                });

                // Check if response is OK
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();

                console.log("***************");
                console.log(data);
                // Ensure the data is an array
                if (Array.isArray(data)) {
                    setQuestions(data);
                } else {
                    throw new Error('Invalid data format');
                }
            } catch (err: any) {
                setError(err.message || 'Failed to fetch questions');
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [user]);

    // Conditional rendering based on user and loading state
    if (!user || loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500"></div>
                    <p className="mt-4 text-lg">Loading...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen">
            <div className="flex flex-col gap-5 pt-10">
                {questions.length === 0 ? (
                    <div className="text-white text-center">No questions added by you.</div>
                ) : (
                    questions.map((question) => (
                        <IndQuestion key={question.id} id={question.id} name={question.name} link={question.link} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Page;
