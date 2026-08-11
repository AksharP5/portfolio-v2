import PropTypes from "prop-types";
import { useLayoutEffect, useRef, useState } from "react";

export default function OpeningSequence({ name, onComplete }) {
  const nameRef = useRef(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    let cancelled = false;
    let firstFrame = 0;
    let secondFrame = 0;

    const measure = () => {
      firstFrame = window.requestAnimationFrame(() => {
        const source = nameRef.current;
        const target = document.querySelector(".profile-heading h1");

        if (!source || !target) {
          onComplete();
          return;
        }

        const targetRange = document.createRange();
        targetRange.selectNodeContents(target);

        const sourceRect = source.getBoundingClientRect();
        const targetRect = targetRange.getBoundingClientRect();
        const scale = targetRect.width / sourceRect.width;

        source.style.left = `${sourceRect.left}px`;
        source.style.top = `${sourceRect.top}px`;
        source.style.transform = "none";
        source.style.setProperty("--opening-x", `${targetRect.left - sourceRect.left}px`);
        source.style.setProperty("--opening-y", `${targetRect.top - sourceRect.top}px`);
        source.style.setProperty("--opening-scale", String(scale));

        secondFrame = window.requestAnimationFrame(() => {
          if (!cancelled) setReady(true);
        });
      });
    };

    const fontsReady = document.fonts?.ready;
    if (fontsReady) {
      fontsReady.then(() => {
        if (!cancelled) measure();
      });
    } else {
      measure();
    }

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [onComplete]);

  return (
    <div
      className="prototype-opening"
      data-ready={ready ? "" : undefined}
      aria-hidden="true"
    >
      <span
        ref={nameRef}
        className="prototype-opening-name"
        onAnimationEnd={onComplete}
      >
        {name}
      </span>
    </div>
  );
}

OpeningSequence.propTypes = {
  name: PropTypes.string.isRequired,
  onComplete: PropTypes.func.isRequired,
};
