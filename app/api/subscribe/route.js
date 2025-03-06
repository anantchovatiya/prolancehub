import axios from "axios";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email", // ✅ Correct endpoint for sending emails
      {
        sender: { name: "ProlanceHub", email: process.env.BREVO_EMAIL }, // ✅ Must be a verified sender
        to: [{ email: email, name: "Recipient" }],
        subject: "Welcome to ProLanceHub - Your Freelancing Journey Starts Now!",
            htmlContent: `
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
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return new Response(JSON.stringify({ message: "Email sent successfully!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Brevo API Error:", error.response?.data || error.message);
    return new Response(
      JSON.stringify({ error: error.response?.data?.message || "Failed to send email" }),
      {
        status: error.response?.status || 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
