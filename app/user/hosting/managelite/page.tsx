"use client";
import { CurrentPostContext } from "@Context/CurrentPostContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

function Page() {
  const router = useRouter();
  const { dispatch } = useContext(CurrentPostContext);
  return (
    <div className="px-2 py-10">
      <h1 className="text-3xl text-center">Ready to let peope in your house</h1>
      <div className="flex justify-center gap-4">
        <button
          className="py-2 px-4 border border-black rounded-md"
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
