import React, { useState, useEffect } from "react";
import { adminData } from "./Authentication";
import { Link, useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isAdminAuthenticated") === "true") {
      navigate("/admin/dashboard", { replace: true });
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === adminData.username && password === adminData.password) {
      localStorage.setItem("isAdminAuthenticated", "true");
      navigate("/admin/dashboard", { replace: true });
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <>
      <div className="overflow-hidden flex flex-col items-center justify-center relative p-5">
        <Link to="/" className="cursor-pointer px-5 py-2 rounded-2xl bg-gradient-to-r from-[#9c7bf7] to-[#5823f7] text-white absolute top-3 left-5">
          Back
        </Link>
        <div className=" w-[100vw] h-[90vh] flex flex-col md:flex-row items-center justify-center md:gap-10 px-10">
          <div className="md:w-1/3 h-1/3 md:h-full flex items-center justify-center ">
            <img className="object-cover" src="16191.jpg" alt="" />
          </div>
          <div className="bg-white h-2/3 md:w-1/2 md:h-[60vh] flex flex-col items-center justify-center p-10 shadow-xs shadow-black rounded-3xl w-[100%]">
            <h1 className="text-2xl font-extrabold tracking-wide cursor-default flex items-center justify-center">
              PixelPerfect
            </h1>
            <form
              onSubmit={handleLogin}
              className="flex flex-col items-center justify-center w-full gap-4 "
            >
              <p className="cursor-default font-bold pt-2 pb-3">
                Welcome to Pixel Perfect
              </p>
              <input
                type="text"
                placeholder="Username"
                className="px-4 py-2 font-light outline-[#5823f7] w-[70%]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="px-4 py-2 font-light outline-[#5823f7] w-[70%]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="flex cursor-pointer w-1/3 bg-gradient-to-r from-[#9c7bf7] to-[#5823f7] items-center justify-center py-2 rounded-xl text-white font-light"
              >
                Login
              </button>
            </form>
          </div>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-2 flex items-center justify-center w-full absolute bottom-24 md:bottom-10">
            {error}
          </p>
        )}
      </div>
    </>
  );
}
