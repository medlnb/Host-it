import { options } from "@app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(options);
  return (
    <div className="max-w-full p-1 mx-auto">
      {session === null ? "not allowed" : children}
    </div>
  );
}

export default Layout;
