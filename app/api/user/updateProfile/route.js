import connectDB from "@/db/connectDB";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(req) {
  try {
    await connectDB();

    // Get user session
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const { name, bio, skills, profilePicture, rate, title, portfolio } = await req.json();

    // Update user data in MongoDB
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email }, // Find user by email
      { name, bio, skills, profilePicture, rate, title, portfolio }, // Update user data
      { new: true }
    );

    if (!updatedUser) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Profile updated successfully" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error updating profile" }), {
      status: 500,
    });
  }
}
