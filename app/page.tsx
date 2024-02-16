"use client";
import Posts from "@components/Posts";
import "@styles/App.css";
import { useSearchParams } from "next/navigation";

function app() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  return (
    <div className="homepage--container">
      {<Posts searchParams={{ query: params.get("query") ?? undefined }} />}
    </div>
  );
}

export default app;
