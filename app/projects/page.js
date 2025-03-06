"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/Components/Loading";
export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const role = session?.user?.role;
  const router = useRouter();
  const handlebid = (title, email) => {
      router.push(`/projects/bid?title=${title}&email=${email}`);

  }
  const [expanded, setExpanded] = useState(null);

  const toggleDetails = (index) => {
    setExpanded(expanded === index ? null : index);
  };
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        const projects = data.projects.flatMap(employee =>
          employee.projects.map(project => ({
            ...project,
            employeeName: employee.name,
            employeeEmail: employee.email
          }))
        );
        setProjects(projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <Loading />;
  if (!projects.length) return <p className="text-center mt-10">No live projects available.</p>;

    const filteredProjects = projects.filter((project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="max-w-8xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Live Projects</h2>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by project title..."
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600 outline-none transition"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <h1 className="text-lg m-2">🟢Active Projects : {projects.length}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <div
            key={index}
            className={`border p-6 rounded-lg shadow-lg bg-white hover:shadow-xl transition-all duration-300 relative overflow-hidden 
            ${expanded === index ? "h-auto" : "h-[250px]"} flex flex-col`}
          >
            <div className="flex flex-col justify-center h-full">
              <div className="md:h-1/3 flex"><h3 className="text-xl md:text-2xl font-bold text-gray-900">{project.title}</h3>
              </div>
              <div className="w-full h-0 border border-slate-400"></div>
              <div className="h-1/3 flex flex-col">
                <h4 className="text-lg font-semibold text-gray-700">{project.employeeName}</h4>
                <h5 className="text-sm text-gray-500 mt-1">{project.employeeEmail}</h5>
              </div>


              <div className="h-1/3 w-full flex gap-4">
                <button
                  onClick={() => toggleDetails(index)}
                  className="mt-4 flex items-center justify-center gap-2 w-full sm:w-1/2 bg-gray-600 hover:bg-gray-800 
             active:scale-95 transition-all text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg h-12"
                >
                  {expanded === index ? "Hide Details" : "View Details"}
                  <span className={`transition-transform duration-300 ${expanded === index ? "rotate-180" : "rotate-0"}`}>
                    ⬇️
                  </span>
                </button>

                {role === "freelancer" && (

                  <button
                    onClick={() => handlebid(project.title, project.employeeEmail)}
                    className="mt-4 flex items-center justify-center gap-2 w-full sm:w-1/2 bg-gray-600 hover:bg-gray-800 
             active:scale-95 transition-all text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg h-12"
                  >
                    Bid Now
                  </button>

                )}

              </div>
            </div>
            <div
              className={`transition-[max-height] duration-500 ease-in-out px-1 overflow-y-scroll scrollbar-thin ${expanded === index ? "max-h-[500px]" : "max-h-0"
                }`}
            >
              <div className="mt-0 border-t pt-4">
                <p className="text-gray-600 mt-2">{project.description}</p>
                <p className="mt-3">
                  <strong>Budget:</strong> <span className="text-blue-600">${project.budget}</span>
                </p>
                <p className="mt-1">
                  <strong>Skills:</strong> {project.skillsRequired.join(", ")}
                </p>
                <p className="mt-1">
                  <strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}
                </p>


              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}
