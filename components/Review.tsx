"use client";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

interface ReviewType {
  user: {
    _id: string;
    name: string;
    image: string;
  };
  content: string;
  stars: number;
}

function Review({ review: { user, content, stars } }: { review: ReviewType }) {
  return (
    <div className="border-2 text-xs rounded-2xl flex flex-col p-3 min-w-full md:min-w-[24%]">
      <h1 className="text-4xl md:text-6xl">❝</h1>
      <p>{content}</p>
      <div className="h-12 mt-5 flex flex-row items-center gap-3 w-full">
        <img
          className="h-8 w-8 cursor-pointer rounded-full"
          src={user.image}
          alt="Review post"
        />
        <div>
          <p>{user.name}</p>
          <div className="flex flex-row gap-0.5 items-center">
            {Array.from({ length: stars }, (_, index) => (
              <FaStar key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
