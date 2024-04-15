"use client";
import NewPostNav from "@components/NewPostNav";
import NewPostProv from "@components/NewPostProv";
import { useSession } from "next-auth/react";

function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession(); //using client session instead of server because the server session takes too long to fetch
  console.log(session);
  if (session === null) return <div>9awed</div>;
  return (
    <div className="sm:h-full h-lvh flex flex-col justify-center">
      <NewPostNav />
      <NewPostProv>
        <div className="px-1">{children}</div>
      </NewPostProv>
    </div>
  );
}

export default Layout;
