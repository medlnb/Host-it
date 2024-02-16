import "@styles/Login.css";

function layout({ children }: { children: JSX.Element }) {
  return <div className="login--container">{children}</div>;
}

export default layout;
