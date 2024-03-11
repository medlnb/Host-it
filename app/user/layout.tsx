"use client";

import { useSession } from "next-auth/react";

function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  // const session = await getServerSession(options); database connection is to slow, so it takes time to get the user info
  return (
    <div className="max-w-full my-0 mx-auto mt-2 mr-4 mb-16 ml-2">
      {session === null ? "not allowed" : children}

      <div className="fixed flex bottom-0 left-1/2 transform -translate-x-1/2 justify-center items-center gap-4 p-4 border-t border-gray-400 bg-white">
        <a href="mailto:  mohamedlanabi0@gmail.com">Email</a>
        <a href="tel:  +212 6 99 99 99 99">Phone</a>
        <a href="https://www.linkedin.com/in/mohamed-lanabi-3b7b8a1b9/">
          LinkedIn
        </a>
        <a
          href="
          https://www.linkedin.com/in/mohamed-lanabi-3b7b8a1b9/"
        >
          Github
        </a>
        <a href="https://www.linkedin.com/in/mohamed-lanabi-3b7b8a1b9/">
          Instagram
        </a>
      </div>
    </div>
  );
}

export default Layout;
