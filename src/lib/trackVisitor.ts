import { supabase } from "./supabase";

interface VisitorData {
  page_url: string;
  user_agent?: string;
  ip_address?: string;
}

export const trackVisitor = async (data: VisitorData) => {
  try {
    const { error } = await supabase.from("visitors").insert({
      page_url: data.page_url,
      user_agent: data.user_agent || navigator.userAgent,
      ip_address: data.ip_address || "Unknown", // Client-side limitation
      visited_at: new Date().toISOString(), // Explicitly set timestamp
    });

    if (error) {
      console.error("Error tracking visitor:", error.message);
    }
  } catch (err) {
    console.error("Unexpected error tracking visitor:", err);
  }
};