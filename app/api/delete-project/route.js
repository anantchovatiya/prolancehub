import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";

export async function DELETE(req) {
  try {
    const { title, email } = await req.json(); // Correct way to parse JSON in Next.js API routes

    const db = await connectDB();

    const result = await db.collection("employees").updateOne(
      { email },
      { $pull: { projects: { title } } }
    );
    await db.collection("bids").deleteMany({ title: title });

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "Project not found or already deleted" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Error deleting project" }, { status: 500 });
  }
}
