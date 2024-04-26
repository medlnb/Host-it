"use client";
import { IoMdSettings } from "react-icons/io";
import { MdAddHome } from "react-icons/md";
import { FaHome, FaUserAlt } from "react-icons/fa";
import { useScroll } from "@hooks/useScroll";
import { RiMessage3Fill } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Login from "@components/Login";
import { useContext } from "react";
import { floatingConext } from "@Context/FloatingWinContext";

function SmFooter() {
  const pathname = usePathname();
  const { scrollDirection } = useScroll();
  const { data: session } = useSession();
  const { HandleChangeChildren } = useContext(floatingConext);

  return (
    <>
      {pathname.split("/")[3] !== "managelite" && (
        <div
          className={`${scrollDirection === "up" ? "hidden" : "flex"}
      ${pathname.split("/")[2] === "managelite" && "hidden"} 
      w-full h-12 items-center justify-around border-t border-rose-500 bg-white fixed bottom-0`}
        >
          <Link href={"/"} className="text-rose-500">
            <FaHome size={25} />
          </Link>
          {session !== null && session !== undefined ? (
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
            <FaUserAlt
              size={23}
              className="text-rose-500"
              onClick={() =>
                HandleChangeChildren({ title: "Log In", content: <Login /> })
              }
            />
          )}
        </div>
      )}
    </>
  );
}

export default SmFooter;
