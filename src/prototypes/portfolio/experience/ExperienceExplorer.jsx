import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaRotateRight } from "react-icons/fa6";
import Echo from "../feedback/Echo";
import { playEchoSound } from "../feedback/sounds";
import Timeline from "./Timeline";

export default function ExperienceExplorer({ onReplayOpening, soundEnabled }) {
  const [feedback, setFeedback] = useState(null);
  const audioContextRef = useRef(null);
  const clearFeedbackRef = useRef(null);
  const feedbackIdRef = useRef(0);

  const triggerFeedback = useCallback((x, y) => {
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
    const play = () => playEchoSound(context);

    if (context.state === "suspended") {
      context.resume().then(play).catch((error) => {
        console.warn("Click feedback audio could not start.", error);
      });
      return;
    }

    play();
  }, [soundEnabled]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (event.button !== 0) return;
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest(".prototype-replay-control, .prototype-sound-toggle")) return;
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

      if (event.key === "r" || event.key === "R") {
        event.preventDefault();
        if (!event.repeat) onReplayOpening();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onReplayOpening]);

  useEffect(() => () => {
    window.clearTimeout(clearFeedbackRef.current);
    const context = audioContextRef.current;
    if (context && context.state !== "closed") void context.close();
  }, []);

  return (
    <>
      <Timeline />
      {createPortal(
        <Echo key={feedback?.id ?? "echo"} feedback={feedback} />,
        document.body,
      )}
      {createPortal(
        <button
          className="prototype-replay-control"
          type="button"
          aria-label="Replay opening animation (R)"
          title="Replay opening animation (R)"
          onClick={onReplayOpening}
        >
          <FaRotateRight aria-hidden="true" />
        </button>,
        document.body,
      )}
    </>
  );
}

ExperienceExplorer.propTypes = {
  onReplayOpening: PropTypes.func.isRequired,
  soundEnabled: PropTypes.bool.isRequired,
};
