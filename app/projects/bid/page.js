"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getclient } from "@/actions/getclient";
import BidNow from "@/Components/Bidform";
import Loading from "@/Components/Loading";

export default function Page() {
    const { data: session, status } = useSession();
    const searchParams = useSearchParams();
    const router = useRouter();

    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(true);

    const title = searchParams.get("title");
    const email = searchParams.get("email");

    useEffect(() => {

        if (!session) {
            router.push("/login");
            return;
        }

        async function fetchClientData() {
            try {
              const clientData = await getclient({ email });
              const foundproject = clientData.projects?.find(
                (proj) => proj.title.toLowerCase() === title.toLowerCase()
            );
            setProject(foundproject);
            } catch (error) {
              console.error('Error fetching client:', error);
            } finally {
              setLoading(false);
            }
          }

          fetchClientData();
        }, [email]);

    if (status === "loading" || loading) {
        return <Loading />
    }

    if (!project) {
        return <div className="p-6 bg-gray-100 min-h-screen text-center text-red-500 font-semibold">
            No project found with the title "{title}".
        </div>;
    }

    return (
        <div className="p-6 bg-gray-100 flex items-center justify-center mx-auto">
            <div className="p-4 bg-white shadow-md rounded-lg w-1/2 ml-5">
            <h1 className="text-2xl font-bold mb-4">Project Details</h1>
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <p className="text-gray-600">{project.description}</p>
                <br />
                <p className="text-blue-600 font-medium">Budget: ${project.budget}</p>
                <br />
                <p className="text-gray-700">Skills Required: {project.skillsRequired.join(", ")}</p>
                <br />
                <p className="text-gray-500">Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
                <p className={`text-sm font-bold ${project.completed ? "text-green-600" : "text-red-600"}`}>
                    {project.completed ? "Completed" : "Ongoing"}
                </p>
            </div>
            <div className="w-1/2">
            <BidNow title={project.title} email={email}/>
            </div>
        </div>


    );
}
