import PropTypes from "prop-types";
import { useLayoutEffect, useRef } from "react";

export default function OpeningSequence({ name, onComplete }) {
  const overlayRef = useRef(null);
  const nameRef = useRef(null);

  useLayoutEffect(() => {
    let cancelled = false;
    let firstFrame = 0;
    let secondFrame = 0;

    const measure = () => {
      if (cancelled) return;

      firstFrame = window.requestAnimationFrame(() => {
        if (cancelled) return;

        const overlay = overlayRef.current;
        const animatedName = nameRef.current;
        const target = document.querySelector(".profile-heading h1");

        if (!overlay || !animatedName || !target) return;

        const targetRect = target.getBoundingClientRect();
        const targetStyle = window.getComputedStyle(target);
        const targetFontSize = Number.parseFloat(targetStyle.fontSize);
        const openingFontSize = Math.min(128, Math.max(52, window.innerWidth * 0.12));
        const scale = openingFontSize / targetFontSize;
        const targetLineHeight = Number.parseFloat(targetStyle.lineHeight);
        const targetLetterSpacing = Number.parseFloat(targetStyle.letterSpacing) || 0;

        Object.assign(animatedName.style, {
          color: targetStyle.color,
          fontFamily: targetStyle.fontFamily,
          fontFeatureSettings: targetStyle.fontFeatureSettings,
          fontKerning: targetStyle.fontKerning,
          fontSize: targetStyle.fontSize,
          fontStretch: targetStyle.fontStretch,
          fontStyle: targetStyle.fontStyle,
          fontVariant: targetStyle.fontVariant,
          fontVariationSettings: targetStyle.fontVariationSettings,
          fontWeight: targetStyle.fontWeight,
          height: `${targetRect.height}px`,
          left: `${targetRect.left}px`,
          letterSpacing: targetStyle.letterSpacing,
          lineHeight: targetStyle.lineHeight,
          textAlign: targetStyle.textAlign,
          textRendering: targetStyle.textRendering,
          textTransform: targetStyle.textTransform,
          top: `${targetRect.top}px`,
          width: `${targetRect.width}px`,
        });

        const animatedRect = animatedName.getBoundingClientRect();
        const animatedRange = document.createRange();
        animatedRange.selectNodeContents(animatedName);
        const animatedTextRect = animatedRange.getBoundingClientRect();
        const textOffsetX = animatedTextRect.left - animatedRect.left;
        const startX = (
          (document.documentElement.clientWidth - animatedTextRect.width * scale) / 2
          - textOffsetX * scale
        );
        const startY = (
          (document.documentElement.clientHeight - animatedRect.height * scale) / 2
        );

        animatedName.style.setProperty("--opening-start-left", `${startX}px`);
        animatedName.style.setProperty("--opening-start-top", `${startY}px`);
        animatedName.style.setProperty("--opening-start-font-size", `${openingFontSize}px`);
        animatedName.style.setProperty(
          "--opening-start-line-height",
          `${Number.isFinite(targetLineHeight) ? targetLineHeight * scale : openingFontSize}px`,
        );
        animatedName.style.setProperty(
          "--opening-start-letter-spacing",
          `${targetLetterSpacing * scale}px`,
        );
        animatedName.style.setProperty("--opening-end-left", `${targetRect.left}px`);
        animatedName.style.setProperty("--opening-end-top", `${targetRect.top}px`);
        animatedName.style.setProperty("--opening-end-font-size", targetStyle.fontSize);
        animatedName.style.setProperty("--opening-end-line-height", targetStyle.lineHeight);
        animatedName.style.setProperty(
          "--opening-end-letter-spacing",
          targetStyle.letterSpacing,
        );

        secondFrame = window.requestAnimationFrame(() => {
          if (cancelled) return;
          animatedName.dataset.ready = "";
          overlay.dataset.ready = "";
        });
      });
    };

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
    };
  }, []);

  return (
    <div ref={overlayRef} className="prototype-opening" aria-hidden="true">
      <h1
        ref={nameRef}
        className="prototype-opening-name"
        onAnimationEnd={(event) => {
          if (event.animationName === "opening-name-land") onComplete();
        }}
      >
        {name}
      </h1>
    </div>
  );
}

OpeningSequence.propTypes = {
  name: PropTypes.string.isRequired,
  onComplete: PropTypes.func.isRequired,
};
