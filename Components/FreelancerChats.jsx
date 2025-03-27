import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { FaComments } from 'react-icons/fa';
import ChatComponent from './ChatComponent';
import Loading from './Loading';

export default function FreelancerChats() {
    const { data: session } = useSession();
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOngoingProjects();
    }, [session?.user?.email]);

    const fetchOngoingProjects = async () => {
        try {
            const response = await fetch('/api/freelancer/ongoing-projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ freelancerEmail: session?.user?.email }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }

            const data = await response.json();
            setProjects(data.projects);
            setLoading(false);
        } catch (err) {
            setError('Failed to load ongoing projects');
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="p-4 text-red-500">{error}</div>;
    }

    if (projects.length === 0) {
        return <div className="p-4">No ongoing projects found.</div>;
    }

    return (
        <div className="flex h-[calc(100vh-4rem)]">
            {/* Projects List */}
            <div className="w-1/4 border-r border-gray-200 overflow-y-auto">
                <h2 className="p-4 text-lg font-semibold border-b">Ongoing Projects</h2>
                {projects.map((project) => (
                    <div
                        key={project._id}
                        className={`p-4 cursor-pointer hover:bg-gray-50 border-b ${
                            selectedProject?._id === project._id ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => setSelectedProject(project)}
                    >
                        <h3 className="font-medium">{project.title}</h3>
                        <p className="text-sm text-gray-600">Client: {project.employerName}</p>
                        <p className="text-sm text-gray-500 mt-1">
                            Budget: ${project.budget}
                        </p>
                    </div>
                ))}
            </div>

            {/* Chat Area */}
            <div className="flex-1">
                {selectedProject ? (
                    <ChatComponent
                        projectTitle={selectedProject.title}
                        freelancerEmail={session?.user?.email}
                        employerEmail={selectedProject.employerEmail}
                        onClose={() => setSelectedProject(null)}
                    />
                ) : (
                    <div className="h-full flex items-center justify-center text-gray-500">
                        Select a project to start chatting
                    </div>
                )}
            </div>
        </div>
    );
} 
