"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FaRegStar, FaStar } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ShineBorder from "@/components/magicui/shine-border";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const IndQuestion = ({ name, link, id, isProfile = false }: any) => {
  const { user } = useUser();
  const [noteContent, setNoteContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState<any[]>([]);
  const [isSolved, setIsSolved] = useState(false);
  const [isMarkedForRevision, setIsMarkedForRevision] = useState(false);

  const fetchNotes = async () => {
    if (!user) return;

    try {
      const response = await fetch(
        `https://dsa-backend-lr95.onrender.com/notes?questionId=${id}&email=${user.emailAddresses[0]?.emailAddress}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch notes");
      }

      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const fetchSolvedQuestions = async () => {
    if (!user) return;

    try {
      const response = await fetch(
        `https://dsa-backend-lr95.onrender.com/users/${user.emailAddresses[0]?.emailAddress}/solved-questions/details`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch solved questions");
      }

      const solved = data.some((question: any) => question.id === id);
      setIsSolved(solved);
    } catch (error) {
      console.error("Error fetching solved questions:", error);
    }
  };

  const fetchRevisionQuestions = async () => {
    if (!user) return;

    try {
      const response = await fetch(
        `https://dsa-backend-lr95.onrender.com/revision-questions/${user.emailAddresses[0]?.emailAddress}`
      );
      const data = await response.json();
      console.log("Fetched revision questions:", data); // Debugging log
      
      const markedForRevision = data.some((question: any) => question.questionId === id);
      console.log("Is marked for revision:", markedForRevision); // Debugging log
      
      setIsMarkedForRevision(markedForRevision);
    } catch (error) {
      console.error("Error fetching revision questions:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
    fetchSolvedQuestions();
    fetchRevisionQuestions();
  }, [user, id]);

  const handleAddNote = async () => {
    if (!user) return;

    setIsLoading(true);

    try {
      const response = await fetch("https://dsa-backend-lr95.onrender.com/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "clerkUserId":user.id 
        },
        body: JSON.stringify({
          content: noteContent,
          questionId: id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      // Clear the textarea
      setNoteContent("");
      alert("Note added successfully!");
    } catch (error) {
      console.error("Error adding note:", error);
      alert("Error adding note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;

    const isChecked = e.target.checked;
    setIsSolved(isChecked);

    try {
      const response = await fetch(
        `https://dsa-backend-lr95.onrender.com/users/${user.emailAddresses[0]?.emailAddress}/solved-questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "clerkUserId":user.id 
          },
          body: JSON.stringify({
            questionId: id,
            add: isChecked, // Indicates whether to add or remove the question
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update solved questions");
      }

      const data = await response.json();
      console.log("Updated solved questions:", data); // Debugging log

    } catch (error) {
      console.error("Error updating solved questions:", error);
      alert("Error updating solved questions. Please try again.");
    }
  };

  const handleStarClick = async () => {
    if (!user) return;

    const newStatus = !isMarkedForRevision;
    setIsMarkedForRevision(newStatus);

    try {
      const response = await fetch("https://dsa-backend-lr95.onrender.com/revision-questions", {  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "clerkUserId":user.id
        },
        body: JSON.stringify({
          questionId: id,
          email: user.emailAddresses[0]?.emailAddress,
          add: newStatus, // Indicates whether to add or remove the question from revision
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update revision questions");
      }

      const data = await response.json();
      console.log("Updated revision questions:", data); // Debugging log

      // Ensure state is updated based on backend response
      setIsMarkedForRevision(newStatus);
    } catch (error) {
      console.error("Error updating revision questions:", error);
      alert("Error updating revision questions. Please try again.");
      // Revert the state change if there's an error
      setIsMarkedForRevision(!newStatus);
    }
  };

  return (
    <div className="flex flex-row justify-evenly items-center p-6 flex-wrap align-middle bg-gray-800 rounded-lg shadow-lg ">
     
      <a target="_blank" href={`${link}`}>
        <ShineBorder
          className="bg-black text-white mb-4"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
          {name}
        </ShineBorder>
      </a>
      {!isProfile && (
        <div className="flex gap-4 mb-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Add Note
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gray-700">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-lg font-semibold">
                  Write Note About Question
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <Textarea
                    placeholder="Type your message here."
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    className="mt-2"
                  />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-gray-600 hover:bg-gray-700">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleAddNote}
                  disabled={isLoading}
                  className={`bg-green-600 hover:bg-green-700 ${
                    isLoading ? "opacity-50" : ""
                  }`}
                >
                  {isLoading ? "Saving..." : "Add"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div className="flex items-center gap-4 ">

            <input
              type="checkbox"
              id="terms"
              checked={isSolved}
              onChange={handleCheckboxChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
          </div>
        </div>
      )}
      {!isProfile && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              onClick={fetchNotes}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Show Notes
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
            <div>
              {notes.length > 0 ? (
                notes.map((note: any) => (
                  <div key={note.id} className="p-2 border-b border-gray-600">
                    {note.content}
                  </div>
                ))
              ) : (
                <div className="text-center p-4">No notes available.</div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      )}
      {!isProfile && (
        <div onClick={handleStarClick} className="cursor-pointer">
          {isMarkedForRevision ? (
            <FaStar size={24} className="text-yellow-500" />
          ) : (
            <FaRegStar size={24} className="text-gray-400" />
          )}
        </div>
      )}
    </div>
  );
};

export default IndQuestion;
