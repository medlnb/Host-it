"use client";
import { CurrentPostContext } from "@Context/CurrentPostContext";
import { useContext } from "react";

function PlaceInfo() {
  const {
    CurrentPost: { title, description },
    dispatch,
  } = useContext(CurrentPostContext);
  return (
    <div className="max-width45rem my-5">
      <h1 className="text-center font-medium text-2xl my-10">
        Now, let{"'"}s give your dome a title Short titles work best.
      </h1>
      <div className="my-10 w-full">
        <input
          className={`w-full my-3 p-3 border border-gray-300 rounded-md focus:outline-none${
            title.length > 0 ? "border-black" : ""
          }`}
          placeholder="Title..."
          value={title}
          onChange={(e) =>
            dispatch({
              type: "SET_STRING",
              payload: { key: "title", value: e.target.value },
            })
          }
        />
      </div>

      <h1 className="text-center font-medium text-2xl ">
        Create your description
      </h1>
      <h2 className="text-center font-medium text-gray-600">
        Share what makes your place special.
      </h2>
      <div className="w-full my-5">
        <textarea
          className={`w-full h-24 p-2 border border-gray-400 rounded-md focus:outline-none ${
            description.length > 0 ? "active--input" : ""
          }`}
          placeholder="Description..."
          value={description}
          onChange={(e) =>
            dispatch({
              type: "SET_STRING",
              payload: { key: "description", value: e.target.value },
            })
          }
        />
      </div>

      <br></br>
    </div>
  );
}

export default PlaceInfo;
