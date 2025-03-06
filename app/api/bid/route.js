import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import Bid from "@/models/Bid";

export async function POST(req) {
  try {
    await connectDB();
    const { title, femail, email, amount, deltime, coverletter, phoneNumber } = await req.json();

    const newBid = new Bid({
      title,
      femail,
      email,
      amount,
      deltime,
      coverletter,
      phoneNumber
    });

    await newBid.save();
    return NextResponse.json({ message: "Bid placed successfully" }, { status: 201 });

  } catch (error) {
    console.error("Error submitting bid:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
