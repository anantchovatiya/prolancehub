import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { messages } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
      // Ensure messages array is valid and has a last message
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: "Invalid input. Please ask a freelancing-related question." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const lastMessage = messages[messages.length - 1];

  // Ensure the message has content
  if (!lastMessage || !lastMessage.content || typeof lastMessage.content !== "string") {
    return new Response(JSON.stringify({ error: "Invalid input. Please ask a freelancing-related question." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const userMessage = lastMessage.content.toLowerCase();
    const freelancingKeywords = [
        // General Freelancing Terms
        "freelancing", "freelancer", "self-employed", "independent contractor", "side hustle",
        "gig", "gig economy", "remote work", "work from home", "online work", "digital nomad",

        // Platforms
        "upwork", "fiverr", "freelancer.com", "toptal", "peopleperhour", "guru", "99designs",
        "truelancer", "flexjobs", "we work remotely",

        // Client & Project Management
        "client", "proposal", "contract", "negotiation", "payment", "invoice", "escrow", "terms of service",
        "non-disclosure agreement", "revision", "scope creep", "milestone", "deadline", "deliverables",

        // Skills & Services
        "portfolio", "resume", "skills", "certification", "experience", "rate", "hourly rate",
        "fixed price", "per project", "job", "projects", "bidding", "interview", "cover letter",

        // Marketing & Growth
        "personal branding", "networking", "linkedin", "cold emailing", "testimonials",
        "seo", "social media marketing", "content writing", "copywriting", "graphic design",
        "web development", "ui/ux design", "coding", "app development", "video editing",

        // Finance & Taxes
        "pricing", "budgeting", "expenses", "taxes", "freelancer taxes", "business license",
        "vat", "gst", "irs", "deductions", "accounting", "bank transfer", "paypal", "stripe", "wise",

        // Productivity & Tools
        "time management", "productivity", "task management", "crm", "asana", "trello", "notion",
        "clickup", "zoom", "slack", "google workspace", "dropbox", "canva", "adobe suite"
      ];


      // Check if the question is related to freelancing
      const isFreelanceQuestion = freelancingKeywords.some((keyword) => userMessage.includes(keyword));

      if (!isFreelanceQuestion) {
        return Response.json({ reply: "I'm here to assist with freelancing topics only. Please ask something related to freelancing." });
      }

    const chat = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: messages[messages.length - 1].content }] }],
    });

    return Response.json({ reply: chat.response.candidates[0].content.parts[0].text });
  } catch (error) {
    console.error("Chatbot API Error:", error);
    return Response.json({ error: error.message }, { status: error.status || 500 });
  }
}
