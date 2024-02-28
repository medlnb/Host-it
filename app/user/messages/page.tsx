"use client";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import "@styles/User.css";
import { floatingConext } from "@Context/FloatingWinContext";

interface message {
  from: string;
  post: string;
  content: string;
  _id: string;
}

function Page() {
  const { HandleChangeChildren } = useContext(floatingConext);
  const [messagesData, setMessagesData] = useState<message[] | null>(null);
  const { data: session, update } = useSession();
  useEffect(() => {
    if (session) {
      fetch(`/api/messages/${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setMessagesData(data);
        });
    }
  }, [session]);

  const HandleShowPoster = async (poster: string) => {
    const response = await fetch(`/api/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Ids: [poster] }),
    });
    if (response.ok) {
      const data = await response.json();
      const poster = data[0];
      HandleChangeChildren(
        <div className="p-3">
          <h1>{poster.name}</h1>
          <h1>{poster.email}</h1>
        </div>
      );
    }
  };
  const HandleDelete = async (postId: string) => {
    const response = await fetch(`/api/messages/${session?.user.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messageId: postId }),
    });
    if (response.ok) {
      update();
      alert("Message Deleted");
    }
  };

  return (
    <div className="p-3">
      <h2 className="text-center mb-3">Messages</h2>
      {messagesData
        ? messagesData.map((message, index) => (
            <div
              key={index}
              className="mb-3 shadow-md rounded p-3 flex justify-between items-end bg-gray-100"
            >
              <div>
                <h1 className="">{`${message.post}`}</h1>
                <h1 className="pl-3 text-gray-500">{message.content}</h1>
              </div>

              <button
                className="border-l-2 px-2"
                onClick={() => HandleShowPoster(message.from)}
              >
                Contact Hoster
              </button>
              <button
                className="border-l-2 px-2"
                onClick={() => HandleDelete(message._id)}
              >
                Remove
              </button>
            </div>
          ))
        : "Loading..."}
    </div>
  );
}

export default Page;
