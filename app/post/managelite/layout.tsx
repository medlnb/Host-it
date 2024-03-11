"use client";
import NewPostNav from "@components/NewPostNav";
import NewPostProv from "@components/NewPostProv";
import { options } from "@app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

// const AuthCheck = async ({ children }: { children: React.ReactNode }) => {
//   const session = await getServerSession(options);
//   if (!session) return <p>not Logged in</p>;
//   else return Layout({ children });
// };

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NewPostNav />
      <NewPostProv>{children}</NewPostProv>
    </div>
  );
}

export default Layout;
