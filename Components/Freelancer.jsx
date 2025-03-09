'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getuser } from "@/actions/getuser";
import Loading from "./Loading";
import { useSession } from "next-auth/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Freelancer() {
  const { data: session } = useSession();
  const username = session.user.email.split('@')[0];
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getuser({ username });
        if (!fetchedUser) {
          setUser(null);
        } else {
          setUser(fetchedUser);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-red-500">Something Went Wrong</h1>
        <p className="text-gray-600 mt-2">An error occurred while loading the page.</p>
        <a href="/" className="mt-2 text-blue-600 hover:underline">
          Go Back to Home
        </a>
      </div>
    );
  }

  const portfoliolink = `https://${user.portfolio}`;

  const averageRating = user.ratings?.length > 0
    ? user.ratings.reduce((acc, rating) => acc + rating, 0) / user.ratings.length
    : 0;

// Count ratings per star (1-5)
const ratingCounts = Array(5).fill(0);
user.ratings.forEach((rating) => {
  ratingCounts[rating - 1]++; // Map rating 1-5 to index 0-4
});

// Percentage Calculation
const totalRatings = user.ratings.length;
const ratingPercentages = ratingCounts.map((count) =>
  totalRatings ? (count / totalRatings) * 100 : 0);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-[url('/cover.jpg')] bg-cover bg-center p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
        <div className="w-full">
          <Link href={'/edit-profile'} className="flex float-end bg-white p-2 rounded-full">
            ✏️
          </Link>
        </div>

        <Image
          src={user.profileImage || "/default-avatar.png"}
          alt={user.name}
          width={120}
          height={120}
          className="rounded-full"
        />
        <h1 className="text-2xl font-bold mt-4">{user.name}</h1>
        <p className="text-gray-600">@{user.username}</p>
        <p className="mt-2 text-gray-700">{user.bio || "No bio available"}</p>
      </div>

      <div className=" p-6 rounded-lg shadow-xl w-full mt-10 mx-auto">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-3">
        Ratings
      </h2>

      {/* Star Rating */}
      <div className="flex items-center justify-center gap-2">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className={`text-3xl ${i < Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"}`} />
        ))}
        <span className="text-gray-700 text-lg font-semibold">
          {averageRating.toFixed(1)} out of 5
        </span>
      </div>

      {/* Rating Count */}
      <p className="text-center text-gray-500 mt-2">
        {totalRatings} People Rated
      </p>

      {/* Ratings Breakdown */}
      <div className="mt-4">
        {ratingPercentages.map((percent, index) => (
          <div key={index} className="flex items-center mb-2">
            <span className="w-14 text-gray-700 font-semibold">{5 - index} ⭐</span>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <motion.div
                className="bg-yellow-400 h-2.5 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <span className="w-10 text-gray-700 font-semibold text-sm ml-2">
              {ratingCounts[4 - index]}
            </span>
          </div>
        ))}
      </div>


    </div>

      <h2 className="text-3xl text-gray-700 font-bold mb-4 mt-10">
          Skills & Services
        </h2>
      <div className="mt-6 p-6 rounded-lg shadow-lg">

        <div className="flex flex-wrap gap-3">
          {user.skills.map((skill, index) => (
            <span
              key={index}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md transform hover:scale-105 transition-all duration-300"
            >
              <FaCheckCircle className="text-white text-base" />
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-16">
      <h2 className="text-3xl text-gray-700 font-bold mb-4">
          Portfolio
        </h2>
        <div className="mt-2 border rounded-lg overflow-hidden shadow-md">
          <iframe
            src={portfoliolink}
            className="w-full h-[600px] border-none"
            title="Portfolio Preview"
          ></iframe>
        </div>
        <a href={portfoliolink} target="_blank" className="text-blue-600 hover:underline flex items-center mt-2">
          Visit Portfolio <FaExternalLinkAlt className="ml-1" />
        </a>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl text-gray-700 font-bold">Client Reviews</h2>
        {user.reviews.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            {user.reviews.slice(0, 6).map((review, index) => (
              <div
                key={index}
                className="p-6 border rounded-lg  shadow-lg flex flex-col"
              >
                <div className="flex">
                  <Image src={"/comma.png"} width={30} height={30} alt=""></Image>
                </div>
                <p className="text-gray-700 text-lg mt-2 text-left">{review.comment}</p>
                <p className="text-gray-800 font-bold text-lg uppercase text-right">
                  ~{review.email.split("@")[0]}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center text-lg">No reviews yet</p>
        )}

      </div>
    </div>
  );
}
