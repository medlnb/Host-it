import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-full my-0 mx-auto mt-2 mr-4 mb-16 ml-2">
      {children}
      <div className="fixed flex bottom-0 left-1/2 transform -translate-x-1/2 justify-center items-center gap-4 p-4 border-t border-gray-400 bg-white">
        {/* <b>Contact</b> */}

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
        {/* <a href="https://www.linkedin.com/in/mohamed-lanabi-3b7b8a1b9/">
            Twitter
          </a>
          <a href="https://www.linkedin.com/in/mohamed-lanabi-3b7b8a1b9/">
            Facebook
          </a> */}
        <a href="https://www.linkedin.com/in/mohamed-lanabi-3b7b8a1b9/">
          Instagram
        </a>
      </div>
    </div>
  );
}

export default layout;
