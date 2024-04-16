// import { options } from "@app/api/auth/[...nextauth]/options";
// import { getServerSession } from "next-auth";

async function Layout({ children }: { children: React.ReactNode }) {
  // const session = await getServerSession(options); // database connection is to slow, so it takes time to get the user info
  // console.log("session", session);
  return (
    <div className="max-w-full my-0 mx-auto mt-2 mr-4 mb-16 ml-2">
      {/* {session === null ? "not allowed" : children} */}
      {children}
    </div>
  );
}

export default Layout;
