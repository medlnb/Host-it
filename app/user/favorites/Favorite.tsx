"use client";
import { useState } from "react";
import { IoMdTrash } from "react-icons/io";
import ClipLoader from "react-spinners/ClipLoader";

const Favorite = ({ postId }: { postId: string }) => {
  const [removingStatus, setRemovingStatus] = useState<"loading" | "removed">();

  const HandleRemoveFav = async () => {
    setRemovingStatus("loading");
    const response = await fetch("/api/auth/favorites", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId,
      }),
    });
    if (response.ok) return setRemovingStatus("removed");
    setRemovingStatus(undefined);
  };

  return (
    <div>
      {removingStatus === "removed" ? (
        <div>
          <div className="absolute h-full w-full bg-gray-200 opacity-50 top-0 left-0" />
          <div className="bg-black h-0.5 w-24 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45" />
          <div className="bg-black h-0.5 w-24 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45" />
        </div>
      ) : removingStatus === "loading" ? (
        <ClipLoader
          className="cursor-pointer flex flex-col items-center gap-2"
          size={25}
        />
      ) : (
        <IoMdTrash
          className="cursor-pointer flex flex-col items-center gap-2"
          fill="black"
          size={20}
          onClick={HandleRemoveFav}
        />
      )}
    </div>
  );
};
export default Favorite;
