"use client";

import { useState } from "react";

interface InfoEditerProps {
  title: string;
  value: string;
  HandleSave: (value: string) => void;
}

function InfoEditer({ title, value, HandleSave }: InfoEditerProps) {
  const [Toggle, setToggle] = useState(false);
  return (
    <div className="mb-4">
      <div className="flex justify-between">
        <div>
          {title === "governmentID" ? (
            <h2>government ID</h2>
          ) : title === "phonenumber" ? (
            <h2>phone number</h2>
          ) : title === "legalname" ? (
            <h2>legal name</h2>
          ) : (
            <h2>{title}</h2>
          )}

          <p className="text-gray-500">
            {value !== "" ? value : "Not provided"}
          </p>
        </div>
        {title !== "email" && title !== "legalname" && (
          <p
            className="underline cursor-pointer"
            onClick={() => {
              setToggle((prev) => !prev);
            }}
          >
            {Toggle ? "Cancel" : "Edit"}
          </p>
        )}
      </div>
      <div className={`flex gap-2 mt-4 ${Toggle ? "block" : "hidden"}`}>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            HandleSave(e.target.value);
          }}
          className="w-full text-gray-500 border-2  border-gray-500 rounded-md p-2"
        />
      </div>
    </div>
  );
}

export default InfoEditer;
