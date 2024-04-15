"use client";
import { FaGoogle } from "react-icons/fa";
import { getProviders, signIn } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
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
    <form
      className="max-w-full flex flex-col gap-7 max-w-95 rounded-md md:px-8 px-3 py-6 mx-auto"
      style={{ width: "40rem" }}
      onSubmit={HandleSubmit}
    >
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">Welcome back</h1>
        <h3 className="">Login to your Account!</h3>
      </div>
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
        onChange={(e) =>
          setInputs((prev) => ({ ...prev, password: e.target.value }))
        }
      />
      <div>
        <button className="w-full p-3 text-white text-center rounded-md bg-rose-500">
          Sign in
        </button>
        <div className="p-2">
          doesnt have an account?
          <span
            className="cursor-pointer"
            onClick={() => {
              HandleChangeChildren({ title: "Sign Up", content: <SignUp /> });
            }}
          >
            <b> Sign in</b>
          </span>
        </div>
      </div>

      <div className="Hline" />
      <div
        onClick={() => signIn("google", { callbackUrl: "/" })} //custom the callbackUrl later !important
        className={`bg-none text-black border border-black flex items-center justify-center gap-3 cursor-pointer p-3 rounded-md  ${
          providers ? "" : "text-gray-400 border-gray-400 cursor-wait"
        }`}
      >
        <FaGoogle />
        <p>Login In with Google</p>
      </div>
    </form>
  );
}

export default Page;
