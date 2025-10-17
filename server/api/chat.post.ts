export default defineEventHandler(async (event) => {
  const body = await readBody<{ message: string }>(event);

  const config = useRuntimeConfig();
  const GEMINI_API_KEY = config.geminiApiKey;

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
                parts: [{ text: body.message }],
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

      if (error?.status === 429 && attempt < maxRetries - 1) {
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`Rate limited, retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        attempt++;
        continue;
      }

      throw createError({
        statusCode: 500,
        statusMessage: "Something went wrong",
      });
    }
  }
});
