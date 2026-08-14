import { Analytics } from "@vercel/analytics/react";
import ResumePage from "./resume";
import { SocialDocument, SocialHeader, SocialMorph } from "./social-preview";

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "");

  if (path === "/resume") {
    return (
      <>
        <ResumePage />
        <Analytics />
      </>
    );
  }

  return (
    <>
      <main className="portfolio-page">
        <SocialHeader />
        <SocialDocument />
        <div className="social-dock"><SocialMorph /></div>
      </main>
      <Analytics />
    </>
  );
}
