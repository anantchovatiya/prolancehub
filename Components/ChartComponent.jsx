"use client";

import React from "react";
import {
  LineChart,
  Cell,
  LabelList,
  CartesianGrid,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const skillsData = [
  { skill: "Artificial Intelligence", salary: 1000000 },
  { skill: "Machine Learning", salary: 950000 },
  { skill: "Cybersecurity", salary: 800000 },
  { skill: "Data Science", salary: 650000 },
  { skill: "Blockchain Development", salary: 620000 },
  { skill: "UI/UX Design", salary: 600000 },
  { skill: "Cloud Computing", salary: 550000 },
  { skill: "Mobile App Development", salary: 500000 },
  { skill: "Digital Marketing", salary: 340000 },
  { skill: "Web Development", salary: 216000 },
];

const jobsData = [
  { job: "AI/ML Engineer", salary: 1000000 },
  { job: "Cybersecurity Developer", salary: 800000 },
  { job: "Data Analyst", salary: 750000 },
  { job: "Blockchain Developer", salary: 600000 },
  { job: "UI/UX Designer", salary: 570000 },
  { job: "Mobile App Developer", salary: 550000 },
  { job: "Financial Consultant", salary: 510000 },
  { job: "Sales Representative", salary: 500000 },
  { job: "Accountant", salary: 420000 },
  { job: "Media Buyer", salary: 400000 },
];

const data = [
  { month: "Jan", JavaScript: 1400, Python: 1200, React: 1100, NextJS: 800, Java: 1300, DotNet: 950 },
  { month: "Feb", JavaScript: 1380, Python: 1280, React: 1130, NextJS: 780, Java: 1330, DotNet: 970 },
  { month: "Mar", JavaScript: 1520, Python: 1250, React: 1180, NextJS: 860, Java: 1360, DotNet: 1010 },
  { month: "Apr", JavaScript: 1570, Python: 1400, React: 1240, NextJS: 920, Java: 1500, DotNet: 990 },
  { month: "May", JavaScript: 1650, Python: 1450, React: 1320, NextJS: 870, Java: 1480, DotNet: 1070 },
  { month: "Jun", JavaScript: 1590, Python: 1420, React: 1280, NextJS: 910, Java: 1530, DotNet: 1050 },
  { month: "Jul", JavaScript: 1720, Python: 1380, React: 1350, NextJS: 890, Java: 1580, DotNet: 1120 },
  { month: "Aug", JavaScript: 1680, Python: 1550, React: 1450, NextJS: 980, Java: 1660, DotNet: 1150 },
  { month: "Sep", JavaScript: 1820, Python: 1480, React: 1520, NextJS: 1010, Java: 1710, DotNet: 1190 },
  { month: "Oct", JavaScript: 1890, Python: 1620, React: 1500, NextJS: 1080, Java: 1760, DotNet: 1210 },
  { month: "Nov", JavaScript: 1750, Python: 1590, React: 1550, NextJS: 1020, Java: 1790, DotNet: 1180 },
  { month: "Dec", JavaScript: 2000, Python: 1800, React: 1650, NextJS: 1130, Java: 1850, DotNet: 1250 },
];

const barColors = ["#5B8FF9", "#5AD8A6", "#F6BD16", "#E8684A", "#6DC8EC", "#9270CA", "#FF9D4D", "#6395F9", "#73C0DE", "#FFA39E"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md border rounded-md text-sm">
        <p className="text-gray-700 font-semibold">{payload[0].payload.skill || payload[0].payload.job}</p>
        <p className="text-blue-600 font-bold">₹{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function ChartComponent() {
  return (
    <div className="container mx-auto px-4">
      {/* Skill Demand Over Time */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-7">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">📈 Skill Demand Over Time 2024</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis width={50}/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="JavaScript" stroke="#2563EB" strokeWidth={3} />
            <Line type="monotone" dataKey="Python" stroke="#16A34A" strokeWidth={3} />
            <Line type="monotone" dataKey="React" stroke="#F59E0B" strokeWidth={3} />
            <Line type="monotone" dataKey="NextJS" stroke="#DC2626" strokeWidth={3} />
            <Line type="monotone" dataKey="Java" stroke="#9333EA" strokeWidth={3} />
            <Line type="monotone" dataKey="DotNet" stroke="#06B6D4" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Salaries & Jobs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Salaries by Skill */}
        <div className="bg-white p-2 md:p-6 rounded-lg shadow-lg">
          <h2 className="text-lg p-0 md:text-2xl font-bold text-gray-800 mb-4">💰 Top 10 Average Salaries by Skill</h2>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={skillsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(value) => `₹${value / 100000}L`} stroke="#6B7280" />
              <YAxis dataKey="skill" type="category" width={110} stroke="#374151" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="salary">
                {skillsData.map((_, index) => (
                  <Cell key={index} fill={barColors[index % barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* High-Paying Freelance Jobs */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-4">💼 Top 10 High-Paying Freelance Jobs</h2>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={jobsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="job" stroke="#6B7280" angle={-90} height={200} textAnchor="end" interval={0}/>
              <YAxis tickFormatter={(value) => `₹${value / 100000}L`} width={40} stroke="#374151" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="salary">
                {jobsData.map((_, index) => (
                  <Cell key={index} fill={barColors[index % barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
