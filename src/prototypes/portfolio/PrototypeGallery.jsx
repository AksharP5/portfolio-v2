import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { profile } from "../../data";
import { SocialMorph } from "../../social-preview";
import OpeningSequence from "./OpeningSequence";
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
  const [openingRun, setOpeningRun] = useState(0);
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
    const fallback = window.setTimeout(() => setShowOpening(false), 2400);
    return () => window.clearTimeout(fallback);
  }, [openingRun, showOpening]);

  useEffect(() => {
    window.localStorage.setItem(
      "portfolio-prototype-click-sound",
      soundEnabled ? "on" : "off",
    );
  }, [soundEnabled]);

  const finishOpening = useCallback(() => setShowOpening(false), []);
  const replayOpening = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setOpeningRun((run) => run + 1);
    setShowOpening(true);
  }, []);

  return (
    <>
      <div
        id="stage"
        className="prototype-stage"
        data-opening={showOpening ? "" : undefined}
      >
        <PortfolioPrototype
          colorMode={colorMode}
          soundEnabled={soundEnabled}
          onToggleColorMode={() => {
            setColorMode((mode) => (mode === "dark" ? "light" : "dark"));
          }}
          onReplayOpening={replayOpening}
          onToggleSound={() => setSoundEnabled((enabled) => !enabled)}
        />
        <div className="social-dock"><SocialMorph /></div>
      </div>

      {showOpening ? (
        <OpeningSequence
          key={openingRun}
          name={profile.name}
          onComplete={finishOpening}
        />
      ) : null}
    </>
  );
}
