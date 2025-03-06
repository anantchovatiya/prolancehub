'use client'
import React from 'react'
import Image from 'next/image';
import Slider from '@/Components/Slider';
import { useState } from 'react'
import Link from 'next/link';


const home = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!email) return alert("Please enter your email");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Subscription successful! Check your email.");
        setEmail(""); // Clear input
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      alert("Something went wrong!");
    }
  };


  return (
    <>
      <div className="home flex-col md:flex-row flex justify-center items-center content-center w-full mt-5 gap-2">
        <div className="con1 h-2/4 md:w-1/2  flex flex-col justify-center items-center">
          <span className='text-4xl md:text-7xl font-bold pl-5 md:pl-16'>Need the perfect freelancer for your project ?</span>
          <span className='p-5 md:pl-16 md:mt-7 text-sm md:text-xl text-justify text-gray-500'>Hire Exceptional Talent, Seamlessly. SkillBridge makes it easy to find and onboard top-tier freelancers, so you can focus on what matters most bringing your vision to life. Get started now!</span>
          <div className="hire border-2 border-gray-200 mt-8 md:mt-16 rounded-full bg-gray-600">
            <Link href={'/findfreelancers'}><button className='w-72 h-12 text-2xl text-white'>Hire a freelancer</button></Link>
          </div>
        </div>

        <div className="con2 h-3/4 md:w-1/2 flex items-center justify-center">
          <Image src='/home.png' alt="hero" width={600} height={600} />
        </div>
      </div>

      <div className="flex justify-center items-center content-center mt-5 gap-2">
        <div className='w-4/5 md:h-64 p-3 mb-10 flex flex-col md:flex-row justify-center items-center  shadow-2xl shadow-gray-500'>
          <div className='mb-5 md:w-1/3 h-max flex flex-col justify-center items-center'>
            <Image className='rounded-full' src='/create.png' width={100} height={100} alt='hero'></Image>
            <span className='text-2xl font-bold text-center'>Create Account</span>
            <span className='text-gray-500 text-center'>First you have to create a account here.</span>
          </div>
          <div className='mb-5 md:w-1/3 h-max flex flex-col justify-center items-center'>
            <Image className='rounded-full' src='/search.png' width={100} height={100} alt='hero'></Image>
            <span className='text-2xl font-bold text-center'>Search Work</span>
            <span className='text-gray-500 text-center'>First you have to create a account here.</span>
          </div>
          <div className='mb-5 md:w-1/3 h-max flex flex-col justify-center items-center'>
            <Image className='rounded-full' src='/save.png' width={100} height={100} alt='hero'></Image>
            <span className='text-2xl font-bold text-center'>Save and Apply</span>
            <span className='text-gray-500 text-center'>First you have to create a account here.</span>
          </div>
        </div>
      </div>

      <div className="cat mt-20">
        <p className='text-center text-3xl font-bold'>Get tasks completed across more than 2,700 different fields.</p>
        <div className="categories flex justify-center items-center content-center mt-5 gap-2 h-96 w-full px-10">
          <Slider />
        </div>
      </div>

      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12">

      <div className="md:w-1/2 text-center mt-5 md:text-left">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
          <span>Discover Top</span> <br></br><span className="text-blue-400">Freelancers</span> Today
          <br /><span> on</span> <span className='text-indigo-400'>ProlanceHub</span>
        </h2>
        <p className="text-gray-600 mt-4">
          Find highly skilled professionals to bring your projects to life.
          Whether it's design, development, or marketing, we've got you covered!
        </p>
        <div className="flex justify-center md:justify-start mt-6 space-x-4">
          <div className="bg-white shadow-lg p-4 rounded-lg text-center">
            <span className="text-indigo-600 font-bold text-xl">750+</span>
            <p className="text-sm text-gray-500">Projects Completed</p>
          </div>
          <div className="bg-white shadow-lg p-4 rounded-lg text-center">
            <span className="text-indigo-600 font-bold text-xl">500+</span>
            <p className="text-sm text-gray-500">Verified Freelancers</p>
          </div>
        </div>
      </div>


      <div className="mt-10 md:w-1/2 flex justify-center md:mt-0">
        <Image src="/man.png" alt="freelancer" width={500} height={500} />
      </div>
    </section>


<div className='flex justify-center items-center content-center gap-2'>
    <div className="py-12 px-6 flex flex-col items-center text-center w-3/4 bg-slate-200">
      <h2 className="text-4xl font-bold text-gray-900 tracking-widest">Newsletter Subscription</h2>
      <p className="text-gray-500 mt-2 md:text-xl">
        Subscribe to our newsletter to get new freelance work and projects.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          placeholder="Enter your email address"
          className="px-4 py-3 min-w-56 md:w-96 border focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleSubscribe}
          className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 transition"
        >
          Subscribe
        </button>
      </div>
    </div>
    </div>
    </>
  )
}

export default home;