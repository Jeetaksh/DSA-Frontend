"use client";
import { useState } from "react";
import { useUser } from '@clerk/clerk-react';

export default function Home() {
    const { user } = useUser(); 
  const [userId, setUserId] = useState("");
  const [questionData, setQuestionData] = useState({
    name: "",
    link: "",
    kind: "normal",
  });


  if (!user) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }


  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await fetch("https://dsa-backend-lr95.onrender.com/addquestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "clerkUserId":user.id 
        },
        body: JSON.stringify({
          questionData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add question");
      }

      alert("Question added successfully!");
      setQuestionData({ name: "", link: "", kind: "normal" });
    } catch (error) {
      console.error("Failed to add question:", error);
      alert("Failed to add question");
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Add a Question
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Question Name
            </label>
            <input
              type="text"
              value={questionData.name}
              onChange={(e) =>
                setQuestionData({ ...questionData, name: e.target.value })
              }
              required
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Link
            </label>
            <input
              type="text"
              value={questionData.link}
              onChange={(e) =>
                setQuestionData({ ...questionData, link: e.target.value })
              }
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
          >
            Add Question
          </button>
        </form>
      </div>
    </div>
  );
}
