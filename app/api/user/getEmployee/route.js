import connectDB from "@/db/connectDB";
import Employee from "@/models/Employee";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return new Response(JSON.stringify({ message: "Email is required" }), {
      status: 400,
    });
  }

  const user = await Employee.findOne({ email });

  if (!user) {
    return new Response(JSON.stringify({ message: "Employee not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(user), { status: 200 });
}
