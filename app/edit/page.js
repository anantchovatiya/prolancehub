"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "@/Components/Loading";

export default function EditClient() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  });

  useEffect(() => {
    const fetchClientData = async () => {
      if (!session?.user?.email) return;
      try {
        const res = await fetch(`/api/user/getEmployee?email=${session.user.email}`);
        if (!res.ok) throw new Error("Failed to fetch client data");

        const data = await res.json();
        setFormData({
          name: data.name || "",
          email: data.email || "",
          company: data.company || "",
          phone: data.phone || "",
          address: {
            street: data.address?.street || "",
            city: data.address?.city || "",
            state: data.address?.state || "",
            zip: data.address?.zip || "",
            country: data.address?.country || "",
          },
        });
      } catch (error) {
        console.error("Error fetching client data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/updateEmployee`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Client updated successfully!");
        router.back();
      } else {
        alert("Error updating client.");
      }
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  if (loading) return <Loading />

  return (
    <div className="max-w-3xl mx-3 md:mx-auto p-8 bg-white rounded-2xl shadow-lg mt-5">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none transition" required />
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none transition" required />
        </div>

        <input name="company" value={formData.company} onChange={handleChange} placeholder="Company" className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none transition" />
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none transition" />

        <h3 className="text-xl font-semibold text-gray-700">Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input name="street" value={formData.address.street} onChange={handleAddressChange} placeholder="Street" className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none transition" />
          <input name="city" value={formData.address.city} onChange={handleAddressChange} placeholder="City" className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none transition" />
          <input name="state" value={formData.address.state} onChange={handleAddressChange} placeholder="State" className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none transition" />
          <input name="zip" value={formData.address.zip} onChange={handleAddressChange} placeholder="Zip Code" className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none transition" />
          <input name="country" value={formData.address.country} onChange={handleAddressChange} placeholder="Country" className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none transition" />
        </div>

        <button type="submit" className="w-full bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 transition text-lg font-semibold shadow-md">Save Changes</button>
      </form>
    </div>
  );
}
