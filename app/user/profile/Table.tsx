"use client";
import { useState } from "react";
import { toast } from "sonner";

interface User {
  name: string;
  email: string;
  phonenumber?: string;
  governmentID?: string;
  address?: string;
}

const keys: {
  key: "name" | "email" | "phonenumber" | "governmentID" | "address";
  title: string;
  immutable: boolean;
}[] = [
  { key: "name", title: "Name", immutable: true },
  { key: "email", title: "Email", immutable: true },
  { key: "phonenumber", title: "Phone Number", immutable: false },
  { key: "governmentID", title: "Government ID", immutable: false },
  { key: "address", title: "Home Address", immutable: false },
];

function Table({ profile }: { profile: User }) {
  const [inputs, setInputs] = useState(profile);

  const HandleSave = async () => {
    let profileUpdates: {
      phonenumber?: string;
      governmentID?: string;
      address?: string;
    } = {};

    if (inputs.phonenumber) profileUpdates.phonenumber = inputs.phonenumber;
    if (inputs.governmentID) profileUpdates.governmentID = inputs.governmentID;
    if (inputs.address) profileUpdates.address = inputs.address;

    const isEmpty = Object.keys(profileUpdates).length === 0;
    if (isEmpty) return toast.warning("Nothing to save.");

    const res = await fetch(`/api/profile`, {
      method: "PATCH",
      body: JSON.stringify({ ...profileUpdates }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) return toast.success("Saved");
    toast.error("Failed to save");
  };

  return (
    <div>
      {keys.map((key) => {
        return (
          <div className="mb-4" key={key.key}>
            <h2>{key.title}</h2>
            <div className={`flex gap-2 mt-4 `}>
              <input
                type="text"
                value={inputs[key.key] ?? "Not provided"}
                onChange={(e) => {
                  setInputs((prev) => ({
                    ...prev,
                    [key.key]: e.target.value,
                  }));
                }}
                onFocus={(e) => {
                  if (!inputs[key.key])
                    setInputs((prev) => ({
                      ...prev,
                      [key.key]: "",
                    }));
                }}
                disabled={key.immutable}
                className={`w-full text-gray-500 border-2 rounded-md p-2 ${
                  key.immutable ? "  border-gray-200" : "  border-gray-500"
                }`}
              />
            </div>
          </div>
        );
      })}
      <button onClick={HandleSave}>hello</button>
    </div>
  );
}

export default Table;
