import PropTypes from "prop-types";
import { useLayoutEffect, useRef } from "react";

export default function OpeningSequence({ onComplete }) {
  const overlayRef = useRef(null);

  useLayoutEffect(() => {
    let cancelled = false;
    let firstFrame = 0;
    let secondFrame = 0;
    let target;

    const clearTarget = () => {
      if (!target) return;
      delete target.dataset.openingReady;
      target.style.removeProperty("--opening-start-x");
      target.style.removeProperty("--opening-start-y");
      target.style.removeProperty("--opening-start-scale");
    };

    const measure = () => {
      if (cancelled) return;

      firstFrame = window.requestAnimationFrame(() => {
        if (cancelled) return;

        const overlay = overlayRef.current;
        target = document.querySelector(".profile-heading h1");

        if (!overlay || !target) {
          onComplete();
          return;
        }

        const targetRange = document.createRange();
        targetRange.selectNodeContents(target);

        const targetRect = target.getBoundingClientRect();
        const targetTextRect = targetRange.getBoundingClientRect();
        const targetFontSize = Number.parseFloat(getComputedStyle(target).fontSize);
        const openingFontSize = Math.min(128, Math.max(52, window.innerWidth * 0.12));
        const scale = openingFontSize / targetFontSize;
        const textOffsetX = targetTextRect.left - targetRect.left;
        const startX = (
          (document.documentElement.clientWidth - targetTextRect.width * scale) / 2
          - targetRect.left
          - textOffsetX * scale
        );
        const startY = (
          (document.documentElement.clientHeight - targetRect.height * scale) / 2
          - targetRect.top
        );

        target.style.setProperty("--opening-start-x", `${startX}px`);
        target.style.setProperty("--opening-start-y", `${startY}px`);
        target.style.setProperty("--opening-start-scale", String(scale));

        secondFrame = window.requestAnimationFrame(() => {
          if (cancelled) return;
          target.dataset.openingReady = "";
          overlay.dataset.ready = "";
        });
      });
    };

    const handleAnimationEnd = (event) => {
      if (event.target === target && event.animationName === "opening-name-land") {
        onComplete();
      }
    };

    document.addEventListener("animationend", handleAnimationEnd);

    const fontsReady = document.fonts?.ready;
    if (fontsReady) {
      fontsReady.then(measure, measure);
    } else {
      measure();
    }

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      document.removeEventListener("animationend", handleAnimationEnd);
      clearTarget();
    };
  }, [onComplete]);

  return <div ref={overlayRef} className="prototype-opening" aria-hidden="true" />;
}

OpeningSequence.propTypes = {
  onComplete: PropTypes.func.isRequired,
};
