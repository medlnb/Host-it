"use client";
import { Suspense, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { FaRegUser } from "react-icons/fa";
import { CiChat1 } from "react-icons/ci";
import { floatingConext } from "@Context/FloatingWinContext";
import Login from "@components/Login";
import ClipLoader from "react-spinners/ClipLoader";
import { FaCrown } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import SearchBar from "@components/SearchBar";

function Nav() {
  const { data: session } = useSession();
  // console.log(session);
  const { HandleChangeChildren } = useContext(floatingConext);
  const [ToggleNavbar, setToggleNavbar] = useState(false);
  const [messagesData, setMessagesData] = useState<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setToggleNavbar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (session) {
      fetch(`/api/messages/${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setMessagesData(data);
        });
    }
  }, [session]);

  return (
    <div className="w-full bg-white flex flex-row items-center justify-between md:py-6 md:px-16 p-3 md:text-base text-xs">
      <Link href="/">El-Semsar</Link>
      <Suspense>
        <SearchBar />
      </Suspense>
      <nav className="flex flex-row items-center gap-4 relative">
        {session === undefined && (
          <div
            className="flex items-center flex-row p-2 rounded-xl gap-2 border border-black cursor-pointer"
            onClick={() => setToggleNavbar((prev) => !prev)}
          >
            <ClipLoader size={20} />
          </div>
        )}
        {session && (
          <>
            <Link href="/post/managelite" className="underline-expand">
              New Post
            </Link>
            {messagesData && (
              <Link
                href="/user/messages"
                className="relative flex items-center mx-2 gap-1"
              >
                <p>{messagesData.length}</p>
                <CiChat1 size={25} />
              </Link>
            )}
            <div
              className="flex items-center flex-row p-2 rounded-xl gap-2 border border-black cursor-pointer"
              onClick={() => setToggleNavbar((prev) => !prev)}
            >
              {session.user.plan && (
                <>
                  {session.user.plan.type === "Premium" ? (
                    <FaCrown size={20} className="mb-1" />
                  ) : (
                    <FaStar size={20} className="mb-1" />
                  )}
                </>
              )}
              <p>{session.user.name}</p>

              {session.user.image ? (
                <img
                  src={session?.user.image}
                  className="w-8 rounded-full"
                  style={{ aspectRatio: "1/1" }}
                />
              ) : (
                <FaRegUser />
              )}
            </div>
          </>
        )}
        {session === null && (
          // <p onClick={() => signIn("credentials")} className="usernav">
          //   Sign up
          // </p>
          <p
            onClick={() =>
              HandleChangeChildren({ title: "Log In", content: <Login /> })
            }
            className="flex items-center flex-row p-2 rounded-xl gap-2 border border-black cursor-pointer"
          >
            Sign up
          </p>
        )}
        {ToggleNavbar && (
          <div
            className="absolute shadow-md rounded-md top-14 right-0 flex flex-col bg-white py-2 z-10"
            ref={dropdownRef}
          >
            {" "}
            {/* Assign ref to the dropdown menu */}
            {/* <Link
              href="/fav"
              className="py-2 px-4 hover:bg-gray-100"
              onClick={() => setToggleNavbar(false)}
            >
              My Favorites
            </Link> */}
            <div className="Hline" />
            <Link
              href="/user"
              className="py-2 px-4 hover:bg-gray-100"
              onClick={() => setToggleNavbar(false)}
            >
              My Account
            </Link>
            {/* <Link
              href="/anoucements"
              className="py-2 px-4 hover:bg-gray-100"
              onClick={() => setToggleNavbar(false)}
            >
              My Anoucements
            </Link> */}
            <div className="Hline" />
            {/* <Link
              href="/feedback"
              className="py-2 px-4 hover:bg-gray-100"
              onClick={() => setToggleNavbar(false)}
            >
              Feedback
            </Link> */}
            <p
              onClick={() => signOut()}
              className="cursor-pointer py-2 px-4 hover:bg-gray-100"
            >
              Log out
            </p>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Nav;
