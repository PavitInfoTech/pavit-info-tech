import { getAuthTokenStorage } from "./auth-storage";

const API_BASE_URL = "https://api.pavitinfotech.com";

interface ApiSuccess<T> {
  status: "success";
  message: string;
  data: T;
  code: number;
  timestamp: string;
}

interface ApiErrorPayload {
  status: "error";
  message: string;
  errors: Record<string, string[]> | null;
  code: number;
  timestamp: string;
}

export class AiApiError extends Error {
  payload: ApiErrorPayload;

  constructor(payload: ApiErrorPayload) {
    super(payload.message);
    this.payload = payload;
  }
}

// System prompt that establishes the AI as PavitInfoTech's assistant
const SYSTEM_CONTEXT = `You are PAVIT AI, the intelligent virtual assistant for PavitInfoTech - a leading IoT infrastructure monitoring platform. You're helpful, professional, and knowledgeable about IoT technology.

ABOUT PAVITINFOTECH:
PavitInfoTech provides enterprise-grade IoT monitoring solutions that help businesses manage their connected device infrastructure with real-time insights, predictive maintenance, and AI-powered anomaly detection.

KEY FEATURES YOU CAN DISCUSS:
• Real-Time Device Monitoring - Track device status, health, and performance metrics in real-time
• AI Anomaly Detection - Machine learning algorithms detect unusual patterns before they become problems
• Predictive Maintenance - Reduce downtime by predicting equipment failures before they occur
• Digital Twin Visualization - Create virtual replicas of physical devices for simulation and analysis
• Device Health Scoring - Comprehensive health metrics using temperature, CPU, memory, and connection data
• Secure Cloud Pipeline - Enterprise-grade security with encrypted data transmission
• Alert & Notification System - Customizable alerts via email, SMS, and in-app notifications
• Analytics & Reporting - Historical data analysis with exportable reports

PRICING PLANS:
• Starter ($299/month): Up to 50 devices, real-time monitoring, basic analytics, email support
• Pro ($999/month): Up to 500 devices, predictive maintenance, anomaly detection, priority support
• Enterprise (Custom pricing): Unlimited devices, digital twins, dedicated support, custom integrations, SLA

CONTACT & SUPPORT:
• Email: support@pavitinfotech.com
• Sales: sales@pavitinfotech.com
• Website: https://pavitinfotech.com
• Demo requests available on the website

GUIDELINES FOR RESPONSES:
1. Be concise but informative - keep responses focused and helpful
2. Use bullet points for lists when appropriate
3. Suggest relevant features or pages when helpful
4. For complex technical questions, recommend scheduling a demo
5. Always be professional and friendly
6. If you don't know something specific, admit it and offer to connect them with sales/support
7. For pricing inquiries beyond the listed plans, suggest contacting sales
8. Encourage users to sign up for a free trial or schedule a demo

Now respond to the user's message:`;

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface AiGenerateResponse {
  // The AI provider response structure may vary, but typically includes:
  choices?: Array<{
    message?: { content: string };
    text?: string;
  }>;
  content?: string;
  response?: string;
  text?: string;
  // Fallback for any other structure
  [key: string]: unknown;
}

/**
 * Build the full prompt with conversation history
 */
function buildPromptWithHistory(
  userMessage: string,
  conversationHistory: ChatMessage[]
): string {
  let prompt = SYSTEM_CONTEXT + "\n\n";

  // Add conversation history for context (last 10 messages to stay within token limits)
  const recentHistory = conversationHistory.slice(-10);
  if (recentHistory.length > 0) {
    prompt += "CONVERSATION HISTORY:\n";
    for (const msg of recentHistory) {
      const role = msg.role === "user" ? "User" : "Assistant";
      prompt += `${role}: ${msg.content}\n`;
    }
    prompt += "\n";
  }

  prompt += `User: ${userMessage}\nAssistant:`;
  return prompt;
}

/**
 * Extract text response from various AI provider response formats
 */
function extractResponseText(data: AiGenerateResponse): string {
  // Try common response structures
  if (data.choices?.[0]?.message?.content) {
    return data.choices[0].message.content;
  }
  if (data.choices?.[0]?.text) {
    return data.choices[0].text;
  }
  if (typeof data.content === "string") {
    return data.content;
  }
  if (typeof data.response === "string") {
    return data.response;
  }
  if (typeof data.text === "string") {
    return data.text;
  }

  // Fallback: stringify whatever we got
  return JSON.stringify(data);
}

/**
 * Generate AI response for the chatbot
 */
export async function generateChatResponse(
  userMessage: string,
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  const storage = getAuthTokenStorage();
  const token = storage.getToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // Add auth token if user is logged in (authenticated requests get higher rate limits)
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const prompt = buildPromptWithHistory(userMessage, conversationHistory);

  const res = await fetch(`${API_BASE_URL}/ai/generate`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      prompt,
      max_tokens: 512,
    }),
  });

  const raw = (await res.json()) as unknown;

  if (!res.ok) {
    const errorPayload = raw as ApiErrorPayload;
    throw new AiApiError(errorPayload);
  }

  const json = raw as ApiSuccess<AiGenerateResponse>;
  return extractResponseText(json.data);
}

/**
 * Fallback responses when AI API is unavailable
 */
export function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  const fallbackPatterns: { pattern: RegExp; response: string }[] = [
    {
      pattern: /hello|hi|hey|greetings/i,
      response:
        "Hello! Welcome to PavitInfoTech. I'm currently operating in offline mode, but I can still help with basic questions about our IoT monitoring platform. What would you like to know?",
    },
    {
      pattern: /pricing|cost|price|plan/i,
      response:
        "We offer three plans:\n\n• **Starter** ($299/month) - Up to 50 devices, real-time monitoring\n• **Pro** ($999/month) - Up to 500 devices, predictive maintenance\n• **Enterprise** (Custom) - Unlimited devices, digital twins\n\nVisit our pricing page or contact sales@pavitinfotech.com for details!",
    },
    {
      pattern: /feature|capability|what can|what do/i,
      response:
        "PavitInfoTech offers:\n\n• Real-time device monitoring\n• AI-powered anomaly detection\n• Predictive maintenance\n• Digital twin visualization\n• Device health scoring\n• Customizable alerts\n\nWant to learn more about any specific feature?",
    },
    {
      pattern: /demo|trial|try/i,
      response:
        "Great interest! You can:\n\n1. Start a free trial on our Get Started page\n2. Schedule a personalized demo with our team\n3. Contact sales@pavitinfotech.com\n\nWe'd love to show you what PavitInfoTech can do!",
    },
    {
      pattern: /support|help|contact|email/i,
      response:
        "Need help? Here's how to reach us:\n\n• Support: support@pavitinfotech.com\n• Sales: sales@pavitinfotech.com\n• Live chat: Right here!\n\nWhat can I assist you with?",
    },
    {
      pattern: /device|monitor|sensor|iot/i,
      response:
        "Our IoT monitoring platform supports a wide range of devices including sensors, gateways, industrial equipment, and smart devices. We provide real-time health monitoring, connection status, and performance analytics for all your connected infrastructure.",
    },
  ];

  for (const { pattern, response } of fallbackPatterns) {
    if (pattern.test(lowerMessage)) {
      return response;
    }
  }

  return "Thank you for your message! I'm currently in offline mode, but I'd love to help. For immediate assistance, please email support@pavitinfotech.com or try again in a moment when our AI service is back online.";
}
