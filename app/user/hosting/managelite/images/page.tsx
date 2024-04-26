"use client";
import { CurrentPostContext } from "@Context/CurrentPostContext";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";

function Page() {
  const [loadingState, setLoadingState] = useState(false);

  const { CurrentPost, dispatch } = useContext(CurrentPostContext);

  const { data: session } = useSession();

  const handleFileChange = async (event: any) => {
    setLoadingState(true);
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=46538c9ba2728742f22b087919d04680`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setLoadingState(false);
        const data = await response.json();

        dispatch({
          type: "ADD_IMAGE",
          payload: {
            display_url: data.data.display_url,
            delete_url: data.data.delete_url,
          },
        });
      }
    } catch (error) {
      setLoadingState(false);
      alert("error");
    }
  };
  const HandleSubmit = async () => {
    if (CurrentPost.image.length < 5) {
      return alert("U need at least 5 pictures");
    }
    const response = await fetch("/api/post/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ ...CurrentPost, poster: session?.user.id }),
    });
    if (response.ok) alert("Done");
  };

  return (
    <div className="max-width45rem">
      <h1 className="text-center text-3xl font-medium">Add the Images Here</h1>
      <div className="border border-black rounded-md overflow-hidden h-32 w-96 max-w-full relative p-2 my-4 mx-auto">
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full h-full"
        />
        <div
          className="bg-white w-full h-full absolute top-0 left-0 flex items-center justify-center"
          style={{ pointerEvents: "none" }}
        >
          {loadingState ? <SyncLoader /> : "Click here to add Picture"}
        </div>
      </div>
      <div className="w-full grid lg:grid-cols-4 grid-cols-2 gap-2 p-2">
        {CurrentPost.image.map((img, index) => (
          <img
            key={index}
            className="object-cover h-40 rounded-md"
            src={img.display_url}
          />
        ))}
        {[
          ...Array(
            CurrentPost.image.length > 5 ? 0 : 5 - CurrentPost.image.length
          ),
        ].map((element, index) => (
          <div
            key={index + 100}
            className="h-40 border border-dashed border-gray-700 rounded-md flex justify-center items-center text-xs"
          >
            No image, please fill me
          </div>
        ))}
      </div>
      <button
        onClick={HandleSubmit}
        className="my-6 mx-auto block p-2 bg-black text-white rounded-md"
      >
        Submit
      </button>
    </div>
  );
}

export default Page;
