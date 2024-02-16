import "@styles/Login.css";

function Rootlayout({ children }: { children: JSX.Element }) {
  return <div className="login--container">{children}</div>;
}

export default Rootlayout;
