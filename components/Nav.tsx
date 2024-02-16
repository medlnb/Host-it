"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "@styles/nav.css";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaRegUser } from "react-icons/fa";

function Nav() {
  const { data: session } = useSession();
  // const [providers, setProviders] = useState<any>(null);
  const [ToggleNavbar, setToggleNavbar] = useState(false);
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

  return (
    <div className="topbar--container">
      <Link href="/">Akrillloo</Link>
      <nav>
        {session?.user ? (
          <>
            <Link href="/createpost" className="underline-expand">
              New Post
            </Link>
            <div
              className="usernav"
              onClick={() => setToggleNavbar((prev) => !prev)}
            >
              <p>{session?.user.name}</p>

              {session?.user.image ? (
                <img src={session?.user.image} className="user--pic" />
              ) : (
                <FaRegUser />
              )}
            </div>
          </>
        ) : (
          <p onClick={() => signIn("credentials")} className="usernav">
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
