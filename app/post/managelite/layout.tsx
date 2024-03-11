"use client";
import NewPostNav from "@components/NewPostNav";
import NewPostProv from "@components/NewPostProv";
import { useSession } from "next-auth/react";

function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession(); //using client session instead of server because the server session takes too long to fetch
  return (
    <>
      {session !== undefined ? (
        <div>
          <NewPostNav />
          <NewPostProv>{children}</NewPostProv>
        </div>
      ) : (
        "run bich"
      )}
    </>
  );
}

export default Layout;
