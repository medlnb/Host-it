"use client";
import { signOut } from "next-auth/react";

function Actions() {
  return (
    <div className="flex items-center justify-center gap-4 my-3">
      <p
        onClick={() => signOut()}
        className="cursor-pointer py-2 px-4 underline"
      >
        Log out
      </p>
    </div>
  );
}

export default Actions;
