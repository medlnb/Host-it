"use client";

import { NewPostContext } from "@Context/NewPostContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

function Page() {
  const { dispatch } = useContext(NewPostContext);
  const router = useRouter();
  return (
    <div>
      <h1 className="text-3xl text-center">Ready to let peope in your house</h1>
      <button
        onClick={() => {
          router.push("/post/managelite/type");
        }}
      >
        Let's Go
      </button>
    </div>
  );
}

export default Page;
