import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameFocused, setusernameFocused] = useState(false);
    const [pwdFocused, setPwdFocused] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const lookRef = useRef(null);


    async function submitHandler(e) {
        e.preventDefault();

        if (username && password) {
            let result = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { username, password }, {
                withCredentials: true,
                
            })
            if (result.status == 200) {
                navigate("/admin/")
            }
        }

    }


    const labelStyle = (focused, value) => ({
        top: focused || value ? "-50%" : "0%",
        padding: focused || value ? "0" : "8px",
        transform: focused || value ? "scale(0.9)" : "scale(1)",
        position: "absolute",
        transition: "all 0.2s",
        left: 0,
    });

    return (
        <main className="w-full font-[poppins] h-screen md:p-2 flex items-center justify-end bg-[#E9E9E9]">
            <div className="image h-full w-0 md:w-[60%]">
                <img
                    id="look"
                    ref={lookRef}
                    className="h-full origin-center w-full object-cover scale-90"
                    src="/ilus.png"
                    alt="ilus"
                    style={{ transform: showPass ? "rotateY(180deg)" : "rotateY(0deg)" }}
                />
            </div>

            <div className="md:w-[540px] w-full bg-[#FFFFFF] flex flex-col items-center md:p-16 p-10 h-full md:rounded-3xl">
                <h1 className="capitalize  text-4xl font-semibold mt-6 w-full text-center">
                    Welcome Back!
                </h1>
                <p className="font-semibold mt-4 text-black/70 text-sm">
                    Please Enter Your Details
                </p>

                <form onSubmit={submitHandler} className="flex gap-8 mt-14 flex-col w-full">
                    <div className="flex flex-col justify-center relative">
                        <label
                            id="username_label"
                            htmlFor="username"
                            style={labelStyle(usernameFocused, username)}
                            className="text-black/40 pointer-events-none font-medium"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                            onFocus={() => setusernameFocused(true)}
                            onBlur={() => setusernameFocused(false)}
                            className="border-b-[2px] text-xl focus:outline-none border-black/40 p-2"
                        />
                    </div>

                    <div className="flex flex-col relative justify-center">
                        <label
                            id="password_label"
                            htmlFor="password"
                            style={labelStyle(pwdFocused, password)}
                            className="text-black/40 pointer-events-none font-medium"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type={showPass ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setPwdFocused(true)}
                            onBlur={() => setPwdFocused(false)}
                            className="border-b-[2px] focus:outline-none border-black/40 p-2"
                        />
                        <div
                            className="icon absolute top-1/2 -translate-y-1/2 cursor-pointer px-1 right-0"
                            id="show-pass"
                            onClick={() => setShowPass((s) => !s)}
                            role="button"
                            aria-label="Toggle password visibility"
                        >
                            <i className={`text-2xl ${showPass ? "ri-eye-off-line" : "ri-eye-line"}`} />
                        </div>
                    </div>

                    <input
                        type="submit"
                        value="Log in"
                        className="font-medium text-lg bg-[#1B1D21] text-white p-3 rounded-full mt-5 cursor-pointer"
                    />
                </form>

                <p className="mt-2 w-full p-3 text-sm">
                    Doesn't have account?{" "}
                    <a href="/auth/signup" className="text-blue-700 underline">
                        Signup
                    </a>
                </p>
            </div>
        </main>
    );
}
