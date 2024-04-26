"use client";
import { CurrentPostContext } from "@Context/CurrentPostContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

function Page() {
  const router = useRouter();
  const { dispatch } = useContext(CurrentPostContext);
  return (
    <div>
      <h1 className="text-3xl text-center">Ready to let peope in your house</h1>
      <div>
        <div className="w-1/2 mx-auto flex flex-col items-start mt-12">
          <p className="text-xl">
            <b className="text-2xl">1_</b>Tell us about your place
          </p>
          <p className="mb-4 pl-6">
            Share some basic info, like where it is and how many guests can
            stay.
          </p>
          <p className="text-xl">
            <b className="text-2xl">2_</b>Make it stand out
          </p>
          <p className="mb-4 pl-6">
            {
              "Add 5 or more photos plus a title and description—we’ll help you out."
            }
          </p>
          <p className="text-xl">
            <b className="text-2xl">3_</b>Finish up and publish
          </p>
          <p className="mb-4 pl-6">
            {
              "Choose if you'd like to start with an experienced guest, set a starting price, and publish your listing."
            }
          </p>
        </div>
      </div>
      <div className="w-full flex justify-around gap-2 absolute bottom-1">
        <button
          className="underline"
          onClick={() => {
            router.push("/user/hosting/managelite/type");
          }}
        >
          Continue on the previous one
        </button>
        <button
          className="py-2 px-4 border border-black rounded-md"
          onClick={() => {
            dispatch({ type: "REST_POST" });
            router.push("/user/hosting/managelite/type");
          }}
        >
          New ONE
        </button>
      </div>
    </div>
  );
}

export default Page;
