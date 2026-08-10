import { useEffect, useLayoutEffect, useState } from "react";
import { profile } from "../../data";
import { SocialMorph } from "../../social-preview";
import PortfolioPrototype from "./PortfolioPrototype";

function initialColorMode() {
  const saved = window.localStorage.getItem("portfolio-prototype-color-mode");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function initialSoundEnabled() {
  return window.localStorage.getItem("portfolio-prototype-click-sound") !== "off";
}

export default function PrototypeGallery() {
  const [colorMode, setColorMode] = useState(initialColorMode);
  const [soundEnabled, setSoundEnabled] = useState(initialSoundEnabled);
  const [showOpening, setShowOpening] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useLayoutEffect(() => {
    document.documentElement.dataset.colorMode = colorMode;
    window.localStorage.setItem("portfolio-prototype-color-mode", colorMode);
    return () => { delete document.documentElement.dataset.colorMode; };
  }, [colorMode]);

  useEffect(() => {
    if (!showOpening) return undefined;
    const timeout = window.setTimeout(() => setShowOpening(false), 1200);
    return () => window.clearTimeout(timeout);
  }, [showOpening]);

  useEffect(() => {
    window.localStorage.setItem(
      "portfolio-prototype-click-sound",
      soundEnabled ? "on" : "off",
    );
  }, [soundEnabled]);

  return (
    <>
      <div id="stage" className="prototype-stage">
        <PortfolioPrototype
          colorMode={colorMode}
          soundEnabled={soundEnabled}
          onToggleColorMode={() => {
            setColorMode((mode) => (mode === "dark" ? "light" : "dark"));
          }}
          onToggleSound={() => setSoundEnabled((enabled) => !enabled)}
        />
        <div className="social-dock"><SocialMorph /></div>
      </div>

      {showOpening ? (
        <div
          className="prototype-opening"
          aria-hidden="true"
          onAnimationEnd={() => setShowOpening(false)}
        >
          <span>{profile.name}</span>
        </div>
      ) : null}
    </>
  );
}
