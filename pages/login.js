import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Login = (props) => {
  const { setIsLoggedIn } = props;
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`;
    const reponse = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: userName, password }),
    });
    const json = await reponse.json();
    if (json.authtoken !== undefined) {
      localStorage.setItem("auth-token", JSON.stringify(json.authtoken));
      setIsLoggedIn(true);
      router.push("/");
    } else {
      alert("Please use correct credntials!");
    }
    setUserName("");
    setPassword("");
  };
  return (
    <>
      <div className="w-full py-8 px-4 flex justify-between items-center">
        <Link href="/signup">
          <a className="font-semibold text-blue-400">
            Don&#39;t have an account ?
          </a>
        </Link>
      </div>
      <div className="w-full h-fit py-20 flex justify-center items-center flex-col">
        <div className="mb-8">
          <Link href="/">
            <a className="flex title-font font-medium items-center text-gray-900 mb-8 md:mb-0">
              <span className="text-green-500 text-3xl">
                <img src="/assets/logo.png" alt="" className="h-12" />
              </span>
              <span className="ml-3 text-4xl">Taskify</span>
            </a>
          </Link>
        </div>
        <form
          onSubmit={(e) => handleOnSubmit(e)}
          className="w-[90%] sm:w-[70%] lg:w-1/3 font-mono flex flex-col justify-center items-center"
        >
          <input
            type="text"
            className="w-full mb-4 px-4 py-2 rounded-md border font-semibold text-center outline-none border-gray-300"
            placeholder="Enter Your Username"
            value={userName}
            minLength={5}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            className="w-full mb-8 px-4 py-2 rounded-md border font-semibold text-center outline-none border-gray-300"
            value={password}
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="rounded-md bg-blue-700 hover:bg-blue-600 w-full px-8 py-2 text-white"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
