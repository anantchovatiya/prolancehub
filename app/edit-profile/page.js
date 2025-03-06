"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/Components/Loading";

export default function EditProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [rate, setRate] = useState("");
  const [title, setTitle] = useState("");
  const [portfolio, setPortfolio] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user?.email) return;
      try {
        const res = await fetch(`/api/user/getProfile?email=${session.user.email}`);
        if (!res.ok) throw new Error("Failed to fetch user data");

        const userData = await res.json();
        setName(userData.name || "");
        setBio(userData.bio || "");
        setSkills(userData.skills?.join(", ") || "");
        setProfilePicture(userData.profilePicture || "");
        setRate(userData.rate || "");
        setTitle(userData.title || "");
        setPortfolio(userData.portfolio || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      email: session?.user?.email,
      name,
      bio,
      skills: skills.split(",").map((s) => s.trim()),
      profilePicture,
      rate,
      title,
      portfolio,
    };

    const res = await fetch("/api/user/updateProfile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (res.ok) {
      alert("Profile updated successfully!");
      router.back();
    } else {
      alert("Error updating profile.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-3xl mx-3 md:mx-auto p-8 bg-white rounded-2xl shadow-lg mt-3">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none transition"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="4"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none transition"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        {/* Portfolio & Rate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Portfolio Link</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none transition"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Rate ($ per hour)</label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none transition"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
        </div>

        {/* Profile Picture */}
        <div className="flex items-center space-x-5">
          {profilePicture && (
            <img src={profilePicture} alt="Profile" className="w-16 h-16 rounded-full border shadow-md" />
          )}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none transition"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 transition text-lg font-semibold shadow-md"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
