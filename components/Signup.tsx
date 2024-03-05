"use client";
import { FaGoogle } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import { floatingConext } from "@Context/FloatingWinContext";
import Login from "@components/Login";

function Page() {
  const { HandleChangeChildren } = useContext(floatingConext);
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
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...inputs,
        image:
          "https://qph.cf2.quoracdn.net/main-thumb-2182629636-200-pvgxmwqjhqdquxsdxkuineubuohqdgti.jpeg",
      }),
    });
    if (response.ok) {
      alert("gj Bro");
      HandleChangeChildren({ title: "Log In", content: <Login />});
      return;
    }
    alert("r u fking stupid or what");
  };
  return (
    <form
      className="flex flex-col gap-7 max-w-95 rounded-md px-8 py-6 mx-auto"
      style={{ width: "40rem" }}
      onSubmit={HandleSubmit}
    >
      <input
        value={inputs.username}
        className="w-full border-b border-black p-1 text-sm focus:outline-none"
        placeholder="Username..."
        onChange={(e) =>
          setInputs((prev) => ({ ...prev, username: e.target.value }))
        }
      />
      <input
        value={inputs.email}
        className="w-full border-b border-black p-1 text-sm focus:outline-none"
        placeholder="Email..."
        onChange={(e) =>
          setInputs((prev) => ({ ...prev, email: e.target.value }))
        }
      />
      <input
        value={inputs.password}
        className="w-full border-b border-black p-1 text-sm focus:outline-none"
        placeholder="Password..."
        type="password"
        onChange={(e) =>
          setInputs((prev) => ({ ...prev, password: e.target.value }))
        }
      />
      <div>
        <button
          className="w-full p-3 text-white text-center rounded-md"
          style={{ background: "#e3735e" }}
        >
          Sign in
        </button>
        <div className="p-2">
          Already have an account?{" "}
          <b
            onClick={() => HandleChangeChildren(<Login />)}
            className="cursor-pointer"
          >
            Sign up
          </b>
        </div>
      </div>

      <div className="Hline" />
      <div
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className={`bg-none text-black border border-black flex items-center justify-center gap-3 cursor-pointer p-3 rounded-md ${
          providers ? "" : "text-gray-400 border-gray-400 cursor-wait"
        }`}
      >
        <FaGoogle />
        <p>Sign up with Google</p>
      </div>
    </form>
  );
}

export default Page;
