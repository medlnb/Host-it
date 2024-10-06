import Link from "next/link";
import Login from "@components/Login";
import { FaStar } from "react-icons/fa6";
import { FaCrown, FaRegUser } from "react-icons/fa";
import Messages from "./Messages";
import { getServerSession } from "next-auth";
import SmFooter from "@components/SmFooter";

async function Nav() {
  const session = await getServerSession();
  return session ? (
    <>
      <SmFooter session={session} />
      <nav className="hidden md:flex flex-row items-center gap-1 relative">
        <Link href="/user/hosting/managepost" className="underline-expand">
          New Post
        </Link>

        <Messages />
        <Link
          href="/user"
          className="flex items-center flex-row py-2 px-1 sm:rounded-xl rounded-lg sm:gap-2 gap-1 border border-black cursor-pointer"
        >
          {session.user.plan && (
            <>
              {session.user.plan.type === "Premium" ? (
                <FaCrown size={15} />
              ) : (
                <FaStar size={15} />
              )}
            </>
          )}
          <p>{session.user.name}</p>

          {session.user.image ? (
            <img
              src={session.user.image}
              className="w-6 sm:w-8 rounded-full"
              style={{ aspectRatio: "1/1" }}
            />
          ) : (
            <FaRegUser />
          )}
        </Link>
      </nav>
    </>
  ) : (
    <Login />
  );
}

export default Nav;
