import { supabase } from "./supabase";

interface VisitorData {
  page_url: string;
  user_agent?: string;
}

export const trackVisitor = async (data: VisitorData) => {
  try {
    // Fetch location from ipify
    const geoRes = await fetch("https://geo.ipify.org/api/v2/country,city?apiKey=at_6Lc9Mw61xxMPLBNE6BWq8cTf3sbza");
    const geo = await geoRes.json();

    const location = {
      ip: geo.ip || "Unknown",
      country: geo.location?.country || null,
      region: geo.location?.region || null,
      city: geo.location?.city || null,
      lat: geo.location?.lat || null,
      lng: geo.location?.lng || null,
      timezone: geo.location?.timezone || null,
      isp: geo.isp || null,
    };

    const screen = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const { error } = await supabase.from("visitors").insert({
      page_url: data.page_url,
      user_agent: data.user_agent || navigator.userAgent,
      ip_address: location.ip,
      country: location.country,
      region: location.region,
      city: location.city,
      latitude: location.lat,
      longitude: location.lng,
      timezone: location.timezone,
      isp: location.isp,
      language: navigator.language,
      referrer: document.referrer,
      screen_width: screen.width,
      screen_height: screen.height,
      visited_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Error saving visitor to Supabase:", error.message);
    }
  } catch (err) {
    console.error("Error tracking visitor:", err);
  }
};
