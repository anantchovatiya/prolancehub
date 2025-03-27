"use client";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";
import { analyzeCompetitors } from "@/ml/utils/api_connector";

const competitorData = {
  "Web Development": [
    { name: "Average Rate", yours: 45, market: 40, top10: 75 },
    { name: "Project Completion Time", yours: 14, market: 18, top10: 12 },
    { name: "Client Satisfaction", yours: 4.5, market: 4.2, top10: 4.8 },
    { name: "Revision Rounds", yours: 2, market: 3, top10: 1.5 },
    { name: "Communication", yours: 4.3, market: 4.0, top10: 4.7 }
  ],
  "Graphic Design": [
    { name: "Average Rate", yours: 35, market: 30, top10: 60 },
    { name: "Project Completion Time", yours: 5, market: 7, top10: 4 },
    { name: "Client Satisfaction", yours: 4.7, market: 4.3, top10: 4.9 },
    { name: "Revision Rounds", yours: 3, market: 4, top10: 2 },
    { name: "Communication", yours: 4.5, market: 4.1, top10: 4.8 }
  ],
  "Content Writing": [
    { name: "Average Rate", yours: 0.10, market: 0.08, top10: 0.20 },
    { name: "Project Completion Time", yours: 3, market: 4, top10: 2 },
    { name: "Client Satisfaction", yours: 4.6, market: 4.2, top10: 4.9 },
    { name: "Revision Rounds", yours: 1.5, market: 2.5, top10: 1 },
    { name: "Communication", yours: 4.4, market: 4.0, top10: 4.7 }
  ],
  "Digital Marketing": [
    { name: "Average Rate", yours: 50, market: 45, top10: 85 },
    { name: "Project Completion Time", yours: 30, market: 35, top10: 25 },
    { name: "Client Satisfaction", yours: 4.3, market: 4.1, top10: 4.7 },
    { name: "Revision Rounds", yours: 2, market: 3, top10: 1.5 },
    { name: "Communication", yours: 4.5, market: 4.2, top10: 4.8 }
  ],
  "Video Editing": [
    { name: "Average Rate", yours: 40, market: 35, top10: 70 },
    { name: "Project Completion Time", yours: 7, market: 9, top10: 5 },
    { name: "Client Satisfaction", yours: 4.4, market: 4.1, top10: 4.8 },
    { name: "Revision Rounds", yours: 2.5, market: 3.5, top10: 2 },
    { name: "Communication", yours: 4.2, market: 4.0, top10: 4.6 }
  ]
};

const industrySpecificTips = {
  "Web Development": [
    "Specialize in high-demand frameworks like React or Vue.js to command higher rates",
    "Focus on optimizing your development workflow to reduce project completion time",
    "Offer value-added services like SEO optimization or performance tuning",
    "Create a portfolio showcasing responsive and accessible designs",
    "Consider gaining expertise in emerging technologies like WebAssembly or serverless architecture"
  ],
  "Graphic Design": [
    "Build a distinctive style that sets you apart from other designers",
    "Offer package deals for brand identity projects (logo, business cards, social media assets)",
    "Learn UI/UX principles to expand your service offerings",
    "Create case studies showing your design process and problem-solving approach",
    "Consider specializing in a niche like 3D design or motion graphics"
  ],
  "Content Writing": [
    "Develop expertise in SEO writing to justify higher rates",
    "Offer content packages (blog posts, social media, email newsletters)",
    "Create a streamlined research process to reduce delivery time",
    "Build a portfolio organized by industry expertise",
    "Consider specializing in technical writing or UX writing for higher rates"
  ],
  "Digital Marketing": [
    "Develop case studies with measurable ROI results",
    "Offer multi-channel campaign packages rather than single-service offerings",
    "Learn data analytics to provide more comprehensive reporting",
    "Consider specializing in a specific platform like TikTok or LinkedIn",
    "Develop a process for regular client updates to improve communication scores"
  ],
  "Video Editing": [
    "Learn advanced effects and animation techniques to justify premium rates",
    "Create templates to streamline your editing workflow",
    "Offer packages that include color grading and sound design",
    "Build a diverse portfolio showcasing different video styles",
    "Consider specializing in a niche like tutorial videos or product demos"
  ]
};

export default function CompetitorAnalysis() {
  const [selectedIndustry, setSelectedIndustry] = useState("Web Development");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [competitiveTips, setCompetitiveTips] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [performanceTier, setPerformanceTier] = useState(null);
  const [error, setError] = useState(null);
  
  const industries = [
    "Web Development",
    "Graphic Design",
    "Content Writing",
    "Digital Marketing",
    "Video Editing"
  ];
  
  const colors = {
    yours: "#4F46E5",
    market: "#9CA3AF",
    top10: "#10B981"
  };
  
  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setShowResults(false);
    setError(null);
    
    try {
      // Default values for sample analysis - in a real app, you would get these from user inputs
      const freelancerMetrics = {
        industry: selectedIndustry,
        rate: 45,
        completion_time: 14,
        satisfaction: 4.5,
        revisions: 2,
        communication: 4.3
      };
      
      // Call the ML API for competitor analysis
      const analysisResult = await analyzeCompetitors(freelancerMetrics);
      
      setMetrics(analysisResult.metrics);
      setCompetitiveTips(analysisResult.competitive_tips);
      setPerformanceTier(analysisResult.performance_tier);
      setShowResults(true);
    } catch (err) {
      console.error("Error analyzing competitors:", err);
      setError("Sorry, we couldn't perform the competitor analysis. Please try again later.");
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg border rounded-md">
          <p className="font-semibold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value} {label === "Average Rate" ? (selectedIndustry === "Content Writing" ? "$/word" : "$/hr") : ""}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        📊 AI Competitor Analysis
        <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">PRO</span>
      </h2>
      <p className="text-gray-600 mb-6">
        Compare your freelancing metrics against market averages and top performers to identify competitive advantages and areas for improvement.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Your Industry
          </label>
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            &nbsp;
          </label>
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-md transition duration-200"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze"}
          </button>
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-md border border-red-200 mb-4">
          {error}
        </div>
      )}
      
      {showResults && !error && (
        <>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Your Competitive Analysis 
              {performanceTier && (
                <span className={`ml-2 text-sm px-2 py-1 rounded-full ${
                  performanceTier === "top" ? "bg-green-100 text-green-800" :
                  performanceTier === "high" ? "bg-blue-100 text-blue-800" :
                  performanceTier === "average" ? "bg-yellow-100 text-yellow-800" :
                  "bg-red-100 text-red-800"
                }`}>
                  {performanceTier.charAt(0).toUpperCase() + performanceTier.slice(1)} Performer
                </span>
              )}
            </h3>
            
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={metrics}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  barSize={20}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="yours" 
                    name="Your Performance" 
                    fill={colors.yours}
                  />
                  <Bar 
                    dataKey="market" 
                    name="Market Average" 
                    fill={colors.market}
                  />
                  <Bar 
                    dataKey="top10" 
                    name="Top 10% Freelancers" 
                    fill={colors.top10}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">AI-Generated Competitive Tips</h3>
            <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
              <ul className="space-y-2">
                {competitiveTips.map((tip, index) => (
                  <li key={index} className="text-purple-900 flex items-start">
                    <span className="inline-block bg-purple-200 text-purple-800 rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center text-xs mr-2 mt-0.5">
                      {index + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 
