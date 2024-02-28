"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import "@styles/nav.css";
import { signOut, useSession } from "next-auth/react";
import { FaRegUser } from "react-icons/fa";
import { CiChat1 } from "react-icons/ci";
import { floatingConext } from "@Context/FloatingWinContext";
import Login from "@components/Login";
import ClipLoader from "react-spinners/ClipLoader";

function Nav() {
  const { data: session } = useSession();
  const { HandleChangeChildren } = useContext(floatingConext);
  const [ToggleNavbar, setToggleNavbar] = useState(false);
  const [messagesData, setMessagesData] = useState([]);
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
    <div className="topbar--container">
      <Link href="/">Akrillloo</Link>
      <nav>
        {session === undefined && (
          <div
            className="usernav"
            onClick={() => setToggleNavbar((prev) => !prev)}
          >
            <ClipLoader size={20} />
          </div>
        )}
        {session && (
          <>
            <Link href="/createpost" className="underline-expand">
              New Post
            </Link>
            <Link
              href="/user/messages"
              className="relative flex items-center mx-2 gap-1"
            >
              <p>{messagesData.length}</p>
              <CiChat1 size={25} />
            </Link>
            <div
              className="usernav"
              onClick={() => setToggleNavbar((prev) => !prev)}
            >
              <p>{session.user.name}</p>

              {session.user.image ? (
                <img src={session?.user.image} className="user--pic" />
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
            onClick={() => HandleChangeChildren(<Login />)}
            className="usernav"
          >
            Sign up
          </p>
        )}
        {ToggleNavbar && (
          <div className="DroppedNav" ref={dropdownRef}>
            {" "}
            {/* Assign ref to the dropdown menu */}
            <Link href="/fav" onClick={() => setToggleNavbar(false)}>
              My Favorites
            </Link>
            <div className="Hline" />
            <Link href="/user" onClick={() => setToggleNavbar(false)}>
              My Account
            </Link>
            <Link href="/anoucements" onClick={() => setToggleNavbar(false)}>
              My Anoucements
            </Link>
            <div className="Hline" />
            <Link href="/feedback" onClick={() => setToggleNavbar(false)}>
              Feedback
            </Link>
            <p onClick={() => signOut()} style={{ cursor: "" }}>
              Log out
            </p>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Nav;
