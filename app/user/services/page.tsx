"use client";
import { useState } from "react";
import "@styles/User.css";

function Page() {
  const [info, setInfo] = useState<{ cleaning: boolean; gift: number } | null>(
    null
  );
  return <div>page</div>;
}

export default Page;
