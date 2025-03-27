import { useState } from "react";

export default function ProjectVisualizer() {
  const [projectDescription, setProjectDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [projectPlan, setProjectPlan] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-project-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: projectDescription }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate project plan');
      }

      const data = await response.json();
      setProjectPlan(data);
    } catch (err) {
      setError('Failed to generate project plan. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">🗺️ AI Project Visualizer</h2>
        <p className="text-gray-600">
          Enter your project description, and our AI will analyze it to generate a comprehensive project roadmap with detailed milestones and resource allocation.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="mb-8">
        <div className="mb-4">
          <label htmlFor="projectDescription" className="block text-gray-700 font-medium mb-2">
            Project Description
          </label>
          <textarea
            id="projectDescription"
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
            placeholder="Describe your project in detail. For example: 'I need a responsive e-commerce website with product catalog, shopping cart, payment integration, and user accounts.'"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 ease-in-out flex items-center justify-center"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Project Map...
            </>
          ) : (
            "Generate Project Map"
          )}
        </button>
      </form>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {projectPlan && (
        <div className="project-plan space-y-8 border-t pt-8">
          {/* Project Overview */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">{projectPlan.title}</h3>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {projectPlan.type}
              </span>
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                {projectPlan.timeline} weeks
              </span>
            </div>
          </div>

          {/* Milestones and Tasks */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Project Roadmap</h4>
            <div className="space-y-4">
              {projectPlan.milestones.map((milestone, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                    </div>
                    <h5 className="font-semibold text-gray-800">{milestone.phase}</h5>
                  </div>
                  <ul className="space-y-2 pl-11">
                    {milestone.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-start gap-2 text-gray-600">
                        <svg className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Project Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Potential Risks */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-2 mb-4">
                <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h4 className="text-lg font-semibold text-gray-800">Risk Assessment</h4>
              </div>
              <ul className="space-y-3">
                {projectPlan.risks.map((risk, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600">
                    <svg className="h-4 w-4 text-red-400 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="text-sm">{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Team */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-2 mb-4">
                <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h4 className="text-lg font-semibold text-gray-800">Team Composition</h4>
              </div>
              <ul className="space-y-3">
                {projectPlan.resources.map((resource, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600">
                    <svg className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm">{resource}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
