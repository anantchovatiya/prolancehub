import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    const { email } = await req.json();

    if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    try {
        await resend.emails.send({
            from: "onboarding@resend.dev", // Use Resend's test email
            to: email,
            subject: "Welcome to ProLanceHub - Your Freelancing Journey Starts Now!",
            html: `
  <div style="text-align: center;">
    <img src="https://res.cloudinary.com/dj8zkgqkg/image/upload/v1741267168/ProlanceHub_gcnq1g.png" alt="ProLanceHub Logo" style="width: 200px; margin-bottom: 20px;" />
    <h2>Thank You for Subscribing to ProLanceHub!</h2>
    <p>We're thrilled to have you on board. ProLanceHub connects freelancers with top clients, offering a seamless job marketplace experience.</p>
    <p>🚀 Start exploring opportunities, showcase your skills, and grow your freelancing career.</p>
    <p>Stay tuned for updates, job alerts, and exclusive freelancer tips!</p>
    <br/>
    <p>Best Regards,</p>
    <p><strong>ProLanceHub Team</strong></p>
    <p style="color: gray; font-size: 12px;">Developed by Anant Chovatiya</p>
  </div>
`
        });

        return NextResponse.json({ message: "Email sent!" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
