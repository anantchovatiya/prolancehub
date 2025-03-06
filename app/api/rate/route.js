import connectDB from "@/db/connectDB";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, rating } = body;

    if (!email || rating == null) {
      return new Response(JSON.stringify({ error: "Invalid input" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const db = await connectDB();
    const updatedFreelancer = await db.collection("users").updateOne(
      { email: email },
      { $push: { ratings: rating } }
    );

    return new Response(JSON.stringify({ success: true, updatedFreelancer }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error updating rating:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
