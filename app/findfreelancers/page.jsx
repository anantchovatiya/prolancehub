"use client";
import Rating from "@/Components/Rating";
import { useState, useEffect } from "react";
import { getuserdata } from "@/actions/getuserdata";
import Loading from "@/Components/Loading";
import { useSession } from "next-auth/react";

export default function FindFreelancers() {
  const { data: session } = useSession();
  // console.log(session.user.email)
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [reviewText, setReviewText] = useState({}); // Store review input for each freelancer

  // Function to handle rating submission
  const handleRating = async (email, rating) => {
    try {
      const response = await fetch("/api/rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, rating }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);

    }
  };

  // Function to handle review submission
  const handleReview = async (email) => {
    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, comment: reviewText[email] || "" }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Refresh data after adding review
      const updatedData = await getuserdata();
      setFreelancers(updatedData);
      setReviewText({ ...reviewText, [email]: "" }); // Reset input field
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getuserdata();
        setFreelancers(data);
      } catch (error) {
        console.error("Error fetching freelancers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (freelancers.length > 0) {
      setFilteredFreelancers(
        freelancers.filter((freelancer) =>
          freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          freelancer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          freelancer.skills.some((skill) =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      );
    }
  }, [searchTerm, freelancers]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Discover experts ready to bring your ideas to life
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="Search by name, skill, or title..."
        className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600 outline-none transition"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {filteredFreelancers.map((freelancer) => (
          <div
            key={freelancer._id}
            className="p-4 bg-white shadow-lg rounded-lg flex flex-col justify-between h-auto transition-all hover:shadow-xl"
          >
            {/* Freelancer Info */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{freelancer.name}</h2>
              <p className="text-gray-600">{freelancer.title}</p>
              <p className="text-blue-500 font-medium">${freelancer.rate}/hr</p>

              {/* Average Rating */}
              <div className="flex items-center mt-2">
                <span className="text-yellow-500 text-lg">⭐</span>
                <span className="text-gray-700 ml-1">
                  {(freelancer.ratings.reduce((acc, rating) => acc + rating, 0) / freelancer.ratings.length).toFixed(1)}
                </span>
                <span className="ml-3 text-sm text-gray-500">
                  {freelancer.ratings.length} reviews
                </span>
              </div>

              {/* Skills */}
              <div className="mt-3 flex flex-wrap gap-2 overflow-y-scroll scrollbar-thin h-16">
                {freelancer.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-1 text-sm font-medium bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full shadow-md h-7 flex items-center justify-center"
                  >
                    {skill}
                  </span>

                ))}
              </div>
            </div>

            {/* Rating & Review Section */}
            {session && (
              <div className="mt-2 bg-white">
                <Rating onRatingSelect={(rating) => handleRating(freelancer.email, rating)} />

                <textarea
                  className="w-full p-2 border rounded mt-2 text-sm resize-none"
                  placeholder="Write a review..."
                  value={reviewText[freelancer.email] || ""}
                  onChange={(e) =>
                    setReviewText({ ...reviewText, [freelancer.email]: e.target.value })
                  }
                />
                <button
                  className="mt-2 bg-gray-600 hover:bg-gray-800 text-white px-4 py-2 rounded w-full transition-all"
                  onClick={() => handleReview(freelancer.email)}
                >
                  Submit Review
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

  );
}
