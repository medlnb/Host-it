"use client";
import { FaGoogle, FaUserCircle } from "react-icons/fa";
import { getProviders, signIn } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function Login() {
  const [dialog, setDialog] = useState<"signup" | "login">();
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

  const HandleSignUp = async (e: FormEvent<HTMLFormElement>) => {
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
  };

  const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      callbackUrl: "/",
      email: inputs.email,
      password: inputs.password,
    });
  };

  return (
    <div>
      <div
        className="flex items-center flex-row p-2 rounded-xl gap-2 md:border border-black cursor-pointer hover:shadow-md hover:shadow-gray-500"
        onClick={() => setDialog("login")}
      >
        <p className="hidden md:block">Sign up</p>
        <FaUserCircle size={20} />{" "}
      </div>
      <Dialog
        open={!!dialog}
        onClose={() => setDialog(undefined)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <form
            className="max-w-full flex flex-col gap-7 rounded-md py-4"
            onSubmit={dialog === "signup" ? HandleSignUp : HandleSubmit}
          >
            <div className="text-center">
              <h1 className="text-2xl font-semibold mb-2">
                {dialog === "signup" ? (
                  <p>Welcome to El-Semsar</p>
                ) : (
                  <p>Welcome back</p>
                )}
              </h1>
              <h3>
                {dialog === "signup" ? (
                  <p>Create an Account!</p>
                ) : (
                  <p>Login to your Account!</p>
                )}
              </h3>
            </div>
            <input
              value={inputs.email}
              className="w-full border-b border-black p-1 text-sm focus:outline-none"
              placeholder="Email..."
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            {dialog === "signup" && (
              <input
                value={inputs.username}
                className="w-full border-b border-black p-1 text-sm focus:outline-none"
                placeholder="Username..."
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, username: e.target.value }))
                }
              />
            )}

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
                {dialog === "signup" ? <p>Sign up</p> : <p>Log in</p>}
              </button>
              <div className="p-2">
                {dialog === "signup" ? (
                  <p>
                    doesnt have an account?{" "}
                    <b
                      className="cursor-pointer"
                      onClick={() => {
                        setDialog("login");
                      }}
                    >
                      Sign in
                    </b>
                  </p>
                ) : (
                  <p>
                    already have an account?{" "}
                    <b
                      className="cursor-pointer"
                      onClick={() => {
                        setDialog("signup");
                      }}
                    >
                      Log in
                    </b>
                  </p>
                )}
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
              {dialog === "signup" ? (
                <p>Sign up with Google</p>
              ) : (
                <p>Log in with Google</p>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Login;
