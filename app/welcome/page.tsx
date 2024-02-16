"use client";
import { FaGoogle } from "react-icons/fa";
import { useEffect, useState } from "react";
import "@styles/Login.css";
import Link from "next/link";
import { getProviders, signIn } from "next-auth/react";

function page() {
  const [providers, setProviders] = useState<any>(null);
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
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
  };
  return (
    <form className="login--form" onSubmit={HandleSubmit}>
      <h1 style={{ textAlign: "center" }}>Sign up</h1>
      <input
        value={inputs.username}
        className="login--input"
        placeholder="Username..."
        onChange={(e) =>
          setInputs((prev) => ({ ...prev, username: e.target.value }))
        }
      />
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
        type="password"
        onChange={(e) =>
          setInputs((prev) => ({ ...prev, password: e.target.value }))
        }
      />
      <div>
        <button style={{ width: "100%" }} className="login--submit">
          Sign in
        </button>
        <p style={{ padding: ".5rem" }}>
          Already have an account?{" "}
          <Link href="/welcome/login" className="Link">
            {" "}
            <b>Sign up</b>
          </Link>
        </p>
      </div>

      <div className="Hline" />
      <div
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className={`login--submit google--login ${
          providers ? "" : "gl--loading"
        }`}
      >
        <FaGoogle />
        <p>Sign up with Google</p>
      </div>
    </form>
  );
}

export default page;
