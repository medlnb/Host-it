"use client";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { floatingConext } from "@Context/FloatingWinContext";

interface message {
  from: string;
  postId: string;
  post: string;
  content: string;
  _id: string;
}

function Page() {
  const { HandleChangeChildren, setToggle } = useContext(floatingConext);
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
      HandleChangeChildren({
        title: "Host info",
        content: (
          <div className="p-3" style={{ width: "30rem" }}>
            {Object.entries(poster).map((element) => {
              if (element[0] !== "_id" && element[0] !== "image")
                return (
                  <>
                    <div key={element[0]} className="flex flex-row">
                      <p className="flex-1">{element[0]}</p>
                      <p className="flex-1">{element[1] + ""}</p>
                    </div>
                    <div className="Hline my-4 w-full" />
                  </>
                );
            })}
          </div>
        ),
      });
    }
  };
  const HandleDelete = async (messageId: string) => {
    const response = await fetch(`/api/messages/${session?.user.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messageId }),
    });
    if (response.ok) {
      update();
      alert("Message Deleted");
    }
  };

  return (
    <div className="p-3 max-width45rem">
      <h2 className="text-center mb-3">Messages</h2>
      {messagesData
        ? messagesData.map((message, index) => (
            <div
              key={index}
              className="mb-3 shadow-md rounded p-3 flex justify-between items-end bg-gray-100 relative"
            >
              <div>
                <h1>{message.post} :</h1>
                <p className="pl-3 text-gray-500">
                  {message.content}
                  <b
                    className="border-l-2 px-2 text-gray-700 underline cursor-pointer"
                    onClick={() => HandleShowPoster(message.from)}
                  >
                    Contact Hoster
                  </b>
                </p>
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <FaStar
                  className="mb-0.5 cursor-pointer"
                  onClick={() => {
                    HandleChangeChildren(
                      <RatingPage
                        setToggle={setToggle}
                        postId={message.postId}
                        userId={session?.user.id}
                      />
                    );
                  }}
                />
                <IoMdTrash
                  className="cursor-pointer"
                  onClick={() => HandleDelete(message._id)}
                />
              </div>
            </div>
          ))
        : "Loading..."}
    </div>
  );
}

export default Page;

const RatingPage = ({
  setToggle,
  postId,
  userId,
}: {
  setToggle: any;
  postId: string;
  userId?: string;
}) => {
  const [Inputs, setInputs] = useState<{ content: string; rating: number }>({
    content: "",
    rating: 3,
  });
  const emptyStarts = [
    <CiStar
      key={10}
      size={30}
      onClick={() => {
        setInputs((prev) => ({ ...prev, rating: 1 }));
      }}
    />,
    <CiStar
      key={11}
      size={30}
      onClick={() => {
        setInputs((prev) => ({ ...prev, rating: 2 }));
      }}
    />,
    <CiStar
      key={12}
      size={30}
      onClick={() => {
        setInputs((prev) => ({ ...prev, rating: 3 }));
      }}
    />,
    <CiStar
      key={13}
      size={30}
      onClick={() => {
        setInputs((prev) => ({ ...prev, rating: 4 }));
      }}
    />,
    <CiStar
      key={14}
      size={30}
      onClick={() => {
        setInputs((prev) => ({ ...prev, rating: 5 }));
      }}
    />,
  ];

  const filledStarts = [];
  for (let index = 0; index < Inputs.rating; index++) {
    filledStarts.push(
      <FaStar
        key={index}
        onClick={() => {
          setInputs((prev) => ({ ...prev, rating: index + 1 }));
        }}
        size={26}
      />
    );
    emptyStarts.shift();
  }

  const HandleSubmit = async () => {
    const response = await fetch(`/api/post/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: Inputs.content,
        userId,
        rating: Inputs.rating,
      }),
    });
    if (response.ok) alert("Done my g");
  };
  return (
    <div className="w-96 max-w-full p-3">
      <div className="flex items-center justify-center my-5">
        {[...filledStarts, ...emptyStarts].map((star) => star)}
      </div>
      <textarea
        value={Inputs.content}
        onChange={(e) =>
          setInputs((prev) => ({ ...prev, content: e.target.value }))
        }
        className="border-2 w-full p-1"
        placeholder="what do u think of this place..."
      />
      <p
        className="text-center mt-3 border-2 rounded p-1 cursor-pointer"
        onClick={() => {
          HandleSubmit();
          setToggle(false);
        }}
      >
        Submit
      </p>
    </div>
  );
};
