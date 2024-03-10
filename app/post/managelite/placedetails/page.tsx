"use client";

import { NewPostContext } from "@Context/NewPostContext";
import { useContext } from "react";

interface props {
  Bedrooms: number;
  Bathrooms: number;
  Guests: number;
  Beds: number;
  HandleChangeInputs: any;
}

function PlaceDetails() {
  const {
    NewPost: { Bedrooms, Bathrooms, Guests, Beds },
    dispatch,
  } = useContext(NewPostContext);

  return (
    <div className="max-width45rem my-10">
      <h1 className="text-center font-medium text-2xl my-10">
        Share some basics about your place
      </h1>
      <div className="mt-6">
        <div className="flex justify-between items-center px-4 my-4">
          <p>Bedrooms</p>
          <div className="flex flex-row items-center gap-7">
            <button
              className={`bg-none border border-gray-500 w-6 h-6 rounded-full cursor-pointer text-gray-400  flex justify-center items-center hover:border-black hover:text-black ${
                Bedrooms === 0 &&
                "cursor-not-allowed text-gray-200 border-gray-200 hover:text-gray-200 hover:border-gray-200"
              }`}
              onClick={() =>
                dispatch({
                  type: "CHANGE_DETAILS",
                  payload: {
                    operation: "-",
                    variable: "Bedrooms",
                  },
                })
              }
            >
              -
            </button>
            <p>{Bedrooms}</p>
            <button
              className="bg-none border border-gray-500 w-6 h-6 rounded-full cursor-pointer text-gray-400  flex justify-center items-center hover:border-black hover:text-black"
              onClick={() =>
                dispatch({
                  type: "CHANGE_DETAILS",
                  payload: {
                    operation: "+",
                    variable: "Bedrooms",
                  },
                })
              }
            >
              +
            </button>
          </div>
        </div>
        {/* {---} */}
        <div className="flex justify-between items-center px-4 my-4">
          <p>Bathrooms</p>
          <div className="flex flex-row items-center gap-7">
            <button
              className={`bg-none border border-gray-500 w-6 h-6 rounded-full cursor-pointer text-gray-400  flex justify-center items-center hover:border-black hover:text-black ${
                Bathrooms === 0 &&
                "cursor-not-allowed text-gray-200 border-gray-200 hover:text-gray-200 hover:border-gray-200"
              }`}
              onClick={() =>
                dispatch({
                  type: "CHANGE_DETAILS",
                  payload: {
                    operation: "-",
                    variable: "Bathrooms",
                  },
                })
              }
            >
              -
            </button>
            <p className="w-2 text-center">{Bathrooms}</p>
            <button
              className="bg-none border border-gray-500 w-6 h-6 rounded-full cursor-pointer text-gray-400  flex justify-center items-center hover:border-black hover:text-black "
              onClick={() =>
                dispatch({
                  type: "CHANGE_DETAILS",
                  payload: {
                    operation: "+",
                    variable: "Bathrooms",
                  },
                })
              }
            >
              +
            </button>
          </div>
        </div>
        {/* {---} */}
        <div className="flex justify-between items-center px-4 my-4">
          <p className="w-2 text-center">Beds</p>
          <div className="flex flex-row items-center gap-7">
            <button
              className={`bg-none border border-gray-500 w-6 h-6 rounded-full cursor-pointer text-gray-400  flex justify-center items-center hover:border-black hover:text-black ${
                Beds === 0 &&
                "cursor-not-allowed text-gray-200 border-gray-200 hover:text-gray-200 hover:border-gray-200"
              }`}
              onClick={() =>
                dispatch({
                  type: "CHANGE_DETAILS",
                  payload: {
                    operation: "-",
                    variable: "Beds",
                  },
                })
              }
            >
              -
            </button>
            <p className="w-2 text-center">{Beds}</p>
            <button
              className="bg-none border border-gray-500 w-6 h-6 rounded-full cursor-pointer text-gray-400  flex justify-center items-center hover:border-black hover:text-black"
              onClick={() =>
                dispatch({
                  type: "CHANGE_DETAILS",
                  payload: {
                    operation: "+",
                    variable: "Beds",
                  },
                })
              }
            >
              +
            </button>
          </div>
        </div>
        {/* {---} */}
        <div className="flex justify-between items-center px-4 my-4">
          <p>Guests</p>
          <div className="flex flex-row items-center gap-7">
            <button
              className={`bg-none border border-gray-500 w-6 h-6 rounded-full cursor-pointer text-gray-400  flex justify-center items-center hover:border-black hover:text-black ${
                Guests === 0 &&
                "cursor-not-allowed text-gray-200 border-gray-200 hover:text-gray-200 hover:border-gray-200"
              }`}
              onClick={() =>
                dispatch({
                  type: "CHANGE_DETAILS",
                  payload: {
                    operation: "-",
                    variable: "Guests",
                  },
                })
              }
            >
              -
            </button>
            <p className="w-2 text-center">{Guests}</p>
            <button
              className="bg-none border border-gray-500 w-6 h-6 rounded-full cursor-pointer text-gray-400  flex justify-center items-center hover:border-black hover:text-black"
              onClick={() =>
                dispatch({
                  type: "CHANGE_DETAILS",
                  payload: {
                    operation: "+",
                    variable: "Guests",
                  },
                })
              }
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceDetails;
