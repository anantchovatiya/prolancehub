import { useState } from "react";

const skillsList = [
  "Python", "Java", "C++", "R", "SQL", "AWS", "Docker", "Kubernetes",
  "React", "JavaScript", "TypeScript", "Node.js", "Express", "PostgreSQL",
  "TensorFlow", "PyTorch", "OpenCV", "Azure", "Penetration Testing", "OWASP",
  "MySQL", "MongoDB", "Unity", "Unreal Engine", "C#", "Swift", "Go",
  "Ruby on Rails", "Scala", "Perl", "Flutter", "Django", "Flask",
  "Spring Boot", "FastAPI", "GraphQL", "REST API", "Web Scraping",
  "Machine Learning", "Deep Learning", "Computer Vision", "NLP", "Data Engineering",
  "Data Analysis", "Big Data", "ETL", "Hadoop", "Spark", "Kafka", "Redis",
  "Firebase", "Elasticsearch", "Jenkins", "CI/CD", "Terraform", "Ansible",
  "Linux Administration", "Bash Scripting", "Cybersecurity", "Ethical Hacking",
  "Incident Response", "Cloud Security", "Blockchain", "Solidity", "Smart Contracts",
  "Rust", "DevSecOps", "Metasploit", "Reverse Engineering", "WireShark",
  "Zabbix", "Nagios", "Puppet", "Vagrant", "AR/VR Development", "3D Modeling",
  "Game Design", "UI/UX Design", "Adobe XD", "Figma", "Photoshop", "Illustrator",
  "Video Editing", "Motion Graphics", "SEO", "Content Writing", "Technical Writing",
  "Social Media Marketing", "Affiliate Marketing", "Google Ads", "Facebook Ads",
  "Salesforce", "Power BI", "Tableau", "Excel", "ERP Systems", "SAP",
  "CRM Development"
];

export default function SalaryPredictor() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [experience, setExperience] = useState(5);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSkillChange = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("https://salaryprediction-98ev.onrender.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skills: selectedSkills, experience }),
    });

    const data = await response.json();
    setPrediction(data.predicted_salary);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 mt-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
      <div className="text-center mb-6">
  <h1 className="text-3xl font-bold text-gray-800">📊 AI-Powered Salary Estimator</h1>
  <p className="mt-2 text-gray-600 text-lg max-w-lg mx-auto">
    Leverage cutting-edge <span className="font-semibold text-blue-900">AI/ML models</span> to estimate your potential salary based on your skills and experience.
    Stay ahead in your career with data-driven insights! 🚀
  </p>
</div>


        <form onSubmit={handleSubmit}>
          {/* Skills Selection */}
          <label className="block mb-3 font-semibold text-gray-700">Select Skills:</label>
          <div
  className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4 max-h-48 overflow-y-auto border p-3 rounded-lg 
             scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 hover:scrollbar-thumb-blue-600">


            {skillsList.map((skill) => (
              <label
              key={skill}
              className="flex items-center space-x-3 bg-white shadow-sm border rounded-lg p-2 hover:bg-blue-50 transition duration-200 ease-in-out cursor-pointer"
            >
              <input
                type="checkbox"
                value={skill}
                checked={selectedSkills.includes(skill)}
                onChange={() => handleSkillChange(skill)}
                className="w-5 h-5 accent-blue-500 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <span className="text-gray-700 text-[12px] md:text-lg">{skill}</span>
            </label>

            ))}
          </div>

          {/* Experience Slider */}
          <div className="relative w-full mb-4">
  <label className="block mb-3 font-semibold text-gray-700">
    Years of Experience: {experience}
  </label>

  <div className="relative">
    {/* Experience Slider */}
    <input
      type="range"
      min="1"
      max="20"
      step="1"
      value={experience}
      onChange={(e) => setExperience(e.target.value)}
      className="w-full cursor-pointer accent-gray-800 appearance-none bg-gray-300 rounded-lg h-2"
    />
  </div>
</div>


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-600 hover:bg-gray-800 text-white py-3 rounded-lg font-bold mt-5 transition duration-300"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict Salary"}
          </button>
        </form>

        {/* Predicted Salary Output */}
        {prediction !== null && (
          <div className="mt-6 text-center">
            <p className="text-xl font-semibold text-green-700">Predicted Salary: ₹{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
}