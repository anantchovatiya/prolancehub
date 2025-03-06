import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// POST API to add a review
export async function POST(req) {
  const session = await getServerSession(authOptions);
  const sesemail = session.user.email;
  try {
    await connectDB(); // Connect to database

    const { email, comment } = await req.json();

    if (!email || !comment) {
      return NextResponse.json({ error: "Email and comment are required" }, { status: 400 });
    }

    // Find the freelancer by email
    const freelancer = await User.findOne({ email });
    // const sesemail = session.user.email;
    if (!freelancer) {
      return NextResponse.json({ error: "Freelancer not found" }, { status: 404 });
    }
    const newreview = {
        email: sesemail,
        comment
    }

    freelancer.reviews.push(newreview);
    await freelancer.save();
    return NextResponse.json({
      success: true,
      message: "Review added successfully",
    }, { status: 200 });

  } catch (error) {
    console.error("Error adding review:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
