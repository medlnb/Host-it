"use client";
import NewPostNav from "@components/NewPostNav";
import { useSession } from "next-auth/react";

function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession(); //using client session instead of server because the server session takes too long to fetch
  // console.log(session);
  // if (session === null) return <div>9awed</div>;
  return (
    <div className="sm:h-full flex flex-col justify-center">
      <NewPostNav />
      <div className="px-1 py-10">{children}</div>
    </div>
  );
}

export default Layout;
