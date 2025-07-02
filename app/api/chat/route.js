import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { messages } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    // Validate input
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid input. Please ask a freelancing-related question." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const lastMessage = messages[messages.length - 1];

    if (!lastMessage || !lastMessage.content || typeof lastMessage.content !== "string") {
      return new Response(JSON.stringify({ error: "Invalid input. Please ask a freelancing-related question." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const userMessage = lastMessage.content.toLowerCase();

    // Freelancing keyword filter
    const freelancingKeywords = [
      "freelancing", "freelancer", "self-employed", "independent contractor", "side hustle",
      "gig", "gig economy", "remote work", "work from home", "online work", "digital nomad",
      "upwork", "fiverr", "freelancer.com", "toptal", "peopleperhour", "guru", "99designs",
      "truelancer", "flexjobs", "we work remotely", "client", "proposal", "contract", "negotiation",
      "payment", "invoice", "escrow", "terms of service", "non-disclosure agreement", "revision",
      "scope creep", "milestone", "deadline", "deliverables", "portfolio", "resume", "skills",
      "certification", "experience", "rate", "hourly rate", "fixed price", "per project", "job",
      "projects", "bidding", "interview", "cover letter", "personal branding", "networking", "linkedin",
      "cold emailing", "testimonials", "seo", "social media marketing", "content writing", "copywriting",
      "graphic design", "web development", "ui/ux design", "coding", "app development", "video editing",
      "pricing", "budgeting", "expenses", "taxes", "freelancer taxes", "business license", "vat",
      "gst", "irs", "deductions", "accounting", "bank transfer", "paypal", "stripe", "wise",
      "time management", "productivity", "task management", "crm", "asana", "trello", "notion",
      "clickup", "zoom", "slack", "google workspace", "dropbox", "canva", "adobe suite"
    ];

    const isFreelanceQuestion = freelancingKeywords.some(keyword =>
      userMessage.includes(keyword)
    );

    if (!isFreelanceQuestion) {
      return Response.json({
        reply: "I'm here to assist with freelancing topics only. Please ask something related to freelancing."
      });
    }

    // Retry wrapper for rate limits
    async function generateWithRetry(model, userInput, retries = 1, delayMs = 33000) {
      try {
        const chat = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: userInput }] }],
        });
        return chat.response.candidates[0].content.parts[0].text;
      } catch (error) {
        if (error.status === 429 && retries > 0) {
          console.warn(`Rate limit hit. Retrying in ${delayMs / 1000}s...`);
          await new Promise(res => setTimeout(res, delayMs));
          return generateWithRetry(model, userInput, retries - 1, delayMs * 2);
        }
        throw error;
      }
    }

    // Generate AI response with retry logic
    const reply = await generateWithRetry(model, lastMessage.content);

    return Response.json({ reply });

  } catch (error) {
    console.error("Chatbot API Error:", error);

    if (error.status === 429) {
      return Response.json({
        error: "Our chatbot has reached its request limit to Google Gemini. Please try again after a minute."
      }, { status: 429 });
    }

    return Response.json({ error: error.message }, { status: error.status || 500 });
  }
}
