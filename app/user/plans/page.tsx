"use client";
import { useState } from "react";
import "@styles/User.css";

function Page() {
  const [plan, setPlan] = useState<("Oridinal" | "Pro" | "Premuim") | null>(
    null
  );
  return (
    <div className="max-width45rem ">
      <div className="border-2"> </div>
    </div>
  );
}

export default Page;
