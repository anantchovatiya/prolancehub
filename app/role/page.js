"use client"
import React from 'react'
import { signIn } from "next-auth/react";
import Cookies from "js-cookie";
import { useState } from 'react';

const role = () => {
  const [loading, setLoading] = useState(false);
  const handleLogin = async (rol) => {
    setLoading(true);
    Cookies.set("userRole", rol, { expires: 1 });

    await signIn("google", { callbackUrl: "/" }); // Redirect after sign-in
    setLoading(false); // Hide loader (though page will navigate)
  };
  return (

    <div className="flex flex-col items-center md:justify-center min-h-screen px-4 w-full">
      <h1 className="text-4xl mt-10 md:text-5xl font-bold text-center mb-10 drop-shadow-lg">
        Join as an Employer or Freelancer ?
      </h1>
      <div className="flex flex-col md:flex-row px-10 justify-center gap-8 w-full">
        {/* Employer Card */}
        <div
          className="group relative bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-3xl cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 md:w-1/3"
          onClick={() => handleLogin("employer")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
            alt="Employer"
            className="w-24 h-24 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
          />
          <button className="w-full text-lg font-medium text-white">
            👨‍💼 I'm an <span className="text-black text-2xl font-semibold">Employer</span>, looking to hire talent.
          </button>
        </div>

        {/* Freelancer Card */}
        <div
          className="group relative bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-3xl cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 md:w-1/3"
          onClick={() => handleLogin("freelancer")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1041/1041881.png"
            alt="Freelancer"
            className="w-24 h-24 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
          />
          <button className="w-full text-lg font-medium text-white">
            🎨 I'm a <span className="text-black font-semibold text-2xl">Freelancer</span>, seeking new projects.
          </button>
        </div>
      </div>
    </div>

  )
}
export default role;