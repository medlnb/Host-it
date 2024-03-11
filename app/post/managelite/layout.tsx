import NewPostNav from "@components/NewPostNav";
import NewPostProv from "@components/NewPostProv";
import { options } from "@app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";


async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(options);
  return (
    <>
      {session ? (
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
