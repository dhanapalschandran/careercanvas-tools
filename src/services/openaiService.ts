
import { toast } from "sonner";

// In a real application, this would come from environment variables
// This is a temporary solution for demo purposes
const OPENAI_API_KEY = ""; // You'll need to input your API key here

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export const generateChatResponse = async (messages: ChatMessage[]): Promise<string> => {
  try {
    if (!OPENAI_API_KEY) {
      toast.error("Please provide an OpenAI API key");
      return "Please provide an OpenAI API key to use the AI assistant.";
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // Using a modern model that's fast and affordable
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API error:", error);
      throw new Error(error.error?.message || "Failed to generate response");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating response:", error);
    toast.error("Failed to generate response. Please try again.");
    return "Sorry, I encountered an error while processing your request. Please try again.";
  }
};
