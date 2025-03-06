"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";
import ChartComponent from '@/Components/ChartComponent';
import Predictor from '@/Components/Predictor';
import techTrends from '@/public/techTrends';
import Image from 'next/image';
import { useRef } from 'react';

export default function AIInsights() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const detailsRef = useRef(null);
  const handleScroll = () => {
    detailsRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const hackernewsResponse = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
        const topStoryIds = hackernewsResponse.data.slice(0, 5);
        const storyResponses = await Promise.all(
          topStoryIds.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
        );
        setNewsData(storyResponses.map(response => response.data));
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="w-full flex md:min-h-screen justify-center flex-col md:flex-row-reverse  items-center">
        {/* Left Content Section */}
        <div className="p-5 md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            AI Insights for <br /> Freelancing Success
          </h1>
          <p className="text-gray-600 text-sm md:text-lg mt-4">
            Discover how AI-powered tools can optimize your freelancing journey.
            From automating tasks to finding high-paying projects, AI is shaping
            the future of freelancing. Stay ahead with smart insights and grow
            your freelance career effortlessly.
          </p>
          <button className="mt-6 px-6 py-3 bg-gray-500 text-white rounded-full text-lg font-medium hover:bg-gray-700 transition"
          onClick={handleScroll}
          >
            See More
          </button>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 flex justify-center mt-10 md:mt-0 p-2">
          <Image
            src="/ai.png" // Ensure you place the image in /public/images/
            alt="AI for Freelancing"
            width={600}
            height={600}
            className="object-contain"
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6" ref={detailsRef}>

        <h1 className="mt-20 text-4xl font-bold text-gray-900 mb-6">Insights</h1>
        <ChartComponent />

        {/* AI-Detected Tech Trends */}
        <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
      <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-5 flex items-center gap-2">
        🔥 AI-Detected Tech Trends
      </h2>
      <ul className="space-y-4">
        {techTrends.map((tech, index) => (
          <div
            key={index}
            className="bg-gray-50 p-4 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 duration-300 ease-in-out"
            onClick={() => setExpanded(expanded === index ? null : index)}
          >
            {/* Header Section */}
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800 text-sm md:text-lg">{tech.name}</span>
              <span className="text-gray-600 text-[9px] md:font-medium">{tech.trend}</span>
            </div>

            {/* Expanding Description */}
            <AnimatePresence>
              {expanded === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 text-gray-700 text-sm bg-white p-3 rounded-md border border-gray-200"
                >
                  <ul className="list-disc pl-5 space-y-2">
                    {tech.description.split("\n").map((line, idx) => {
                      // Check if line contains ": " to bolden key aspects
                      const parts = line.split(": ");
                      return (
                       <div key={idx}>
                          {parts[0].includes("Future Trends") || parts[0].includes("Key Aspects") ? (
                            <span className="text-gray-800 font-extrabold">{parts[0]}</span>
                          ) : (
                            <span className="font-bold">{parts[0]}</span>
                          )}{" "}
                          {parts[1] || ""}
                        </div>
                      );
                    })}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </ul>
    </div>

        <Predictor />

        {/* Recent Tech News */}
        {newsData.length > 0 && (
          <div className="bg-white shadow-lg rounded-lg mt-8 p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">📰 Recent Tech News</h2>
            <div className="space-y-4">
              {newsData.slice(0, 3).map((story) => (
                <div key={story.id} className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900">{story.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{new Date(story.time * 1000).toLocaleDateString()} • {story.score} points • by {story.by}</p>
                  <p className="text-sm text-gray-600 mt-2">AI Analysis: This could impact your business by bringing new opportunities in {story.title.toLowerCase().includes('web') ? 'web development' : story.title.toLowerCase().includes('ai') ? 'AI integration' : story.title.toLowerCase().includes('mobile') ? 'mobile app development' : 'technology'}.</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
