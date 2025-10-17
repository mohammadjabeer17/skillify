import { defineEventHandler, readBody, createError } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ message: string }>(event);
  const message = (body?.message || "").toString();

  const config = useRuntimeConfig();
  const GEMINI_API_KEY = config.geminiApiKey;

  // Simple local fallback responder
  const localResponder = (msg: string) => {
    const lower = msg.toLowerCase();
    if (!msg || msg.trim().length === 0) return "Please ask a question so I can help.";
    if (/(hello|hi|hey)\b/.test(lower)) return "Hi there! How can I help you today?";
    if (/(help|how|what|why|explain)\b/.test(lower))
      return "I can help explain concepts, debug code snippets, or give step-by-step instructions. Ask me something specific.";
    if (/code|debug|fix/.test(lower))
      return "Share the code snippet and explain the problem — I'll try to help debug or suggest fixes.";
    if (/price|cost|payment|razorpay/.test(lower))
      return "This app uses Razorpay for payments. If you want, ask how the payment flow works or try making a test payment.";
    // default echo-like helpful reply
    return `I understood: "${msg}". Could you add more details or ask a specific follow-up?`;
  };

  // If no GEMINI key is configured, use local responder
  if (!GEMINI_API_KEY) {
    console.log("GEMINI_API_KEY not configured — using local responder");
    return { reply: localResponder(message) };
  }

  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      interface GeminiResponse {
        candidates?: Array<{
          content?: {
            parts?: Array<{
              text?: string;
            }>;
          };
        }>;
      }

      const response: GeminiResponse = await $fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": GEMINI_API_KEY,
          },
          body: {
            contents: [
              {
                parts: [{ text: message }],
              },
            ],
          },
        }
      );

      // @ts-ignore
      const botReply =
        response?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I couldn't understand.";

      return { reply: botReply };
    } catch (error: any) {
      console.error(`Gemini API error (attempt ${attempt + 1}):`, error);

      // If rate limited, retry with exponential backoff
      const status = error?.status || error?.response?.status || error?.statusCode;
      if (status === 429 && attempt < maxRetries - 1) {
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`Rate limited, retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        attempt++;
        continue;
      }

      // Fallback to local responder on forbidden or other errors
      console.log("Falling back to local responder due to Gemini error");
      return { reply: localResponder(message) };
    }
  }

  // As a last resort
  return { reply: localResponder(message) };
});