"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "./Loading";

export default function BidNow({title,email}) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const onSubmit = async (data) => {
    if (!session) {
      alert("You need to be logged in to place a bid.");
      router.push("/login");
      return;
    }

    setLoading(true);
    if(loading)
      return <Loading/>;
    const bidData = {
      title: title, // Replace with dynamic title if needed
      femail: session.user.email,
      email: email, // Fetch email from session
      amount: data.bidAmount,
      deltime: new Date(Date.now() + data.deliveryTime * 24 * 60 * 60 * 1000), // Convert days to a date
      coverletter: data.coverLetter,
      phoneNumber: data.phoneNumber
    };

    try {
      const response = await fetch("/api/bid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bidData),
      });

      if (response.ok) {
        alert("Bid submitted successfully!");
        router.push("/projects");
      } else {
        alert("Error submitting bid.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Place Your Bid</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Bid Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Bid Amount (₹)</label>
            <input type="number" {...register("bidAmount", { required: true, min: 1 })}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Enter your bid amount" />
            {errors.bidAmount && <p className="text-red-500 text-sm">Please enter a valid bid amount.</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input type="number" {...register("phoneNumber", { required: true })}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="99xxxxxxxx" />
            {errors.phoneNumber && <p className="text-red-500 text-sm">Please enter a valid Mobile Number.</p>}
          </div>

          {/* Delivery Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Estimated Delivery Time (Days)</label>
            <input type="number" {...register("deliveryTime", { required: true, min: 1 })}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Enter estimated delivery time" />
            {errors.deliveryTime && <p className="text-red-500 text-sm">Please enter a valid delivery time.</p>}
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
            <textarea {...register("coverLetter", { required: true, minLength: 10 })}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              rows={4} placeholder="Write a brief proposal" />
            {errors.coverLetter && <p className="text-red-500 text-sm">Cover letter must be at least 10 characters long.</p>}
          </div>


          <button type="submit"
            className="w-full bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition"
            disabled={loading}>
            {loading ? "Submitting..." : "Submit Bid"}
          </button>
        </form>
      </div>
    </div>
  );
}
