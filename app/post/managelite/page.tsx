"use client";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  return (
    <div>
      <h1 className="text-3xl text-center">Ready to let peope in your house</h1>
      <button
        onClick={() => {
          router.push("/post/managelite/type");
        }}
      >
        Let s Go
      </button>
    </div>
  );
}

export default Page;
