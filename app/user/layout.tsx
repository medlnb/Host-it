import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="UserPage--container">
      {children}
      <div className="UserPage--footer">
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
