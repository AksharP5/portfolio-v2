import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { SocialDocument, SocialHeader, SocialMorph } from "./social-preview";

export default function App() {
  return (
    <>
      <main className="portfolio-page">
        <SocialHeader />
        <SocialDocument />
        <div className="social-dock"><SocialMorph /></div>
      </main>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
