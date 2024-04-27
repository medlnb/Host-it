"use client";
import { CurrentPostContextProvider } from "@Context/CurrentPostContext";

function NewPostProv({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <CurrentPostContextProvider>{children}</CurrentPostContextProvider>
    </div>
  );
}

export default NewPostProv;
