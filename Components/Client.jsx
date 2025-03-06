'use client';

import { useEffect, useState } from 'react';
import { getclient } from '@/actions/getclient';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { getbids } from '@/actions/getbids';
import { motion } from "framer-motion";
import { FaPlus } from 'react-icons/fa';
export default function ClientProfile() {
  const { data: session } = useSession();
  const email = session?.user?.email;

  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bids, setBids] = useState([]);
  const [selectedProjectBids, setSelectedProjectBids] = useState({});

  useEffect(() => {
    async function fetchClientData() {
      try {
        const clientData = await getclient({ email });
        setClient(clientData);
        const bidsData = await getbids({ email });
        setBids(bidsData);
      } catch (error) {
        console.error('Error fetching client:', error);
      } finally {
        setLoading(false);
      }
    }
    if (email) {
      fetchClientData();
    }
  }, [email]);

  const toggleBids = (title) => {
    setSelectedProjectBids((prev) => ({
      ...prev,
      [title]: prev[title] ? null : bids.filter((bid) => bid.title === title),
    }));
  };

  const deleteProject = async (title, email) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    setLoading(true);
    try {
      const response = await fetch('/api/delete-project', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, email }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete project');
      }
      setClient((prevClient) => ({
        ...prevClient,
        projects: prevClient.projects.filter((project) => project.title !== title),
      }));
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project. Try again.');
    }
    setLoading(false);
  };

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-red-500">Something Went Wrong</h1>
        <p className="text-gray-600 mt-2">Client profile not found.</p>
        <a href="/" className="mt-2 text-blue-600 hover:underline">Go Back to Home</a>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 px-14">
      <div className='min-h-screen flex flex-col w-full'>
        <div className="left w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full bg-gradient-to-r from-blue-500 to-gray-600 text-white p-6 rounded-lg shadow-lg text-center"
          >
            <h1 className="text-3xl font-bold">Welcome, {client.name}</h1>
            <p className="mt-2 text-lg">Find top freelancers & hire the best talent for your projects.</p>
            <Link href={"/edit"}><button className="mt-4 bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-200 transition-all">
              Edit Profile
            </button></Link>
          </motion.div>
        </div>
        <div className="right flex flex-col w-full mt-7">
          <div className='text-2xl font-bold justify-center'><h2>Personal Information</h2></div>
          <div>
            <p className="text-gray-700 mt-2"><span className='font-bold'>Email :  </span> {client.email}</p>
            <p className="text-gray-700 mt-2"><span className='font-bold'>MobileNumber : </span>{client.phone || 'No phone available'}</p>
            <p className="text-gray-700 mt-2"><span className='font-bold'>CompanyName : </span>{client.company || 'No company info'}</p>
            {client.address && (
              <p className="text-gray-600 mt-2"><span className='font-bold'>Address : </span>{client.address.city}, {client.address.country}</p>
            )}
          </div>

        </div>
        <div className="mt-6">

          <div>
            <div className='flex justify-start w-full'>
            <h2 className="text-2xl font-bold text-left">Projects</h2>
            </div>
            <div className='flex justify-end'>
              <Link href={"/post-project"}><motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <FaPlus className="text-lg" />
                Post a Project
              </motion.button>
              </Link>
            </div>
            {client.projects.length > 0 ? (
              <div className="mt-4 space-y-6 rounded-lg shadow-lg">
                {client.projects.map((project, index) => (
                  <div key={index} className="p-4 border rounded-lg shadow-md">
                    <h3 className="font-semibold text-lg">{project.title}</h3>
                    <p className="text-gray-600 text-sm">{project.description}</p>
                    <p className="text-gray-500 text-sm">💰 Budget: ${project.budget}</p>
                    <p className="text-gray-500 text-sm">📅 Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
                    <p className={`text-sm ${project.completed ? 'text-green-600' : 'text-red-600'}`}>
                      {project.completed ? '✅ Completed' : '⏳ In Progress'}
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => toggleBids(project.title)} className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900 transition">
                        {selectedProjectBids[project.title] ? 'Hide Bids' : 'Show Bids'}
                      </button>
                      <button onClick={() => deleteProject(project.title, email)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
                        Delete 🗑️
                      </button>
                    </div>
                    {selectedProjectBids[project.title] && (
                      <div className="mt-4 bg-gray-100 p-4 rounded-md">
                        <h4 className="text-lg font-semibold">Bids for {project.title}</h4>
                        <p className="text-gray-500">Total Bids: {selectedProjectBids[project.title].length}</p>
                        {selectedProjectBids[project.title].length > 0 ? (
                          selectedProjectBids[project.title].map((bid, i) => (
                            <div key={i} className="p-3 border border-gray-300 rounded-md mt-2">
                              <p className="text-sm text-gray-600">📧 {bid.femail}</p>
                              <p className="text-sm text-gray-600">📞 {bid.phoneNumber}</p>
                              <p className="text-sm text-gray-600">💰 ${bid.amount}</p>
                              <p className="text-sm text-gray-600">📜 {bid.coverletter}</p>
                              <p className="text-sm text-gray-600">⏳ {new Date(bid.deltime).toLocaleDateString()}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500">No bids available.</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mt-2">No projects posted yet.</p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
