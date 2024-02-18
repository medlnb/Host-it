"use client";
import { FaGoogle } from "react-icons/fa";
import { getProviders, signIn } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import "@styles/Login.css";
import SignUp from "@components/Signup";
import { floatingConext } from "@Context/FloatingWinContext";

function Page() {
  const [providers, setProviders] = useState<any>(null);
  const { HandleChangeChildren } = useContext(floatingConext);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    (async () => {
      const response = await getProviders();
      setProviders(response);
    })();
  }, []);

  const HandleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      callbackUrl: "/",
      email: inputs.email,
      password: inputs.password,
    });
  };
  return (
    <form className="login--form" onSubmit={HandleSubmit}>
      <h1 style={{ textAlign: "center" }}>Sign in</h1>
      <input
        value={inputs.email}
        className="login--input"
        placeholder="Email..."
        onChange={(e) =>
          setInputs((prev) => ({ ...prev, email: e.target.value }))
        }
      />
      <input
        value={inputs.password}
        className="login--input"
        placeholder="Password..."
        onChange={(e) =>
          setInputs((prev) => ({ ...prev, password: e.target.value }))
        }
      />
      <div>
        <button style={{ width: "100%" }} className="login--submit">
          Sign in
        </button>
        <div style={{ padding: ".5rem" }}>
          doesnt have an account?
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              HandleChangeChildren(<SignUp />);
            }}
          >
            <b> Sign in</b>
          </span>
        </div>
      </div>

      <div className="Hline" />
      <div
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className={`login--submit google--login ${
          providers ? "" : "gl--loading"
        }`}
      >
        <FaGoogle />
        <p>Login In with Google</p>
      </div>
    </form>
  );
}

export default Page;