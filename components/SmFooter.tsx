"use client";
import { IoMdSettings } from "react-icons/io";
import { MdAddHome } from "react-icons/md";
import { FaHome, FaUserAlt } from "react-icons/fa";
import { useScroll } from "@hooks/useScroll";
import { RiMessage3Fill } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Login from "@components/Login";
import { Session } from "next-auth";

function SmFooter({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const { scrollDirection } = useScroll();

  return (
    pathname !== "/user/hosting/managepost" && (
      <div
        className={`md:hidden w-full h-12 items-center justify-around border-t border-rose-500 bg-white fixed bottom-0 left-0 z-10 ${
          scrollDirection === "up" ? "hidden" : "flex"
        }`}
      >
        <Link href="/" className="text-rose-500">
          <FaHome size={25} />
        </Link>
        {session ? (
          <>
            <Link href={"/user/messages"} className="text-rose-500">
              <RiMessage3Fill size={25} />
            </Link>

            <div className="flex items-center justify-center relative">
              <Link
                href={"/user/hosting/managelite"}
                className="absolute -top-12 z-100 p-2 rounded-full border border-rose-500 bg-white "
              >
                <MdAddHome size={25} />
              </Link>
            </div>
            <Link href={"/"} className="text-rose-500">
              <IoMdSettings size={25} />
            </Link>
            <Link href={"/user"} className="flex items-center justify-center">
              {session.user.image ? (
                <img src={session.user.image} className="h-6 rounded-full" />
              ) : (
                <FaUserAlt size={23} />
              )}
            </Link>
          </>
        ) : (
          <Login />
        )}
      </div>
    )
  );
}

export default SmFooter;
