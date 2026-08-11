import PropTypes from "prop-types";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import CoinLift from "../feedback/CoinLift";
import Echo from "../feedback/Echo";
import Flip from "../feedback/Flip";
import Ink from "../feedback/Ink";
import Pinpoint from "../feedback/Pinpoint";
import {
  playCoinLiftSound,
  playEchoSound,
  playFlipSound,
  playInkSound,
  playPinpointSound,
  playTrailSound,
} from "../feedback/sounds";
import Trail from "../feedback/Trail";
import Timeline from "./Timeline";

const variants = [
  { shortName: "E", name: "Echo", Effect: Echo, playSound: playEchoSound },
  { shortName: "C", name: "Coin lift", Effect: CoinLift, playSound: playCoinLiftSound },
  { shortName: "Pin", name: "Pinpoint", Effect: Pinpoint, playSound: playPinpointSound },
  { shortName: "Flip", name: "Flip", Effect: Flip, playSound: playFlipSound },
  { shortName: "Zip", name: "Trail", Effect: Trail, playSound: playTrailSound },
  { shortName: "Ink", name: "Ink line", Effect: Ink, playSound: playInkSound },
];

function initialVariant() {
  const value = Number(new URLSearchParams(window.location.search).get("v"));
  return Number.isInteger(value) && value >= 1 && value <= variants.length ? value - 1 : 0;
}

export default function ExperienceExplorer({ soundEnabled }) {
  const [activeIndex, setActiveIndex] = useState(initialVariant);
  const [feedback, setFeedback] = useState(null);
  const [ready, setReady] = useState(false);
  const audioContextRef = useRef(null);
  const clearFeedbackRef = useRef(null);
  const feedbackIdRef = useRef(0);
  const highlightRef = useRef(null);
  const itemRefs = useRef([]);
  const { Effect } = variants[activeIndex];

  const selectVariant = useCallback((index) => {
    if (index < 0 || index >= variants.length) return;
    window.clearTimeout(clearFeedbackRef.current);
    setActiveIndex(index);
    setFeedback(null);
    const url = new URL(window.location.href);
    url.searchParams.set("v", String(index + 1));
    window.history.replaceState({}, "", url);
  }, []);

  const triggerFeedback = useCallback((x, y) => {
    const variant = variants[activeIndex];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reducedMotion) {
      feedbackIdRef.current += 1;
      setFeedback({ id: feedbackIdRef.current, x, y });
      window.clearTimeout(clearFeedbackRef.current);
      clearFeedbackRef.current = window.setTimeout(() => setFeedback(null), 650);
    }

    if (!soundEnabled) return;
    const AudioContext = window.AudioContext ?? window.webkitAudioContext;
    if (!AudioContext) return;

    if (!audioContextRef.current) audioContextRef.current = new AudioContext();
    const context = audioContextRef.current;
    const play = () => variant.playSound(context);

    if (context.state === "suspended") {
      context.resume().then(play).catch((error) => {
        console.warn("Click feedback audio could not start.", error);
      });
      return;
    }

    play();
  }, [activeIndex, soundEnabled]);

  useLayoutEffect(() => {
    const updateHighlight = () => {
      const item = itemRefs.current[activeIndex];
      const highlight = highlightRef.current;
      if (!item || !highlight) return;
      highlight.style.width = `${item.offsetWidth}px`;
      highlight.style.transform = `translateX(${item.offsetLeft}px)`;
    };

    updateHighlight();
    window.addEventListener("resize", updateHighlight);
    return () => window.removeEventListener("resize", updateHighlight);
  }, [activeIndex]);

  useEffect(() => {
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => setReady(true));
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, []);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (event.button !== 0) return;
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest(".proto-picker, .prototype-sound-toggle")) return;
      triggerFeedback(event.clientX, event.clientY);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [triggerFeedback]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target;
      if (
        event.metaKey
        || event.ctrlKey
        || event.altKey
        || target instanceof HTMLInputElement
        || target instanceof HTMLTextAreaElement
        || target instanceof HTMLSelectElement
        || target?.isContentEditable
      ) return;

      const number = Number(event.key);
      if (Number.isInteger(number) && number >= 1 && number <= variants.length) {
        selectVariant(number - 1);
        return;
      }

      if (event.key === "r" || event.key === "R") {
        event.preventDefault();
        triggerFeedback(window.innerWidth / 2, window.innerHeight / 2);
        return;
      }

      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      selectVariant((activeIndex + direction + variants.length) % variants.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, selectVariant, triggerFeedback]);

  useEffect(() => () => {
    window.clearTimeout(clearFeedbackRef.current);
    const context = audioContextRef.current;
    if (context && context.state !== "closed") void context.close();
  }, []);

  return (
    <>
      <Timeline />
      {createPortal(
        <Effect key={feedback?.id ?? activeIndex} feedback={feedback} />,
        document.body,
      )}
      {createPortal(
        <nav
          className="proto-picker"
          data-position="top"
          data-ready={ready ? "" : undefined}
          aria-label="Prototype variants"
        >
          <span ref={highlightRef} className="proto-picker-highlight" aria-hidden="true" />
          {variants.map((variant, index) => (
            <button
              ref={(node) => { itemRefs.current[index] = node; }}
              className="proto-picker-item"
              type="button"
              data-active={activeIndex === index ? "" : undefined}
              aria-current={activeIndex === index ? "true" : undefined}
              aria-label={`${index + 1}. ${variant.name}`}
              title={`${index + 1}. ${variant.name}`}
              key={variant.name}
              onClick={() => selectVariant(index)}
            >
              {variant.shortName}
            </button>
          ))}
          <span className="proto-picker-divider" aria-hidden="true" />
          <button
            className="proto-picker-item proto-picker-replay"
            type="button"
            aria-label="Replay animation (R)"
            onClick={() => triggerFeedback(window.innerWidth / 2, window.innerHeight / 2)}
          >
            ↻
          </button>
        </nav>,
        document.body,
      )}
    </>
  );
}

ExperienceExplorer.propTypes = {
  soundEnabled: PropTypes.bool.isRequired,
};
