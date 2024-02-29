"use client";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

interface props {
  userId: string;
  rating: number;
  content: string;
}

function Review({ userId, rating, content }: props) {
  const [userProfile, setUserProfile] = useState<{
    name: string;
    image: string;
  } | null>(null);
  useEffect(() => {
    const getProfile = async () => {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ Ids: [userId] }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUserProfile(data[0]);
      }
    };
    getProfile();
  }, []);
  return (
    <div className="border-2 rounded-2xl flex flex-col p-5 min-w-full">
      <h1 className="text-4xl md:text-6xl">❝</h1>
      <p className="text-sm">{content}</p>
      <div className="h-16 my-2 flex flex-row items-center gap-3 w-full">
        {!userProfile ? (
          <>
            <div
              className="h-full cursor-pointer rounded-full bg-gray-700 animate-pulse"
              style={{ aspectRatio: "1/1" }}
            />
            <div>
              <div className="w-1/2 h-5 bg-gray-400 animate-pulse rounded-full" />
            </div>
          </>
        ) : (
          <>
            <img
              className="h-full  cursor-pointer rounded-full"
              src={userProfile.image}
              alt="Review post"
            />
            <div>
              <p>{userProfile.name}</p>
              <div className="flex flex-row gap-0.5 items-center">
                {Array.from({ length: rating }, (_, index) => (
                  <FaStar key={index} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Review;
