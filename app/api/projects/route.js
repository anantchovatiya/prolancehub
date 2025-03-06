import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import Employee from "@/models/Employee";

export async function POST(req) {

    try {
      await connectDB();

      const { email,title, description, budget, skillsRequired, deadline } = await req.json();

      if (!title || !description || !budget || !skillsRequired || !deadline) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
      }

      const newProject = {
        title,
        description,
        budget,
        skillsRequired,
        deadline,
        completed: false,
      };


      let employee = await Employee.findOne({email:email});
      if (!employee) {
        return NextResponse.json({ error: "No employees found" }, { status: 404 });
      }

      employee.projects.push(newProject);
      employee.projectsPosted += 1;
      await employee.save();

      return NextResponse.json({ message: "Project posted successfully", project: newProject }, { status: 201 });

    } catch (error) {
      console.error("Error posting project:", error);
      return NextResponse.json({ error: "Failed to post project" }, { status: 500 });
    }
  }

export async function GET() {
  try {
    await connectDB();
    const projects = await Employee.find({ "projects.completed": false }).lean();

    const allProjects = projects.flatMap(employee => employee);
    return NextResponse.json({ projects: allProjects }, { status: 200 });

  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
