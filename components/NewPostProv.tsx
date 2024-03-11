"use client";
import { NewPostContextProvider } from "@Context/NewPostContext";

function NewPostProv({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NewPostContextProvider>{children}</NewPostContextProvider>
    </div>
  );
}

export default NewPostProv;
