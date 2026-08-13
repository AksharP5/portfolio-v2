import { useCallback, useEffect, useLayoutEffect, useState } from "react";
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
  const [openingEnabled] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useLayoutEffect(() => {
    document.documentElement.dataset.colorMode = colorMode;
    window.localStorage.setItem("portfolio-prototype-color-mode", colorMode);
    return () => { delete document.documentElement.dataset.colorMode; };
  }, [colorMode]);

  useEffect(() => {
    window.localStorage.setItem(
      "portfolio-prototype-click-sound",
      soundEnabled ? "on" : "off",
    );
  }, [soundEnabled]);

  const replayOpening = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setOpeningRun((run) => run + 1);
  }, []);

  return (
    <>
      <div
        id="stage"
        className="prototype-stage"
        data-opening={openingEnabled ? "" : undefined}
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

      {openingEnabled ? (
        <OpeningSequence key={openingRun} />
      ) : null}
    </>
  );
}
