import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { profile } from "../../data";
import { SocialMorph } from "../../social-preview";
import Aqua from "./variants/Aqua";
import Cobalt from "./variants/Cobalt";
import Coral from "./variants/Coral";
import Night from "./variants/Night";
import Volt from "./variants/Volt";

const variants = [
  { name: "Profile", theme: "profile", component: Cobalt },
  { name: "Terminal", theme: "terminal", component: Coral },
  { name: "Scrapbook", theme: "scrapbook", component: Aqua },
  { name: "Gallery", theme: "gallery", component: Night },
  { name: "Resume", theme: "resume", component: Volt },
];

function initialVariant() {
  const value = Number.parseInt(new URLSearchParams(window.location.search).get("v"), 10);
  return Number.isInteger(value) && value >= 1 && value <= variants.length ? value - 1 : 0;
}

function initialColorMode() {
  const saved = window.localStorage.getItem("portfolio-prototype-color-mode");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function PrototypeGallery() {
  const [active, setActive] = useState(initialVariant);
  const [colorMode, setColorMode] = useState(initialColorMode);
  const [showOpening, setShowOpening] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [replayKey, setReplayKey] = useState(0);
  const pickerRef = useRef(null);
  const highlightRef = useRef(null);
  const itemRefs = useRef([]);
  const variant = variants[active];
  const Variant = variant.component;

  useLayoutEffect(() => {
    document.documentElement.dataset.prototypeTheme = variant.theme;
    return () => { delete document.documentElement.dataset.prototypeTheme; };
  }, [variant.theme]);

  useLayoutEffect(() => {
    document.documentElement.dataset.colorMode = colorMode;
    window.localStorage.setItem("portfolio-prototype-color-mode", colorMode);
    return () => { delete document.documentElement.dataset.colorMode; };
  }, [colorMode]);

  useEffect(() => {
    if (!showOpening) return undefined;
    const timeout = window.setTimeout(() => setShowOpening(false), 1100);
    return () => window.clearTimeout(timeout);
  }, [showOpening]);

  const moveHighlight = useCallback(() => {
    const item = itemRefs.current[active];
    const highlight = highlightRef.current;
    if (!item || !highlight) return;
    highlight.style.width = `${item.offsetWidth}px`;
    highlight.style.transform = `translateX(${item.offsetLeft}px)`;
  }, [active]);

  const select = useCallback((index) => {
    if (index < 0 || index >= variants.length) return;
    window.scrollTo({ top: 0, behavior: "auto" });
    setActive(index);
    setReplayKey((key) => key + 1);
    const url = new URL(window.location.href);
    url.searchParams.set("v", String(index + 1));
    window.history.replaceState(null, "", url);
  }, []);

  const replay = useCallback(() => {
    setReplayKey((key) => key + 1);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShowOpening(true);
    }
  }, []);

  useLayoutEffect(() => {
    moveHighlight();
    const firstFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => pickerRef.current?.setAttribute("data-ready", ""));
    });
    window.addEventListener("resize", moveHighlight);
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.removeEventListener("resize", moveHighlight);
    };
  }, [moveHighlight]);

  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const number = Number.parseInt(event.key, 10);
      if (number >= 1 && number <= variants.length) select(number - 1);
      else if (event.key === "ArrowRight") select((active + 1) % variants.length);
      else if (event.key === "ArrowLeft") select((active - 1 + variants.length) % variants.length);
      else if (event.key === "r" || event.key === "R") replay();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active, replay, select]);

  return (
    <>
      <div id="stage" className={`prototype-stage theme-${variant.theme}`} key={`${active}-${replayKey}`}>
        <Variant
          colorMode={colorMode}
          onToggleColorMode={() => {
            setColorMode((mode) => (mode === "dark" ? "light" : "dark"));
          }}
        />
        <div className="social-dock"><SocialMorph /></div>
      </div>

      <nav ref={pickerRef} className="proto-picker" data-position="top" aria-label="Prototype variants">
        <span ref={highlightRef} className="proto-picker-highlight" aria-hidden="true"></span>
        {variants.map((variant, index) => (
          <button
            ref={(node) => { itemRefs.current[index] = node; }}
            key={variant.name}
            className="proto-picker-item"
            type="button"
            aria-current={active === index ? "true" : undefined}
            data-active={active === index ? "" : undefined}
            onClick={() => select(index)}
          >
            {variant.name}
          </button>
        ))}
        <span className="proto-picker-divider" aria-hidden="true"></span>
        <button
          className="proto-picker-item proto-picker-replay"
          type="button"
          aria-label="Replay animation (R)"
          onClick={replay}
        >
          ↻
        </button>
      </nav>

      {showOpening ? (
        <div
          key={`opening-${active}-${replayKey}`}
          className={`prototype-opening theme-${variant.theme}`}
          aria-hidden="true"
          onAnimationEnd={() => setShowOpening(false)}
        >
          <span>{profile.name}</span>
        </div>
      ) : null}
    </>
  );
}
